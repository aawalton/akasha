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
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

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

const LOCAL = /^https?:\/\/localhost|^https?:\/\/127\.0\.0\.1/

const CLOSED_PANEL = '[data-slot="collapsible"][data-state="closed"]'

const PANEL_TRIGGER = '[data-slot="collapsible-trigger"]'

const MEASURED = "[inert]"

const PANEL_ROUNDS = 5

const PANEL_SETTLE_MS = 400

type Session = {
  readonly page: Awaited<ReturnType<typeof createReadOnlyAnonSession>>["page"]
  readonly teardown: () => Promise<void>
}

type Settling = {
  readonly rootSelector: string
  readonly hydrationSelector: string | undefined
  readonly signInPath: string
  readonly timeout: number
}

async function settled(tab: Session["page"], at: string, wanted: Settling): Promise<undefined> {
  const timeout = wanted.timeout
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
  } else if (settle.kind === "hydration-marker") {
    await tab
      .locator(settle.selector)
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(() => undefined)
  }
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

  const base = taken.url.replace(/\/+$/, "")
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
