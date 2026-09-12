import { resolve } from "node:path"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  maintainabilityLines,
  readIn,
} from "akasha/commands/modules/complexity-rowing/complexity-rowing.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { answeredBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"

export function measureComplexityMaintainability(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv, { file: true, threshold: true })
  if ("refused" in read) return mistaking(read.refused)
  return answeredBy(() => maintainabilityLines(read, resolve(given.root)))
}
