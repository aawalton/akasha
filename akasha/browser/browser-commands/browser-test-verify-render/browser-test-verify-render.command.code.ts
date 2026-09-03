import {
  readBrowserTestEnv,
  readRealUserOptInEnv,
} from "@akasha/browser-test-harness/browser-test-env"
import {
  classifyExpectedAttr,
  classifyExpectedCount,
  classifyExpectedTitleDom,
  classifyExpectedTitleInitialHtml,
  decideDeployedRenderVerdict,
  type ExpectedAttrMode,
  type RenderObservation,
  type RenderVerdict,
} from "@akasha/browser-test-harness/deployed-render-check"
import {
  createReadOnlyAnonSession,
  createReadOnlyRealUserHarness,
  createReadOnlyThrowawayHarness,
} from "@akasha/browser-test-harness/read-only-harness"
import type { Answer } from "@akasha/command-system/calling"
import {
  classifyExpectedText,
  decideDiscriminatingSignal,
  isRetryableSessionOpenTimeout,
  planRenderSettleWait,
  planTitleSettleWait,
  planVerifyRenderSession,
} from "@tools/lib/verify-render-plan"
import {
  countIn,
  missingOf,
  refusedBy,
  wordsIn,
} from "../browser-command-arguing/browser-command-arguing.module.code.ts"

const URL_SAID = "--url"

const PATH_SAID = "--path"

const PAGE_TYPE = "--page-type"

const EXPECT_TEXT = "--expect-text"

const COUNT_SELECTOR = "--expect-count-selector"

const COUNT = "--expect-count"

const ATTR_SELECTOR = "--expect-attr-selector"

const ATTR = "--expect-attr"

const ATTR_VALUE = "--expect-attr-value"

const TIMEOUT = "--timeout-ms"

const JSON_SAID = "--json"

const NO_SIGN_IN = "--no-sign-in"

const AS_THROWAWAY = "--as-throwaway"

const VALUED: readonly string[] = [
  URL_SAID,
  PATH_SAID,
  PAGE_TYPE,
  EXPECT_TEXT,
  "--expect-title",
  COUNT_SELECTOR,
  COUNT,
  ATTR_SELECTOR,
  ATTR,
  ATTR_VALUE,
  "--expect-attr-mode",
  "--root-selector",
  "--hydration-selector",
  "--sign-in-path",
  TIMEOUT,
]

const SWITCHES: readonly string[] = [JSON_SAID, NO_SIGN_IN, AS_THROWAWAY]

const DEFAULT_TIMEOUT_MS = 60_000

const CONTAINS_TOKEN = "contains-token"

const LOCAL = /^https?:\/\/localhost|^https?:\/\/127\.0\.0\.1/

const SERVER_ERROR_FROM = 500

const NOT_FOUND = 404

const FAILED = 1

const INDETERMINATE = 3

type Session = {
  readonly page: Awaited<ReturnType<typeof createReadOnlyAnonSession>>["page"]
  readonly teardown: () => Promise<void>
}

export function codeOf(verdict: RenderVerdict["verdict"]): number {
  if (verdict === "PASS") return 0
  return verdict === "FAIL" ? FAILED : INDETERMINATE
}

export function toldOf(
  verdict: RenderVerdict,
  where: { readonly url: string; readonly pageType: string; readonly httpStatus: number },
  observation: RenderObservation | null,
  asJson: boolean
): readonly string[] {
  if (asJson) {
    return [
      JSON.stringify({
        verdict: verdict.verdict,
        reason: verdict.reason,
        url: where.url,
        pageType: where.pageType,
        httpStatus: where.httpStatus,
        ...(observation === null ? {} : { observation }),
      }),
    ]
  }
  return [
    `${verdict.verdict}\t${where.url}`,
    `page type: ${where.pageType}`,
    `http: ${where.httpStatus}`,
    `why: ${verdict.reason}`,
  ]
}

async function opened(
  plan: ReturnType<typeof planVerifyRenderSession>,
  base: string,
  signInPath: string,
  signInTimeoutMs: number
): Promise<Session> {
  if (plan.kind === "anon") return await createReadOnlyAnonSession()
  if (plan.kind === "throwaway") {
    const read = readBrowserTestEnv()
    if (read.missing || read.env === null) {
      throw new Error(
        `${AS_THROWAWAY} reads BROWSER_TEST_URL, BROWSER_TEST_EMAIL, BROWSER_TEST_PASSWORD, ` +
          "SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY, and one is unset"
      )
    }
    return await createReadOnlyThrowawayHarness({
      env: { ...read.env, url: base },
      signInPath,
      signInTimeoutMs,
    })
  }
  const read = readRealUserOptInEnv()
  if (read.missing || read.env === null) {
    throw new Error(
      "the live identity reads BROWSER_TEST_REAL_USER_EMAIL, BROWSER_TEST_REAL_USER_PASSWORD, " +
        `SUPABASE_URL, SUPABASE_ANON_KEY and BROWSER_TEST_URL, and one is unset — say ` +
        `${NO_SIGN_IN} to look as nobody instead`
    )
  }
  return await createReadOnlyRealUserHarness({
    env: { ...read.env, url: base },
    signInPath,
    signInTimeoutMs,
  })
}

