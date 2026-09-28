import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { planRenderSettleWait } from "akasha/code/browser/command/modules/verify-render-plan/verify-render-plan.module.code.ts"
import { createReadOnlyAnonSession } from "akasha/code/browser/test-harness/modules/read-only-harness/read-only-harness.module.code.ts"
import { createSignedInSession } from "akasha/code/browser/test-harness/modules/signed-in-harness/signed-in-harness.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { expandPanels as expandPanelsArgument } from "akasha/command/argument/pages/expand-panels.argument.ts"
import { fullPage as fullPageArgument } from "akasha/command/argument/pages/full-page.argument.ts"
import { height } from "akasha/command/argument/pages/height.argument.ts"
import { hydrationSelector } from "akasha/command/argument/pages/hydration-selector.argument.ts"
import { out as outArgument } from "akasha/command/argument/pages/out.argument.ts"
import { path as pathArgument } from "akasha/command/argument/pages/path.argument.ts"
import { rootSelector } from "akasha/command/argument/pages/root-selector.argument.ts"
import { signInPath as signInPathArgument } from "akasha/command/argument/pages/sign-in-path.argument.ts"
import { signedIn as signedInArgument } from "akasha/command/argument/pages/signed-in.argument.ts"
import { timeoutMs } from "akasha/command/argument/pages/timeout-ms.argument.ts"
import { url } from "akasha/command/argument/pages/url.argument.ts"
import { width } from "akasha/command/argument/pages/width.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { browserScreenshot as page } from "akasha/command/pages/browser/screenshot/browser-screenshot.command.ts"
import type { Request } from "playwright-core"

const TAKES = [
  expandPanelsArgument,
  fullPageArgument,
  height,
  hydrationSelector,
  outArgument,
  pathArgument,
  rootSelector,
  signInPathArgument,
  signedInArgument,
  timeoutMs,
  url,
  width,
] as const

const URL_SAID = url.said

const PATH_SAID = pathArgument.said

const SHAPED_ORIGIN = "`https://alanwalton.com`"

const LOCAL = /^https?:\/\/localhost|^https?:\/\/127\.0\.0\.1/

const CLOSED_PANEL =
  '[data-slot="collapsible"][data-state="closed"], [data-slot="sidebar-nav-group"][data-state="closed"]'

const PANEL_TRIGGER = '[data-slot="collapsible-trigger"], [data-slot="sidebar-nav-group-toggle"]'

const MEASURED = "[inert]"

const PANEL_ROUNDS = 5

const PANEL_SETTLE_MS = 400

const QUIET_MS = 500

const LOOK_MS = 100

const STREAM = "text/event-stream"

const STREAMING_KINDS: ReadonlySet<string> = new Set(["eventsource", "websocket"])

const LAST_DRAWN = "__akashaLastDrawn"

const DRAWN_WATCH =
  `window.${LAST_DRAWN} = performance.now();` +
  `new MutationObserver(() => { window.${LAST_DRAWN} = performance.now() })` +
  ".observe(document, { subtree: true, childList: true, characterData: true })"

const DRAWN_AGO = `performance.now() - (window.${LAST_DRAWN} ?? 0)`

type Session = {
  readonly page: Awaited<ReturnType<typeof createReadOnlyAnonSession>>["page"]
  readonly teardown: () => Promise<void>
}

type Traffic = { readonly open: Set<Request>; lastMovedAt: number }

function streaming(asked: Request): boolean {
  if (STREAMING_KINDS.has(asked.resourceType())) return true
  return (asked.headers()["accept"] ?? "").includes(STREAM)
}

async function watched(tab: Session["page"]): Promise<Traffic> {
  const traffic: Traffic = { open: new Set(), lastMovedAt: Date.now() }
  const closed = (asked: Request): undefined => {
    traffic.open.delete(asked)
    traffic.lastMovedAt = Date.now()
    return undefined
  }
  tab.on("request", (asked) => {
    if (!streaming(asked)) traffic.open.add(asked)
    traffic.lastMovedAt = Date.now()
  })
  tab.on("response", (answer) => {
    if ((answer.headers()["content-type"] ?? "").includes(STREAM)) closed(answer.request())
  })
  tab.on("requestfinished", closed)
  tab.on("requestfailed", closed)
  await tab.addInitScript({ content: DRAWN_WATCH })
  return traffic
}

async function drawnAgo(tab: Session["page"]): Promise<number> {
  const ago: unknown = await tab.evaluate(DRAWN_AGO).catch(() => 0)
  return typeof ago === "number" ? ago : 0
}

