import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { threshold } from "akasha/commands/arguments/pages/threshold.argument.ts"
import { top } from "akasha/commands/arguments/pages/top.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { maintainabilityLines } from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"
import { measureComplexityMaintainability as page } from "akasha/commands/pages/measure/complexity/maintainability/measure-complexity-maintainability.command.ts"

export function measureComplexityMaintainability(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json, filePath, top, threshold])
  if ("refused" in read) return mistaking(read.refused)
  return answeredBy(() => maintainabilityLines(read.taken, resolve(given.root)))
}
