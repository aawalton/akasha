import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"
import {
  namedIn,
  quoted,
  ran,
} from "../../../modules/seat-act-calling/seat-act-calling.module.code.ts"

const RESET = "reset"

export async function seatReset(argv: readonly string[], given: Given): Promise<Answer> {
  const named = namedIn(given.calledAs, RESET, argv)
  if (!("name" in named)) return named
  const stray = argv.slice(1)
  if (stray.length > 0) {
    return refused(
      `\`${given.calledAs}\` names the seat to reset and takes nothing else, and ${quoted(stray)} followed it`,
      1
    )
  }
  const { default: resetting } = await import("@akasha/seat-system/seat-reset")
  return await ran(async () => {
    await resetting([named.name])
  })
}
