export interface CoverageNode {
  readonly d: number
  readonly children: readonly CoverageNode[]
}

export interface ComputedNode {
  readonly d: number
  readonly c: number
  readonly children: readonly ComputedNode[]
}

export function computeCoverage(node: CoverageNode): ComputedNode {
  const children = node.children.map(computeCoverage)
  if (children.length === 0) {
    return { d: node.d, c: node.d, children }
  }
  const meanChildC = children.reduce((sum, ch) => sum + ch.c, 0) / children.length
  return { d: node.d, c: 0.5 * node.d + 0.5 * meanChildC, children }
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

export function formatScore(n: number): string {
  return round2(n).toFixed(2)
}
