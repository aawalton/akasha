import { refuseStatedName } from "akasha/agents/seats/modules/stated-name-refusal/seat-stated-name-refusal.module.code.ts"
import { refuseStatedParent } from "akasha/agents/seats/modules/stated-parent-refusal/seat-stated-parent-refusal.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { account } from "akasha/commands/arguments/pages/account.argument.ts"
import { anthropicAuthToken } from "akasha/commands/arguments/pages/anthropic-auth-token.argument.ts"
import { anthropicBaseUrl } from "akasha/commands/arguments/pages/anthropic-base-url.argument.ts"
import { flex } from "akasha/commands/arguments/pages/flex.argument.ts"
import { initiative } from "akasha/commands/arguments/pages/initiative.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { persona } from "akasha/commands/arguments/pages/persona.argument.ts"
import { principal } from "akasha/commands/arguments/pages/principal.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { role } from "akasha/commands/arguments/pages/role.argument.ts"
import { seatDomain } from "akasha/commands/arguments/pages/seat-domain.argument.ts"
import { seatModel } from "akasha/commands/arguments/pages/seat-model.argument.ts"
import { seatPrompt } from "akasha/commands/arguments/pages/seat-prompt.argument.ts"
import { startMode } from "akasha/commands/arguments/pages/start-mode.argument.ts"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { ran } from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { seatStart as page } from "akasha/commands/pages/seat/start/seat-start.command.ts"

const TAKES = [
  account,
  anthropicAuthToken,
  anthropicBaseUrl,
  flex,
  initiative,
  json,
  persona,
  principal,
  promptFile,
  role,
  seatDomain,
  seatModel,
  seatPrompt,
  startMode,
]

function guidedBy(refused: readonly string[]): readonly string[] {
  const said: string[] = []
  const parent = refuseStatedParent(refused)
  if (parent !== null) said.push(parent)
  const typed = refuseStatedName(refused)
  if (typed !== null) said.push(typed)
  return [...said, ...refused]
}

export async function seatStart(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(guidedBy(read.refused))
  const asked = read.taken
  const { default: starting } = await import(
    "akasha/seat-system/seat-start/seat-start.module.code.ts"
  )
  return await ran(async (done) => {
    await starting(asked, done)
  })
}
