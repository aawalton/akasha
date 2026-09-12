import {
  landingTracked,
  outsideTracked,
  trackedIn,
} from "akasha/alan/track/landing/track-landing.module.code.ts"
import { MECHANICAL_KIND } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { builtIn, VALUED } from "akasha/commands/modules/file-arguing/file-arguing.module.code.ts"
import {
  BREAK_GLASS,
  FILE_PATH,
  REMOVE,
  valuesOf,
} from "akasha/commands/modules/flags/command-flags.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { pathAt } from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"

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

export async function alanTracking(argv: readonly string[], given: Given): Promise<Answer> {
  if (argv.includes(BREAK_GLASS)) return mistaking([NO_GLASS])
  const stray = strayIn(given.root, argv)
  if (stray.length > 0) return mistaking(stray)
  const built = builtIn(argv, given, inputIn, MECHANICAL_KIND)
  if ("code" in built) return built
  return await landingTracked(given.root, built.changes, built.message)
}
