import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { ran } from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"

export async function seatStart(argv: readonly string[]): Promise<Answer> {
  const { default: starting } = await import(
    "akasha/seat-system/seat-start/seat-start.module.code.ts"
  )
  return await ran(async () => {
    await starting(argv)
  })
}
