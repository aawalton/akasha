import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { seat } from "akasha/commands/arguments/pages/seat.argument.ts"
import { seatPrompt } from "akasha/commands/arguments/pages/seat-prompt.argument.ts"
import { startMode } from "akasha/commands/arguments/pages/start-mode.argument.ts"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { ran } from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { seatResume as page } from "akasha/commands/pages/seat/resume/seat-resume.command.ts"

const TARGET = "--agent-id"

export async function seatResume(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [seatPrompt, seat, startMode])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const carried = [
    ...(taken.seatPrompt === undefined ? [] : [seatPrompt.said, taken.seatPrompt]),
    ...(taken.startMode === undefined ? [] : [startMode.said, taken.startMode]),
  ]
  const { default: resuming } = await import(
    "akasha/agents/seats/modules/resume/seat-resume.module.code.ts"
  )
  return await ran(async (done) => {
    await resuming([TARGET, taken.seat, ...carried], done)
  })
}
