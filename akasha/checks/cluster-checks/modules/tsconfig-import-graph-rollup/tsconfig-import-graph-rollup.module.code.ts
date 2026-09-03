import type { TreeReading } from "../tree-reading/tree-reading.module.code.ts"
import type { ImportGraphs } from "../tsconfig-import-graph/tsconfig-import-graph.module.code.ts"
import { packageImportGraphsIn } from "../workspace-import-graph/workspace-import-graph.module.code.ts"

export function rollUpPackageImportGraphs(reading: TreeReading): ImportGraphs {
  return packageImportGraphsIn(reading)
}
