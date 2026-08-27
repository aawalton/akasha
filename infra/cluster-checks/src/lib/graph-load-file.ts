import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { DEFAULT_ADAPTERS } from "./ast-unused-adapters"
import type { DirectedEdge, DirectedGraph, Partition } from "./modularity"
import { loadWorkspaces } from "../../../../tools/lib/check-workflow/test-step-loader"
import { buildModuleGraph } from "./ts-import-graph-build"
import { readWorkspacesFromPackageJson } from "./ts-import-graph-workspaces"
import type { ModuleGraph } from "./ts-import-graph-types"

function buildFileModuleGraph(repoRoot: string): ModuleGraph {
  const configPath = resolve(repoRoot, "ast-unused.config.json")
  const workspaces = readWorkspacesFromPackageJson(
    existsSync(configPath) ? configPath : null,
    repoRoot
  )
  return buildModuleGraph({
    repoRoot,
    workspaces,
    adapters: [...DEFAULT_ADAPTERS],
  })
}

export function loadFileGraph(repoRoot: string): DirectedGraph {
  const moduleGraph = buildFileModuleGraph(repoRoot)

  const inScope = new Map<string, string>()
  for (const [absPath, mod] of moduleGraph.modules) {
    if (mod.role === "ignore") continue
    inScope.set(absPath, mod.relPath)
  }

  const nodes = [...inScope.values()].sort()
  const edges: DirectedEdge[] = []
  for (const [absPath, sourceRel] of inScope) {
    const mod = moduleGraph.modules.get(absPath)
    if (mod === undefined) continue
    for (const imp of mod.imports) {
      if (imp.resolvedPath === null) continue
      const targetRel = inScope.get(imp.resolvedPath)
      if (targetRel === undefined) continue
      if (targetRel === sourceRel) continue
      edges.push({ source: sourceRel, target: targetRel, line: imp.line })
    }
  }
  return { nodes, edges }
}

export function loadFileToPackagePartition(repoRoot: string): Partition {
  const moduleGraph = buildFileModuleGraph(repoRoot)
  const workspaces = loadWorkspaces(repoRoot)

  const rootToName = new Map<string, string>()
  for (const w of workspaces) rootToName.set(w.root, w.name)

  const map = new Map<string, string>()
  for (const mod of moduleGraph.modules.values()) {
    if (mod.role === "ignore") continue
    const name = rootToName.get(mod.workspaceRoot)
    if (name === undefined) continue
    map.set(mod.relPath, name)
  }
  return map
}

export function loadPackageActualGraph(repoRoot: string): DirectedGraph {
  const fileGraph = loadFileGraph(repoRoot)
  const partition = loadFileToPackagePartition(repoRoot)
  const workspaces = loadWorkspaces(repoRoot)

  const nodeSet = new Set<string>()
  for (const w of workspaces) nodeSet.add(w.name)
  const nodes = [...nodeSet].sort()

  const edges: DirectedEdge[] = []
  for (const e of fileGraph.edges) {
    const sourcePkg = partition.get(e.source)
    const targetPkg = partition.get(e.target)
    if (sourcePkg === undefined) continue
    if (targetPkg === undefined) continue
    if (sourcePkg === targetPkg) continue
    edges.push({ source: sourcePkg, target: targetPkg })
  }
  return { nodes, edges }
}
