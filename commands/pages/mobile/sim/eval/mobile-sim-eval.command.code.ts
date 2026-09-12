import { executeScript } from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { driving } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { script } from "akasha/commands/arguments/pages/script.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"

import { mobileSimEval as page } from "akasha/commands/pages/mobile/sim/eval/mobile-sim-eval.command.ts"

const PIPED = "-"

const INDENT = 2

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Read = {
  readonly script: string
}

export function scriptIn(said: string, piping: Piping = inputIn): Reading<Read> {
  if (said !== PIPED) return { script: said }
  const held = piping()
  if ("tty" in held) {
    return {
      refused: [
        `\`${script.said} ${PIPED}\` reads the script from what is piped in, and nothing was`,
      ],
    }
  }
  if ("unreadable" in held) return { refused: [held.unreadable] }
  const body = new TextDecoder().decode(held.bytes)
  if (body.trim() === "") {
    return { refused: [`\`${script.said} ${PIPED}\` was piped nothing that could be a script`] }
  }
  return { script: body }
}

export type Evaluating = (done: string[], read: Read) => Promise<Answer>

async function evaluated(done: string[], read: Read): Promise<Answer> {
  const state = await driving(done)
  const result = await executeScript(state.appiumBase, state.sessionId, read.script)
  return told([JSON.stringify(result, null, INDENT)])
}

export async function mobileSimEval(
  argv: readonly string[],
  given: Given,
  evaluating: Evaluating = evaluated
): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, [script])
  if ("refused" in said) return refusedBy(said.refused)
  const read = scriptIn(said.taken.script)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await evaluating(done, read))
}
