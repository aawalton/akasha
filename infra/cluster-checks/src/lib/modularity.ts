export interface SimpleGraph {
  readonly nodes: readonly string[]
  readonly edges: readonly (readonly [string, string])[]
}

export interface DirectedEdge {
  readonly source: string
  readonly target: string
  readonly line?: number
}

export interface DirectedGraph {
  readonly nodes: readonly string[]
  readonly edges: readonly DirectedEdge[]
}

export type Partition = ReadonlyMap<string, string>
