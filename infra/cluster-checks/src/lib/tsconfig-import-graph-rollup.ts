import type { TreeReading } from "./tree-reading.ts"
import type { ImportGraphs } from "./tsconfig-import-graph.ts"
import { packageImportGraphsIn } from "./workspace-import-graph.ts"

export function rollUpPackageImportGraphs(reading: TreeReading): ImportGraphs {
  return packageImportGraphsIn(reading)
}
