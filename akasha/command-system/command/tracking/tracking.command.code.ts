import { BREAK_GLASS, mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { inputIn } from "../../piping/piping.module.code.ts"
import {
  FILE_PATH,
  pathInside,
  REMOVE,
  VALUED,
  valuesOf,
  writing,
} from "../write/write.command.code.ts"

export const TRACKED_AT = "akasha/alan/daily-tracking/daily-trackings/"

export const NO_GLASS = `${BREAK_GLASS} is no flag this takes: a body the checks refuse is a fault in the program that composed it`

export function outsideTracked(said: string): string {
  return `${said} is not under \`${TRACKED_AT}\`, and this lands the tracked days and nothing else`
}

export function strayIn(root: string, argv: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const flag of [FILE_PATH, REMOVE]) {
    for (const one of valuesOf(argv, flag, VALUED)) {
      if (one === null) continue
      const path = pathInside(root, one)
      if (path === null || !path.startsWith(TRACKED_AT)) said.push(outsideTracked(one))
    }
  }
  return said
}

export function tracking(argv: readonly string[], given: Given): Answer {
  if (argv.includes(BREAK_GLASS)) return mistaking([NO_GLASS])
  const stray = strayIn(given.root, argv)
  if (stray.length > 0) return mistaking(stray)
  return writing(argv, given, inputIn)
}
