import { BREAK_GLASS, mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { inputIn } from "../../piping/piping.module.code.ts"
import { FILE_PATH, filing, pathAt, REMOVE, VALUED, valuesOf } from "../write/write.command.code.ts"

export const DAYS_AT = "alan/tracking/daily/wake-days/pages/"

export const FOOD_ENTRIES_AT = "alan/tracking/food-entries/pages/"

export const TRACKED_AT: readonly string[] = [DAYS_AT, FOOD_ENTRIES_AT]

export const NO_GLASS = `${BREAK_GLASS} is no flag this takes: a body the checks refuse is a fault in the program that composed it`

export function trackedIn(path: string | null): boolean {
  return path !== null && TRACKED_AT.some((one) => path.startsWith(one))
}

export function outsideTracked(said: string): string {
  const under = TRACKED_AT.map((one) => `\`${one}\``).join(" or ")
  return `${said} is not under ${under}, and this lands what Alan's tracking composes and nothing else`
}

export function strayIn(root: string, argv: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const flag of [FILE_PATH, REMOVE]) {
    for (const one of valuesOf(argv, flag, VALUED)) {
      if (one === null) continue
      if (!trackedIn(pathAt(root, one))) said.push(outsideTracked(one))
    }
  }
  return said
}

export function tracking(argv: readonly string[], given: Given): Answer {
  if (argv.includes(BREAK_GLASS)) return mistaking([NO_GLASS])
  const stray = strayIn(given.root, argv)
  if (stray.length > 0) return mistaking(stray)
  return filing(argv, given, inputIn)
}
