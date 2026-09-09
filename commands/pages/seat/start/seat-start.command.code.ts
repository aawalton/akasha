import type { Answer } from "../../../../command-system/calling/calling.module.code.ts"
import { ran } from "../../../modules/seat-act-calling/seat-act-calling.module.code.ts"

export async function seatStart(argv: readonly string[]): Promise<Answer> {
  const { default: starting } = await import("@akasha/seat-system/seat-start")
  return await ran(async () => {
    await starting(argv)
  })
}