async function observed(
  session: Session,
  at: string,
  wanted: {
    readonly pageTypeSlug: string
    readonly expectText: string | undefined
    readonly expectTitle: string | undefined
    readonly countSelector: string | undefined
    readonly count: number | undefined
    readonly attrSelector: string | undefined
    readonly attr: string | undefined
    readonly attrValue: string | undefined
    readonly attrMode: ExpectedAttrMode
    readonly rootSelector: string
    readonly hydrationSelector: string | undefined
    readonly signInPath: string
    readonly timeout: number
  }
): Promise<{ readonly observation: RenderObservation; readonly status: number }> {
  const { page } = session
  const timeout = wanted.timeout
  let ranOut = false
  const missed = (): undefined => {
    ranOut = true
    return undefined
  }

  let response: Awaited<ReturnType<Session["page"]["goto"]>> = null
  try {
    response = await page.goto(at, { waitUntil: "domcontentloaded", timeout })
  } catch (thrown) {
    if (thrown instanceof Error && thrown.name === "TimeoutError") ranOut = true
    else throw thrown
  }
  const status = response?.status() ?? 0
  const gotoPath = new URL(page.url()).pathname
  const initialHtml =
    wanted.expectTitle === undefined ? "" : ((await response?.text().catch(() => "")) ?? "")

  const settle = ranOut
    ? ({ kind: "none" } as const)
    : planRenderSettleWait({
        expectText: wanted.expectText,
        httpStatus: status,
        finalPath: gotoPath,
        signInPath: wanted.signInPath,
        rootSelector: wanted.rootSelector,
        hydrationSelector: wanted.hydrationSelector,
      })
  if (settle.kind === "expect-text") {
    await page
      .getByText(settle.text, { exact: false })
      .filter({ visible: true })
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(missed)
  } else if (settle.kind === "root-populated") {
    await page
      .locator(settle.rootSelector)
      .filter({ hasText: /\S/ })
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(missed)
  } else if (settle.kind === "hydration-marker") {
    await page.locator(settle.selector).first().waitFor({ state: "visible", timeout }).catch(missed)
  }

  const title = ranOut
    ? undefined
    : planTitleSettleWait({
        expectTitle: wanted.expectTitle,
        httpStatus: status,
        finalPath: gotoPath,
        signInPath: wanted.signInPath,
      })
  if (title !== undefined) {
    await page
      .waitForFunction(`document.title === ${JSON.stringify(title)}`, undefined, { timeout })
      .catch(() => undefined)
  }

  const bodyText = await page
    .locator("body")
    .innerText()
    .catch(() => "")
  const rootCount = await page
    .locator(wanted.rootSelector)
    .count()
    .catch(() => 0)
  const domTitle = await page.title().catch(() => "")
  const actualCount =
    wanted.countSelector === undefined
      ? 0
      : await page
          .locator(wanted.countSelector)
          .count()
          .catch(() => 0)
  const attrFound =
    wanted.attrSelector === undefined
      ? false
      : (await page
          .locator(wanted.attrSelector)
          .count()
          .catch(() => 0)) > 0
  const attrValue =
    wanted.attrSelector === undefined || wanted.attr === undefined || !attrFound
      ? null
      : await page
          .locator(wanted.attrSelector)
          .first()
          .getAttribute(wanted.attr)
          .catch(() => null)

  return {
    status,
    observation: {
      pageTypeSlug: wanted.pageTypeSlug,
      signInRedirect: new URL(page.url()).pathname.startsWith(wanted.signInPath),
      serverError: status >= SERVER_ERROR_FROM,
      notFound: status === NOT_FOUND,
      renderedNonBlank: bodyText.trim().length > 0,
      rootElementPresent: rootCount > 0,
      contentSettleTimedOut: ranOut,
      expectedText: classifyExpectedText(wanted.expectText, bodyText),
      expectedCount: classifyExpectedCount({
        selector: wanted.countSelector,
        expected: wanted.count,
        actual: actualCount,
      }),
      expectedAttr: classifyExpectedAttr({
        selector: wanted.attrSelector,
        attribute: wanted.attr,
        expected: wanted.attrValue,
        mode: wanted.attrMode,
        elementFound: attrFound,
        actualValue: attrValue,
      }),
      expectedTitleDom: classifyExpectedTitleDom(wanted.expectTitle, domTitle),
      expectedTitleInitialHtml: classifyExpectedTitleInitialHtml(wanted.expectTitle, initialHtml),
    },
  }
}

