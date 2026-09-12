import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { top } from "akasha/commands/arguments/pages/top.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { reportLines } from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { reportedBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"
import { measureComplexityReport as page } from "akasha/commands/pages/measure/complexity/report/measure-complexity-report.command.ts"

export function measureComplexityReport(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json, top])
  if ("refused" in read) return mistaking(read.refused)
  return reportedBy(() => reportLines(read.taken, resolve(given.root)))
}
