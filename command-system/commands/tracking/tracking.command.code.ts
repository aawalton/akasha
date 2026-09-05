import {
  landingTracked,
  outsideTracked,
  trackedIn,
} from "../../../alan/tracking/tracking-landing/tracking-landing.module.code.ts"
import { BREAK_GLASS, mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { inputIn } from "../../piping/piping.module.code.ts"
import {
  builtIn,
  FILE_PATH,
  pathAt,
  REMOVE,
  VALUED,
  valuesOf,
} from "../write/write.command.code.ts"

export const NO_GLASS = `${BREAK_GLASS} is no flag this takes: a body the checks refuse is a fault in the program that composed it`

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

export async function tracking(argv: readonly string[], given: Given): Promise<Answer> {
  if (argv.includes(BREAK_GLASS)) return mistaking([NO_GLASS])
  const stray = strayIn(given.root, argv)
  if (stray.length > 0) return mistaking(stray)
  const built = builtIn(argv, given, inputIn)
  if ("code" in built) return built
  return await landingTracked(given.root, built.changes, built.message, given.calledAs)
}
