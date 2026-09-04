import type { Answer } from "@akasha/command-system/calling"
import { deleteSession } from "@akasha/mobile-cli/appium-client"
import { stopAppium } from "@akasha/mobile-cli/sim-macbook"
import { clearSessionState, loadSessionState } from "@akasha/mobile-cli/sim-session"
import {
  answering,
  flagsAloneIn,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const STOP_APPIUM = "--stop-appium"

const SWITCHES = [STOP_APPIUM]

export type Read = {
  readonly stopAppium: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, [], SWITCHES)
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }
  return { stopAppium: said.flags.has(STOP_APPIUM) }
}

async function tornDown(read: Read): Promise<Answer> {
  const report: string[] = []
  const state = loadSessionState()
  if (state === null) {
    report.push("no session stood, so none was ended")
  } else {
    try {
      await deleteSession(state.appiumBase, state.sessionId)
      report.push(`ended session ${state.sessionId}`)
    } catch {
      report.push(`session ${state.sessionId} was already gone from Appium`)
    }
  }
  clearSessionState()
  report.push("cleared what was written down about the session")
  if (read.stopAppium) {
    await stopAppium()
    report.push("stopped the mac's Appium server")
  }
  return told(report)
}

export async function mobileSimTeardown(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await tornDown(read))
}
