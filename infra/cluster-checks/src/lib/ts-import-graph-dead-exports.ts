import { clearInternalUseCache, hasInternalUse } from "./ts-import-graph-internal-use"
import type { ModuleGraph, UnusedExportDiagnostic } from "./ts-import-graph-types"

export function isTestFile(relPath: string): boolean {
  return (
    relPath.endsWith(".test.ts") ||
    relPath.endsWith(".test.tsx") ||
    relPath.endsWith(".vitest.ts") ||
    relPath.endsWith(".test-utils.ts") ||
    relPath.endsWith("-test-utils.ts") ||
    relPath.endsWith("_test_utils.ts")
  )
}

function isLiveIn(live: Map<string, Set<string>>, filePath: string, name: string): boolean {
  const s = live.get(filePath)
  if (!s) return false
  if (s.has("*")) return true
  return s.has(name)
}

export function collectUnusedExports(
  graph: ModuleGraph,
  live: Map<string, Set<string>>
): readonly UnusedExportDiagnostic[] {
  const diagnostics: UnusedExportDiagnostic[] = []
  clearInternalUseCache()
  for (const node of graph.modules.values()) {
    if (node.role === "transit" || node.role === "ignore") continue
    if (isTestFile(node.relPath)) continue
    if (node.consumerOnly) continue
    if (node.pragmas.file) continue
    const exportNameSet = new Set(node.exports.map((e) => e.name))
    const liveExportNames = new Set<string>()
    for (const exp of node.exports) {
      if (isLiveIn(live, node.filePath, exp.name)) liveExportNames.add(exp.name)
    }
    for (const exp of node.exports) {
      if (exp.typeOnly && exp.kind !== "reexport") {
      }
      const suppressingPragma = node.pragmas.lines.get(exp.line - 1)
      if (suppressingPragma) continue
      if (isLiveIn(live, node.filePath, exp.name)) continue
      if (
        exp.kind !== "reexport" &&
        hasInternalUse(node.filePath, exp.name, exportNameSet, liveExportNames, exportNameSet)
      )
        continue
      diagnostics.push({
        kind: "UnusedExport",
        filePath: node.filePath,
        relPath: node.relPath,
        line: exp.line,
        exportName: exp.name,
        exportKind: exp.kind,
        reason: "not reached from any entry",
      })
    }
  }
  clearInternalUseCache()
  return diagnostics
}
