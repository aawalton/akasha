import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { plan } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answeredWith,
  INPUT,
  OPERATIONAL,
  partWay,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { gitSweep as page } from "akasha/command/pages/git/sweep/git-sweep.command.ts"
import { gitDirIn } from "akasha/git/modules/dir/git-dir.module.code.ts"
import type {
  Found,
  Took,
} from "akasha/git/modules/store-sweeping/git-store-sweeping.module.code.ts"
import {
  foundIn,
  takingFrom,
} from "akasha/git/modules/store-sweeping/git-store-sweeping.module.code.ts"

const NOTHING = "nothing akasha left is under the folder git does not track"

const NO_GIT_DIR = "git names no directory for this checkout, so there is nowhere to sweep"

export type Sweeping = (gitDir: string, found: readonly Found[]) => Took

export function gitSweep(
  argv: readonly string[],
  given: Given,
  sweeping: Sweeping = takingFrom
): Answer {
  const read = takenFor(argv, given.calledAs, page, [plan])
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const gitDir = gitDirIn(given.root)
  if (gitDir === null) return refused(NO_GIT_DIR, OPERATIONAL)
  const found = foundIn(gitDir).filter((one) => one.there)
  if (found.length === 0) return told([NOTHING])
  if (read.taken.plan) return told(found.map((one) => `would take\t${one.at}`))
  const said = sweeping(gitDir, found)
  const took = said.took.map((one) => `took\t${one}`)
  if (said.refusals.length === 0) return told(took)
  return answeredWith(took, [...said.refusals, ...partWay(took)], OPERATIONAL)
}
