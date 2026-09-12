import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import {
  answeredWith,
  INPUT,
  OK,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  type Answer,
  type Given,
  refused,
} from "akasha/commands/modules/calling/calling.module.code.ts"
import { gitSweep as page } from "akasha/commands/pages/git/sweep/git-sweep.command.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { foundIn, takingFrom } from "akasha/git/store-sweeping/git-store-sweeping.module.code.ts"

const NOTHING = "nothing akasha left is under the folder git does not track"

const NO_GIT_DIR = "git names no directory for this checkout, so there is nowhere to sweep"

export function gitSweep(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [dryRun])
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const gitDir = gitDirIn(given.root)
  if (gitDir === null) return refused(NO_GIT_DIR, OPERATIONAL)
  const found = foundIn(gitDir).filter((one) => one.there)
  if (found.length === 0) return told([NOTHING])
  if (read.taken.dryRun) return told(found.map((one) => `would take\t${one.at}`))
  const said = takingFrom(gitDir, found)
  return answeredWith(
    said.took.map((one) => `took\t${one}`),
    said.refusals,
    said.refusals.length === 0 ? OK : OPERATIONAL
  )
}
