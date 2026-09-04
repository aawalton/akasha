import type { Answer } from "@akasha/command-system/calling"
import { getContexts } from "@akasha/mobile-cli/appium-client"
import { appiumIsUp } from "@akasha/mobile-cli/sim-macbook"
import { loadSessionState, SIM_SESSION_PATH } from "@akasha/mobile-cli/sim-session"
import {
  answering,
  flagsAloneIn,
  keyedLines,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const A_SECOND = 1_000

const NONE = "(none)"

export type Read = Record<string, never>

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, [], [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  return {}
}

async function liveness(up: boolean, base: string, sessionId: string): Promise<boolean> {
  if (!up) return false
  try {
    await getContexts(base, sessionId)
    return true
  } catch {
    return false
  }
}

async function stated(): Promise<Answer> {
  const state = loadSessionState()
  if (state === null) {
    return told([
      `none\tno session stands, since ${SIM_SESSION_PATH} is absent`,
      "start one with `mobile sim boot` and then `mobile sim open-url`",
    ])
  }
  const up = await appiumIsUp()
  const live = await liveness(up, state.appiumBase, state.sessionId)
  const age = Math.max(0, Math.round((Date.now() - state.startedAtMs) / A_SECOND))
  return told(
    keyedLines([
      ["session", state.sessionId],
      ["udid", state.udid],
      ["appium", `${state.appiumBase} (${up ? "up" : "down"})`],
      ["webview", state.webviewContext ?? NONE],
      ["route", state.route ?? NONE],
      ["age", `${age}s`],
      ["live", live ? "yes" : "no, so `mobile sim open-url` would start one again"],
    ])
  )
}

export async function mobileSimStatus(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await stated())
}
