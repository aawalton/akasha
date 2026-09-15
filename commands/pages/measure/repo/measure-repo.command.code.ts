import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureRepo as page } from "akasha/command/pages/measure/repo/measure-repo.command.ts"
import {
  fileTypeCountsIn,
  fileTypeLinesOf,
} from "akasha/command/pages/measure/repo/modules/repo-measuring/repo-measuring.module.code.ts"

export function measureRepo(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  return told(fileTypeLinesOf(fileTypeCountsIn(given.root)))
}
