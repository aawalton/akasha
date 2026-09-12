import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  namedIn,
  ran,
} from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const RESET = "reset"

export async function seatReset(argv: readonly string[], given: Given): Promise<Answer> {
  const named = namedIn(given.calledAs, RESET, argv)
  if (!("name" in named)) return named
  const stray = argv.slice(1)
  if (stray.length > 0) {
    return refused(
      `\`${given.calledAs}\` names the seat to reset and takes nothing else, and ${namesDrawn(stray)} followed it`,
      1
    )
  }
  const { default: resetting } = await import(
    "akasha/seat-system/seat-reset/seat-reset.module.code.ts"
  )
  return await ran(async (done) => {
    await resetting([named.name], done)
  })
}
