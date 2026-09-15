import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measurePage as page } from "akasha/command/pages/measure/page/measure-page.command.ts"
import {
  pageTypeCountsIn,
  pageTypeLinesOf,
} from "akasha/command/pages/measure/page/modules/page-measuring/page-measuring.module.code.ts"

export function measurePage(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  return told(pageTypeLinesOf(pageTypeCountsIn(given.root)))
}
