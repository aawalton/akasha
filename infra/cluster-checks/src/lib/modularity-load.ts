import type { DirectedEdge, DirectedGraph, Partition, SimpleGraph } from "./modularity"
import { loadWorkspaces } from "../../../../../instructions/tools/lib/check-workflow/test-step-loader"

const PACKAGES_PREFIX = "packages/"

export function domainOf(workspaceRoot: string): string {
  const trimmed = workspaceRoot.startsWith(PACKAGES_PREFIX)
    ? workspaceRoot.slice(PACKAGES_PREFIX.length)
    : workspaceRoot
  const first = trimmed.split("/")[0]
  return first ?? workspaceRoot
}

export function loadPackageGraph(repoRoot: string): SimpleGraph {
  const workspaces = loadWorkspaces(repoRoot)
  const names = new Set<string>()
  for (const w of workspaces) names.add(w.name)
  const nodes = [...names].sort()
  const seenEdge = new Set<string>()
  const edges: [string, string][] = []
  for (const w of workspaces) {
    if (!names.has(w.name)) continue
    const deps = new Set<string>([
      ...Object.keys(w.pkg.dependencies ?? {}),
      ...Object.keys(w.pkg.devDependencies ?? {}),
      ...Object.keys(w.pkg.peerDependencies ?? {}),
      ...Object.keys(w.pkg.optionalDependencies ?? {}),
    ])
    for (const dep of deps) {
      if (!names.has(dep)) continue
      if (dep === w.name) continue
      const key = w.name < dep ? `${w.name}|${dep}` : `${dep}|${w.name}`
      if (seenEdge.has(key)) continue
      seenEdge.add(key)
      edges.push([w.name, dep])
    }
  }
  return { nodes, edges }
}

export function loadPackageDirectedGraph(repoRoot: string): DirectedGraph {
  const workspaces = loadWorkspaces(repoRoot)
  const names = new Set<string>()
  for (const w of workspaces) names.add(w.name)
  const nodes = [...names].sort()
  const seenEdge = new Set<string>()
  const edges: DirectedEdge[] = []
  for (const w of workspaces) {
    if (!names.has(w.name)) continue
    const deps = new Set<string>([
      ...Object.keys(w.pkg.dependencies ?? {}),
      ...Object.keys(w.pkg.devDependencies ?? {}),
      ...Object.keys(w.pkg.peerDependencies ?? {}),
      ...Object.keys(w.pkg.optionalDependencies ?? {}),
    ])
    for (const dep of deps) {
      if (!names.has(dep)) continue
      if (dep === w.name) continue
      const key = `${w.name}|${dep}`
      if (seenEdge.has(key)) continue
      seenEdge.add(key)
      edges.push({ source: w.name, target: dep })
    }
  }
  return { nodes, edges }
}

export function loadPackageCurrentPartition(repoRoot: string): Partition {
  const workspaces = loadWorkspaces(repoRoot)
  const map = new Map<string, string>()
  for (const w of workspaces) map.set(w.name, domainOf(w.root))
  return map
}

export function loadPackageDeclaredHierarchy(
  repoRoot: string
): ReadonlyMap<string, readonly string[]> {
  const workspaces = loadWorkspaces(repoRoot)
  const map = new Map<string, readonly string[]>()
  for (const w of workspaces) {
    const trimmed = w.root.startsWith(PACKAGES_PREFIX)
      ? w.root.slice(PACKAGES_PREFIX.length)
      : w.root
    const segments = trimmed.split("/").filter((s) => s.length > 0)
    map.set(w.name, segments.length > 0 ? segments : [w.name])
  }
  return map
}
