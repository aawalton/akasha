import {
  classifyExpectedText,
  decideDiscriminatingSignal,
  planRenderSettleWait,
  planTitleSettleWait,
} from "akasha/code/browser/command/modules/verify-render-plan/verify-render-plan.module.code.ts"
import {
  classifyExpectedAttr,
  classifyExpectedCount,
  classifyExpectedTitleDom,
  classifyExpectedTitleInitialHtml,
  decideDeployedRenderVerdict,
  type ExpectedAttrMode,
  type RenderObservation,
  type RenderVerdict,
} from "akasha/code/browser/test-harness/modules/deployed-render-check/deployed-render-check.module.code.ts"
import { createReadOnlyAnonSession } from "akasha/code/browser/test-harness/modules/read-only-harness/read-only-harness.module.code.ts"
import { createSignedInSession } from "akasha/code/browser/test-harness/modules/signed-in-harness/signed-in-harness.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { expectAttr } from "akasha/command/argument/pages/expect-attr.argument.ts"
import { expectAttrMode } from "akasha/command/argument/pages/expect-attr-mode.argument.ts"
import { expectAttrSelector } from "akasha/command/argument/pages/expect-attr-selector.argument.ts"
import { expectAttrValue } from "akasha/command/argument/pages/expect-attr-value.argument.ts"
import { expectCount } from "akasha/command/argument/pages/expect-count.argument.ts"
import { expectCountSelector } from "akasha/command/argument/pages/expect-count-selector.argument.ts"
import { expectText } from "akasha/command/argument/pages/expect-text.argument.ts"
import { expectTitle } from "akasha/command/argument/pages/expect-title.argument.ts"
import { hydrationSelector } from "akasha/command/argument/pages/hydration-selector.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { pageType } from "akasha/command/argument/pages/page-type.argument.ts"
import { path as pathArgument } from "akasha/command/argument/pages/path.argument.ts"
import { rootSelector } from "akasha/command/argument/pages/root-selector.argument.ts"
import { signInPath as signInPathArgument } from "akasha/command/argument/pages/sign-in-path.argument.ts"
import { signedIn as signedInArgument } from "akasha/command/argument/pages/signed-in.argument.ts"
import { timeoutMs } from "akasha/command/argument/pages/timeout-ms.argument.ts"
import { url } from "akasha/command/argument/pages/url.argument.ts"
import {
  answeredWith,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { browserTestVerifyRender as page } from "akasha/command/pages/browser/test-verify-render/browser-test-verify-render.command.ts"

const EXPECT_TEXT = expectText.said

const COUNT_SELECTOR = expectCountSelector.said

const COUNT = expectCount.said

const ATTR_SELECTOR = expectAttrSelector.said

const ATTR = expectAttr.said

const ATTR_VALUE = expectAttrValue.said

const URL_SAID = url.said

const TAKES = [
  expectAttr,
  expectAttrMode,
  expectAttrSelector,
  expectAttrValue,
  expectCount,
  expectCountSelector,
  expectText,
  expectTitle,
  hydrationSelector,
  json,
  pageType,
  pathArgument,
  rootSelector,
  signInPathArgument,
  signedInArgument,
  timeoutMs,
  url,
] as const

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

function codeOf(verdict: RenderVerdict["verdict"]): number {
  if (verdict === "PASS") return 0
  return verdict === "FAIL" ? FAILED : INDETERMINATE
}

function toldOf(
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
  const { page: tab } = session
  const timeout = wanted.timeout
  let ranOut = false
  const missed = (): undefined => {
    ranOut = true
    return undefined
  }

  let response: Awaited<ReturnType<Session["page"]["goto"]>> = null
  try {
    response = await tab.goto(at, { waitUntil: "domcontentloaded", timeout })
  } catch (thrown) {
    if (thrown instanceof Error && thrown.name === "TimeoutError") ranOut = true
    else throw thrown
  }
  const status = response?.status() ?? 0
  const gotoPath = new URL(tab.url()).pathname
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
    await tab
      .getByText(settle.text, { exact: false })
      .filter({ visible: true })
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(missed)
  } else if (settle.kind === "root-populated") {
    await tab
      .locator(settle.rootSelector)
      .filter({ hasText: /\S/ })
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(missed)
  } else if (settle.kind === "hydration-marker") {
    await tab.locator(settle.selector).first().waitFor({ state: "visible", timeout }).catch(missed)
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
    await tab
      .waitForFunction(`document.title === ${JSON.stringify(title)}`, undefined, { timeout })
      .catch(() => undefined)
  }

  const bodyText = await tab
    .locator("body")
    .innerText()
    .catch(() => "")
  const rootCount = await tab
    .locator(wanted.rootSelector)
    .count()
    .catch(() => 0)
  const domTitle = await tab.title().catch(() => "")
  const actualCount =
    wanted.countSelector === undefined
      ? 0
      : await tab
          .locator(wanted.countSelector)
          .count()
          .catch(() => 0)
  const attrFound =
    wanted.attrSelector === undefined
      ? false
      : (await tab
          .locator(wanted.attrSelector)
          .count()
          .catch(() => 0)) > 0
  const attrValue =
    wanted.attrSelector === undefined || wanted.attr === undefined || !attrFound
      ? null
      : await tab
          .locator(wanted.attrSelector)
          .first()
          .getAttribute(wanted.attr)
          .catch(() => null)

  return {
    status,
    observation: {
      pageTypeSlug: wanted.pageTypeSlug,
      signInRedirect: new URL(tab.url()).pathname.startsWith(wanted.signInPath),
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

export async function browserTestVerifyRender(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken

  const base = taken.url.replace(/\/+$/, "")
  const path = taken.path
  const pageTypeSlug = taken.pageType

  const wanted = {
    pageTypeSlug,
    expectText: taken.expectText,
    expectTitle: taken.expectTitle,
    countSelector: taken.expectCountSelector,
    count: taken.expectCount,
    attrSelector: taken.expectAttrSelector,
    attr: taken.expectAttr,
    attrValue: taken.expectAttrValue,
    attrMode: (taken.expectAttrMode === CONTAINS_TOKEN
      ? CONTAINS_TOKEN
      : "equals") as ExpectedAttrMode,
    rootSelector: taken.rootSelector,
    hydrationSelector: taken.hydrationSelector,
    signInPath: taken.signInPath,
    timeout: taken.timeoutMs,
  }
  const asJson = taken.json

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
      `${URL_SAID} takes a deployed origin rather than ${base}: what is weighed here is the ` +
        "render a deployed site answers, and a dev server answers a render of its own",
    ])
  }

  const at = `${base}${path}`

  let session: Session
  try {
    session = taken.signedIn
      ? await createSignedInSession(new URL(base).origin)
      : await createReadOnlyAnonSession()
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)])
  }

  try {
    const seen = await observed(session, at, wanted)
    const verdict = decideDeployedRenderVerdict(seen.observation)
    const where = { url: at, pageType: pageTypeSlug, httpStatus: seen.status }
    const code = codeOf(verdict.verdict)
    return answeredWith(
      toldOf(verdict, where, seen.observation, asJson),
      code === 0 ? [] : [verdict.reason],
      code
    )
  } finally {
    await session.teardown()
  }
}
