import type { Frame, Page } from "playwright-core"

export type PrewarmStep = "warm" | "giveup" | "wait"

export interface PrewarmDecisionInput {
  readonly sinceLastNavMs: number
  readonly totalElapsedMs: number
  readonly quietMs: number
  readonly maxMs: number
}

export function decidePrewarmStep(input: PrewarmDecisionInput): PrewarmStep {
  if (input.totalElapsedMs >= input.maxMs) return "giveup"
  if (input.sinceLastNavMs >= input.quietMs) return "warm"
  return "wait"
}

export const PREWARM_QUIET_MS = 1_500
export const PREWARM_MAX_MS = 30_000
const POLL_MS = 250

export interface PrewarmResult {
  readonly warmed: boolean
  readonly navigations: number
  readonly elapsedMs: number
}

export async function prewarmDevServer(
  page: Page,
  targetUrl: string,
  opts?: { quietMs?: number; maxMs?: number; gotoTimeoutMs?: number }
): Promise<PrewarmResult> {
  const quietMs = opts?.quietMs ?? PREWARM_QUIET_MS
  const maxMs = opts?.maxMs ?? PREWARM_MAX_MS
  const gotoTimeoutMs = opts?.gotoTimeoutMs ?? 60_000
  const startedAt = Date.now()
  let lastNavAt = startedAt
  let navigations = 0
  const onNav = (frame: Frame): undefined => {
    if (frame === page.mainFrame()) {
      lastNavAt = Date.now()
      navigations++
    }
    return undefined
  }
  page.on("framenavigated", onNav)
  try {
    await page.goto(targetUrl, { waitUntil: "load", timeout: gotoTimeoutMs })
    const decide = (): PrewarmStep => {
      const now = Date.now()
      return decidePrewarmStep({
        sinceLastNavMs: now - lastNavAt,
        totalElapsedMs: now - startedAt,
        quietMs,
        maxMs,
      })
    }
    let step = decide()
    while (step === "wait") {
      await page.waitForTimeout(POLL_MS)
      step = decide()
    }
    return { warmed: step === "warm", navigations, elapsedMs: Date.now() - startedAt }
  } finally {
    page.off("framenavigated", onNav)
  }
}
