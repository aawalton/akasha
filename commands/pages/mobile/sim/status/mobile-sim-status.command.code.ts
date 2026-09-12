import { getContexts } from "akasha/alan/harness/mobile-cli/modules/appium-client/appium-client.module.code.ts"
import { appiumIsUp } from "akasha/alan/harness/mobile-cli/sim-macbook/sim-macbook.module.code.ts"
import {
  loadSessionState,
  SIM_SESSION_PATH,
} from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import {
  answering,
  keyedLines,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileSimStatus as page } from "akasha/commands/pages/mobile/sim/status/mobile-sim-status.command.ts"

const A_SECOND = 1_000

const NONE = "(none)"

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
      `none\tno session is there, since ${SIM_SESSION_PATH} is absent`,
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

export async function mobileSimStatus(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await stated())
}
