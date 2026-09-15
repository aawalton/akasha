import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { seat } from "akasha/command/argument/pages/seat.argument.ts"
import { refusedBy } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { ran } from "akasha/command/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { seatReset as page } from "akasha/command/pages/seat/reset/seat-reset.command.ts"

export async function seatReset(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [seat])
  if ("refused" in read) return refusedBy(read.refused)
  const { default: resetting } = await import(
    "akasha/agent/seat/reviving/modules/seat-reset/seat-reset.module.code.ts"
  )
  return await ran(async (done) => {
    await resetting(read.taken.seat, done)
  })
}
