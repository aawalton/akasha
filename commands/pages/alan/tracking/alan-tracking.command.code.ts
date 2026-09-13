import {
  landingTracked,
  outsideTracked,
  trackedIn,
} from "akasha/alan/track/modules/landing/track-landing.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { MECHANICAL_KIND } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
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

const TAKES: readonly string[] = VALUED.filter((one) => one !== BREAK_GLASS)

const NO_BARE: readonly string[] = []

export function strayIn(root: string, argv: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const flag of [FILE_PATH, REMOVE]) {
    for (const one of valuesOf(argv, flag, TAKES)) {
      if (one === null) continue
      if (!trackedIn(pathAt(root, one))) said.push(outsideTracked(one))
    }
  }
  return said
}

export type Landing = (
  done: string[],
  root: string,
  changes: readonly FileChange[],
  message: string
) => Promise<Answer>

export async function trackedBy(
  argv: readonly string[],
  given: Given,
  landing: Landing = landingTracked
): Promise<Answer> {
  return await answering(async (done) => {
    const built = builtIn(argv, given, inputIn, MECHANICAL_KIND, TAKES, NO_BARE)
    if ("code" in built) return built
    return await landing(done, given.root, built.changes, built.message)
  })
}

export async function alanTracking(argv: readonly string[], given: Given): Promise<Answer> {
  const stray = strayIn(given.root, argv)
  if (stray.length > 0) return mistaking(stray)
  return await trackedBy(argv, given)
}
