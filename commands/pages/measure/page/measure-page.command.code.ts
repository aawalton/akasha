import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measurePage as page } from "akasha/commands/pages/measure/page/measure-page.command.ts"
import {
  pageTypeCountsIn,
  pageTypeLinesOf,
} from "akasha/commands/pages/measure/page/page-measuring/page-measuring.module.code.ts"

export function measurePage(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  return told(pageTypeLinesOf(pageTypeCountsIn(given.root)))
}
