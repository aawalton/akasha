import { relative, resolve } from "node:path"

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null
}

export interface ImportGraphs {
  included: Map<string, Set<string>>
  all: Map<string, Set<string>>
}

export function cycleKey(a: string, b: string): string {
  return a < b ? `${a} -> ${b}` : `${b} -> ${a}`
}

export function getReferencedPaths(
  workspace: string,
  tsconfig: Record<string, unknown>,
  repoRoot: string
): Set<string> {
  const rawRefs = tsconfig.references
  const result = new Set<string>()
  if (!Array.isArray(rawRefs)) return result
  for (const ref of rawRefs) {
    if (!isRecord(ref)) continue
    const path = ref.path
    if (typeof path !== "string") continue
    const absPath = resolve(repoRoot, workspace, path)
    result.add(relative(repoRoot, absPath))
  }
  return result
}

export function findCycles(graph: Map<string, Set<string>>): Set<string> {
  const cycles = new Set<string>()
  for (const [ws, deps] of graph) {
    for (const dep of deps) {
      const depDeps = graph.get(dep)
      if (depDeps?.has(ws)) {
        cycles.add(cycleKey(ws, dep))
      }
    }
  }
  return cycles
}
