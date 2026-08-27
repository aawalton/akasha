import type { DirectedGraph } from "./modularity"

export interface DriftEdge {
  readonly source: string
  readonly target: string
  readonly status: "aligned" | "phantom" | "unused-declaration"
  readonly fileImports: number
}

export interface DriftReport {
  readonly aligned: number
  readonly phantom: number
  readonly unusedDeclaration: number
  readonly edges: readonly DriftEdge[]
}

export function computeDrift(declared: DirectedGraph, actual: DirectedGraph): DriftReport {
  const edgeKey = (source: string, target: string): string => `${source}\u0000${target}`

  const declaredPairs = new Map<string, { source: string; target: string }>()
  for (const { source, target } of declared.edges) {
    if (source === target) continue
    const key = edgeKey(source, target)
    if (!declaredPairs.has(key)) declaredPairs.set(key, { source, target })
  }

  const actualCounts = new Map<string, { source: string; target: string; count: number }>()
  for (const { source, target } of actual.edges) {
    if (source === target) continue
    const key = edgeKey(source, target)
    const existing = actualCounts.get(key)
    if (existing) {
      existing.count += 1
    } else {
      actualCounts.set(key, { source, target, count: 1 })
    }
  }

  const edges: DriftEdge[] = []
  let aligned = 0
  let phantom = 0
  let unusedDeclaration = 0

  for (const [key, { source, target, count }] of actualCounts) {
    if (declaredPairs.has(key)) {
      edges.push({ source, target, status: "aligned", fileImports: count })
      aligned += 1
    } else {
      edges.push({ source, target, status: "phantom", fileImports: count })
      phantom += 1
    }
  }

  for (const [key, { source, target }] of declaredPairs) {
    if (actualCounts.has(key)) continue
    edges.push({ source, target, status: "unused-declaration", fileImports: 0 })
    unusedDeclaration += 1
  }

  return { aligned, phantom, unusedDeclaration, edges }
}
