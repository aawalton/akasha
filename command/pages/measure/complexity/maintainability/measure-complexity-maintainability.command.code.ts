import { resolve } from "node:path"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { filePath } from "akasha/command/arguments/pages/file-path.argument.ts"
import { json } from "akasha/command/arguments/pages/json.argument.ts"
import { threshold } from "akasha/command/arguments/pages/threshold.argument.ts"
import { top } from "akasha/command/arguments/pages/top.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { maintainabilityLines } from "akasha/command/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { reportedBy } from "akasha/command/modules/report-answering/report-answering.module.code.ts"
import { measureComplexityMaintainability as page } from "akasha/command/pages/measure/complexity/maintainability/measure-complexity-maintainability.command.ts"

export function measureComplexityMaintainability(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json, filePath, top, threshold])
  if ("refused" in read) return mistaking(read.refused)
  return reportedBy(() => maintainabilityLines(read.taken, resolve(given.root)))
}
