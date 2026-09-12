import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { seat } from "akasha/commands/arguments/pages/seat.argument.ts"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { ran } from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { seatReset as page } from "akasha/commands/pages/seat/reset/seat-reset.command.ts"

export async function seatReset(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [seat])
  if ("refused" in read) return refusedBy(read.refused)
  const { default: resetting } = await import(
    "akasha/seat-system/seat-reset/seat-reset.module.code.ts"
  )
  return await ran(async (done) => {
    await resetting(read.taken.seat, done)
  })
}