async function quieted(
  tab: Session["page"],
  traffic: Traffic,
  timeout: number
): Promise<undefined> {
  const until = Date.now() + timeout
  while (Date.now() < until) {
    const idle = traffic.open.size === 0 && Date.now() - traffic.lastMovedAt >= QUIET_MS
    if (idle && (await drawnAgo(tab)) >= QUIET_MS) return undefined
    await waited(LOOK_MS)
  }
  return undefined
}

type Settling = {
  readonly rootSelector: string
  readonly hydrationSelector: string | undefined
  readonly signInPath: string
  readonly timeout: number
}

async function settled(tab: Session["page"], at: string, wanted: Settling): Promise<undefined> {
  const timeout = wanted.timeout
  const traffic = await watched(tab)
  let ranOut = false
  let response: Awaited<ReturnType<Session["page"]["goto"]>> = null
  try {
    response = await tab.goto(at, { waitUntil: "domcontentloaded", timeout })
  } catch (thrown) {
    if (thrown instanceof Error && thrown.name === "TimeoutError") ranOut = true
    else throw thrown
  }
  const status = response?.status() ?? 0
  const settle = ranOut
    ? ({ kind: "none" } as const)
    : planRenderSettleWait({
        expectText: undefined,
        httpStatus: status,
        finalPath: new URL(tab.url()).pathname,
        signInPath: wanted.signInPath,
        rootSelector: wanted.rootSelector,
        hydrationSelector: wanted.hydrationSelector,
      })
  if (settle.kind === "root-populated") {
    await tab
      .locator(settle.rootSelector)
      .filter({ hasText: /\S/ })
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(() => undefined)
    await tab
      .locator(settle.pendingSelector)
      .filter({ visible: true })
      .first()
      .waitFor({ state: "detached", timeout })
      .catch(() => undefined)
  } else if (settle.kind === "hydration-marker") {
    await tab
      .locator(settle.selector)
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(() => undefined)
  }
  if (!ranOut) await quieted(tab, traffic, timeout)
  return undefined
}

function waited(ms: number): Promise<undefined> {
  return new Promise((done) => {
    setTimeout(() => done(undefined), ms)
  })
}

async function clickedClosed(tab: Session["page"]): Promise<number> {
  let count = 0
  for (const panel of await tab.$$(CLOSED_PANEL)) {
    const measured = await panel.evaluate((drawn, inert) => drawn.closest(inert) !== null, MEASURED)
    if (measured) continue
    const trigger = await panel.$(PANEL_TRIGGER)
    if (trigger === null) continue
    await trigger.dispatchEvent("click")
    count += 1
  }
  return count
}

async function opened(tab: Session["page"]): Promise<undefined> {
  for (let round = 0; round < PANEL_ROUNDS; round += 1) {
    const clicked = await clickedClosed(tab).catch(() => 0)
    if (clicked === 0) break
    await waited(PANEL_SETTLE_MS)
  }
  return waited(PANEL_SETTLE_MS)
}

export async function browserScreenshot(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken

  const origin = URL.canParse(taken.url) ? new URL(taken.url) : null
  if (origin === null) {
    return refusedBy([
      `${URL_SAID} takes an origin such as ${SHAPED_ORIGIN}, and \`${taken.url}\` is none`,
    ])
  }
  if (origin.pathname !== "/" || origin.search !== "" || origin.hash !== "") {
    return refusedBy([
      `${URL_SAID} takes the origin alone, as \`${origin.origin}\`, rather than \`${taken.url}\`: ` +
        `the page's path goes in ${PATH_SAID} and nowhere else`,
    ])
  }
  if (!taken.path.startsWith("/")) {
    return refusedBy([
      `${PATH_SAID} opens with \`/\`, as \`/${taken.path}\` does, rather than \`${taken.path}\``,
    ])
  }
  const base = origin.origin
  if (LOCAL.test(base)) {
    return refusedBy([
      `${URL_SAID} takes a deployed origin rather than ${base}: what is shot here is the ` +
        "render a deployed site answers, and a dev server answers a render of its own",
    ])
  }

  const at = `${base}${taken.path}`
  const written = resolve(given.root, taken.out)

  let session: Session
  try {
    session = taken.signedIn
      ? await createSignedInSession(new URL(base).origin)
      : await createReadOnlyAnonSession()
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)])
  }

  try {
    await mkdir(dirname(written), { recursive: true })
    await session.page.setViewportSize({ width: taken.width, height: taken.height })
    await settled(session.page, at, {
      rootSelector: taken.rootSelector,
      hydrationSelector: taken.hydrationSelector,
      signInPath: taken.signInPath,
      timeout: taken.timeoutMs,
    })
    if (taken.expandPanels) await opened(session.page)
    await session.page.screenshot({ path: written, fullPage: taken.fullPage })
    return told([written])
  } finally {
    await session.teardown()
  }
}
