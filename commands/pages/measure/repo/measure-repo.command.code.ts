import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measureRepo as page } from "akasha/commands/pages/measure/repo/measure-repo.command.ts"
import {
  fileTypeCountsIn,
  fileTypeLinesOf,
} from "akasha/commands/pages/measure/repo/repo-measuring/repo-measuring.module.code.ts"

export function measureRepo(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  return told(fileTypeLinesOf(fileTypeCountsIn(given.root)))
}
