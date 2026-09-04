import type { Answer } from "@akasha/command-system/calling"
import { inputIn } from "@akasha/command-system/piping"
import { executeScript } from "@akasha/mobile-cli/appium-client"
import {
  answering,
  driving,
  type Reading,
  refusedBy,
  standingFor,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const SCRIPT = "--script"

const PIPED = "-"

const VALUED = [SCRIPT]

const INDENT = 2

export type Read = {
  readonly script: string
}

function pipedScript(): Reading<string> {
  const held = inputIn()
  if ("tty" in held) {
    return {
      refused: [`\`${SCRIPT} ${PIPED}\` reads the script from what is piped in, and nothing was`],
    }
  }
  if ("unreadable" in held) return { refused: [held.unreadable] }
  const said = new TextDecoder().decode(held.bytes)
  if (said.trim() === "") {
    return { refused: [`\`${SCRIPT} ${PIPED}\` was piped nothing that could be a script`] }
  }
  return said
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const words = wordsIn(argv, VALUED, [])
  if ("refused" in words) return words
  const said = standingFor(words, SCRIPT)
  if ("refused" in said) return said
  const script = said.named[SCRIPT]
  if (script === undefined) {
    return { refused: [`\`${SCRIPT}\` names the script to run, and nothing did`] }
  }
  if (script !== PIPED) return { script }
  const piped = pipedScript()
  if (typeof piped !== "string") return piped
  return { script: piped }
}

async function evaluated(read: Read): Promise<Answer> {
  const state = await driving()
  const result = await executeScript(state.appiumBase, state.sessionId, read.script)
  return told([JSON.stringify(result, null, INDENT)])
}

export async function mobileSimEval(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await evaluated(read))
}