export async function browserTestVerifyRender(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return refusedBy(said.refused)

  const missing = missingOf(said.named, [URL_SAID, PATH_SAID, PAGE_TYPE])
  if (missing.length > 0) {
    return refusedBy([`${missing.join(", ")} must be said, and was not`])
  }
  const base = (said.named[URL_SAID] ?? "").replace(/\/+$/, "")
  const path = said.named[PATH_SAID] ?? ""
  const pageTypeSlug = said.named[PAGE_TYPE] ?? ""

  const count = countIn(said.named[COUNT], COUNT)
  const timeoutRead = countIn(said.named[TIMEOUT], TIMEOUT)
  const bad = [count, timeoutRead].filter((one): one is string => typeof one === "string")
  if (bad.length > 0) return refusedBy(bad)

  const wanted = {
    pageTypeSlug,
    expectText: said.named[EXPECT_TEXT],
    expectTitle: said.named["--expect-title"],
    countSelector: said.named[COUNT_SELECTOR],
    count: typeof count === "number" ? count : undefined,
    attrSelector: said.named[ATTR_SELECTOR],
    attr: said.named[ATTR],
    attrValue: said.named[ATTR_VALUE],
    attrMode: (said.named["--expect-attr-mode"] === CONTAINS_TOKEN
      ? CONTAINS_TOKEN
      : "equals") as ExpectedAttrMode,
    rootSelector: said.named["--root-selector"] ?? "main",
    hydrationSelector: said.named["--hydration-selector"],
    signInPath: said.named["--sign-in-path"] ?? "/sign-in",
    timeout: typeof timeoutRead === "number" ? timeoutRead : DEFAULT_TIMEOUT_MS,
  }
  const asJson = said.flags.has(JSON_SAID)

  const signal = decideDiscriminatingSignal({
    expectText: wanted.expectText,
    expectCountSelector: wanted.countSelector,
    expectCount: wanted.count,
    expectAttrSelector: wanted.attrSelector,
    expectAttr: wanted.attr,
    expectAttrValue: wanted.attrValue,
  })
  if (signal.kind === "absent") {
    return refusedBy([
      `nothing discriminating was asserted over \`${pageTypeSlug}\` at ${path}, so an empty ` +
        `render would answer as a healthy one does. Say ${EXPECT_TEXT}, or ${COUNT_SELECTOR} ` +
        `with ${COUNT}, or ${ATTR_SELECTOR} with ${ATTR} and ${ATTR_VALUE}`,
    ])
  }
  if (LOCAL.test(base)) {
    return refusedBy([
      `${URL_SAID} takes a deployed origin rather than ${base}: a session cookie issued on ` +
        "localhost is not sent to a deployed origin, so nothing here would be signed in",
    ])
  }

  const plan = planVerifyRenderSession({
    noSignIn: said.flags.has(NO_SIGN_IN),
    asThrowaway: said.flags.has(AS_THROWAWAY),
  })
  const at = `${base}${path}`

  let session: Session
  try {
    session = await opened(plan, base, wanted.signInPath, wanted.timeout)
  } catch (thrown) {
    if (!isRetryableSessionOpenTimeout(thrown)) {
      return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)])
    }
    const why =
      `the sign-in page had not hydrated within ${wanted.timeout}ms, so the render was never ` +
      "observed — a healthy page under load rather than a broken one"
    return {
      report: toldOf(
        { verdict: "INDETERMINATE", reason: why },
        { url: at, pageType: pageTypeSlug, httpStatus: 0 },
        null,
        asJson
      ),
      refusals: [why],
      code: INDETERMINATE,
    }
  }

  try {
    const seen = await observed(session, at, wanted)
    const verdict = decideDeployedRenderVerdict(seen.observation)
    const where = { url: at, pageType: pageTypeSlug, httpStatus: seen.status }
    const code = codeOf(verdict.verdict)
    return {
      report: toldOf(verdict, where, seen.observation, asJson),
      refusals: code === 0 ? [] : [verdict.reason],
      code,
    }
  } finally {
    await session.teardown()
  }
}
