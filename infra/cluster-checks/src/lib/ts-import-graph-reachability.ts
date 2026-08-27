import { collectUnusedExports, isTestFile } from "./ts-import-graph-dead-exports"
import type { ModuleGraph, ModuleNode, UnusedExportDiagnostic } from "./ts-import-graph-types"

export function findUnusedExports(graph: ModuleGraph): readonly UnusedExportDiagnostic[] {
  const diagnostics: UnusedExportDiagnostic[] = []
  for (const node of graph.modules.values()) {
    for (const inv of node.pragmas.invalid) {
      diagnostics.push({
        kind: "PragmaValidationError",
        filePath: node.filePath,
        relPath: node.relPath,
        line: inv.line,
        exportName: "",
        exportKind: "default",
        reason: `ast-unused${inv.kind === "file" ? "-file" : ""} pragma missing reason`,
      })
    }
  }

  const live = new Map<string, Set<string>>()

  const expandedRegular = new Set<string>()

  type QueueEntry =
    | { file: string; kind: "entry-reached" }
    | { file: string; kind: "wildcard" }
    | { file: string; kind: "names"; names: readonly string[] }

  const queue: QueueEntry[] = []

  function markNameLive(filePath: string, name: string): undefined {
    let s = live.get(filePath)
    let added = false
    if (!s) {
      s = new Set()
      live.set(filePath, s)
      added = true
    } else {
      added = !s.has(name) && !s.has("*")
    }
    s.add(name)
    if (added && expandedRegular.has(filePath)) {
      const node = graph.modules.get(filePath)
      if (node && node.role !== "ignore") expandReexports(node)
    }
  }

  function markAllLive(filePath: string): undefined {
    let s = live.get(filePath)
    let added = false
    if (!s) {
      s = new Set()
      live.set(filePath, s)
      added = true
    } else {
      added = !s.has("*")
    }
    s.add("*")
    if (added && expandedRegular.has(filePath)) {
      const node = graph.modules.get(filePath)
      if (node && node.role !== "ignore") expandReexports(node)
    }
  }

  function isLive(filePath: string, name: string): boolean {
    const s = live.get(filePath)
    if (!s) return false
    if (s.has("*")) return true
    return s.has(name)
  }

  function expandRegularImports(node: ModuleNode): undefined {
    if (expandedRegular.has(node.filePath)) return
    expandedRegular.add(node.filePath)
    const fromTransit = node.role === "transit"
    for (const imp of node.imports) {
      if (imp.isReexport) continue
      const target = imp.resolvedPath
      if (target == null) continue
      const wildcard =
        imp.importedNames.includes("*") || imp.dynamic || imp.importedNames.includes(null)
      if (wildcard) {
        if (fromTransit) {
          queue.push({ file: target, kind: "entry-reached" })
        } else {
          queue.push({ file: target, kind: "wildcard" })
        }
        continue
      }
      const runtimeNames: string[] = []
      for (const n of imp.importedNames) {
        if (n !== null && n !== "*") runtimeNames.push(n)
      }
      if (runtimeNames.length > 0) {
        queue.push({ file: target, kind: "names", names: runtimeNames })
      }
    }
  }

  function expandReexports(node: ModuleNode): undefined {
    const fromTransit = node.role === "transit"
    const liveSet = live.get(node.filePath)
    const isWildcardLive = liveSet?.has("*") ?? false
    const anyLive = liveSet !== undefined && liveSet.size > 0
    for (const imp of node.imports) {
      if (!imp.isReexport) continue
      const target = imp.resolvedPath
      if (target == null) continue
      const isWildcardEdge = imp.importedNames.includes("*") || imp.importedNames.includes(null)
      if (fromTransit) {
        queue.push({ file: target, kind: "entry-reached" })
        continue
      }
      if (isWildcardEdge) {
        if (anyLive) {
          queue.push({ file: target, kind: "wildcard" })
        } else {
          queue.push({ file: target, kind: "entry-reached" })
        }
        continue
      }
      const clauseNames: string[] = []
      const localNames = imp.reexportLocalNames
      for (let i = 0; i < imp.importedNames.length; i++) {
        const source = imp.importedNames[i]
        if (source == null || source === "*") continue
        const local = localNames?.[i] ?? source
        if (local == null || local === "*") continue
        if (isWildcardLive || (liveSet?.has(local) ?? false)) clauseNames.push(source)
      }
      if (clauseNames.length > 0) {
        queue.push({ file: target, kind: "names", names: clauseNames })
      } else {
        queue.push({ file: target, kind: "entry-reached" })
      }
    }
  }

  for (const entry of graph.entries) {
    const entryNode = graph.modules.get(entry)
    if (!entryNode) continue
    if (isTestFile(entryNode.relPath)) {
      for (const imp of entryNode.imports) {
        if (imp.resolvedPath == null) continue
        if (!graph.modules.has(imp.resolvedPath)) continue
        const names: string[] = []
        for (const n of imp.importedNames) {
          if (n === null || n === "*") continue
          names.push(n)
        }
        if (names.length > 0) {
          queue.push({ file: imp.resolvedPath, kind: "names", names })
        }
      }
      continue
    }
    if (entryNode.role === "entry") {
      queue.push({ file: entry, kind: "wildcard" })
    } else {
      queue.push({ file: entry, kind: "entry-reached" })
    }
  }

  for (const external of graph.externalRoots ?? []) {
    queue.push({ file: external, kind: "wildcard" })
  }

  while (queue.length > 0) {
    const item = queue.shift()
    if (item === undefined) break
    const node = graph.modules.get(item.file)
    if (!node) continue
    if (node.role === "ignore") continue

    if (node.role !== "transit") {
      if (item.kind === "wildcard") {
        markAllLive(node.filePath)
      } else if (item.kind === "names") {
        for (const n of item.names) markNameLive(node.filePath, n)
      }
    }

    const firstVisit = !expandedRegular.has(node.filePath)
    expandRegularImports(node)
    if (firstVisit) {
      expandReexports(node)
    }
  }

  let sigChanged = true
  while (sigChanged) {
    sigChanged = false
    for (const node of graph.modules.values()) {
      if (node.role === "transit" || node.role === "ignore") continue
      const exportNames = new Set(node.exports.map((e) => e.name))
      for (const exp of node.exports) {
        if (!isLive(node.filePath, exp.name)) continue
        if (!exp.signatureTypeRefs) continue
        for (const ref of exp.signatureTypeRefs) {
          if (exportNames.has(ref) && !isLive(node.filePath, ref)) {
            markNameLive(node.filePath, ref)
            sigChanged = true
          }
        }
      }
    }
  }

  diagnostics.push(...collectUnusedExports(graph, live))

  return diagnostics
}
