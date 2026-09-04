import type { Repo } from "@akasha/pages-system/markdown-document"

export type NodeId = string

export type NodeInit<TypeName extends string = string, Attrs = unknown> = {
  readonly type: TypeName
  readonly repo?: Repo
  readonly key: string
  readonly attrs: Attrs
}

export type EdgeInit<TypeName extends string = string, Attrs = unknown> = {
  readonly type: TypeName
  readonly from: NodeId
  readonly to: NodeId
  readonly attrs: Attrs
}

export type Node<TypeName extends string = string, Attrs = unknown> = NodeInit<TypeName, Attrs> & {
  readonly id: NodeId
  readonly derived: Record<string, unknown>
}

export type Edge<TypeName extends string = string, Attrs = unknown> = EdgeInit<TypeName, Attrs> & {
  readonly derived: Record<string, unknown>
}

export type NodeTypeDef<TypeName extends string = string> = {
  readonly name: TypeName
}

export type EdgeTypeDef<
  TypeName extends string = string,
  From extends string = string,
  To extends string = string,
> = {
  readonly name: TypeName
  readonly from: From
  readonly to: To
}

export type ProducerOutput = {
  readonly nodes: readonly NodeInit[]
  readonly edges: readonly EdgeInit[]
}

export type BuildContext = {
  readonly repoRoots: ReadonlyMap<Repo, string>
  readonly repoFiles: ReadonlyMap<Repo, readonly string[]>
  readonly commit: string
  readonly reach?: ReadonlyMap<Repo, readonly string[]>
}

export type Producer = {
  readonly name: string
  readonly nodeTypes: readonly string[]
  readonly edgeTypes: readonly string[]
  readonly dependsOn?: readonly string[]
  readonly build: (ctx: BuildContext, upstream: Graph) => Promise<ProducerOutput> | ProducerOutput
}

export type EdgeFilter = {
  readonly from?: NodeId
  readonly to?: NodeId
  readonly type?: string | readonly string[]
}

export type Graph = {
  readonly node: (id: NodeId) => Node | undefined
  readonly nodes: (typeName?: string | readonly string[]) => readonly Node[]
  readonly nodesByKey: (key: string, repo?: Repo) => readonly Node[]
  readonly edges: (filter?: EdgeFilter) => readonly Edge[]
  readonly outEdges: (from: NodeId, types?: string | readonly string[]) => readonly Edge[]
  readonly inEdges: (to: NodeId, types?: string | readonly string[]) => readonly Edge[]
}

export type DeriverFieldWrite = {
  readonly typeName: string
  readonly fields: readonly string[]
}

export type DeriverNodePatch = {
  readonly id: NodeId
  readonly derived: Record<string, unknown>
}

export type DeriverEdgePatch = {
  readonly type: string
  readonly from: NodeId
  readonly to: NodeId
  readonly derived: Record<string, unknown>
}

export type DeriverOutput = {
  readonly nodePatches: readonly DeriverNodePatch[]
  readonly edgePatches: readonly DeriverEdgePatch[]
}

export type Deriver<_NodeShape extends Node = Node, _EdgeShape extends Edge = Edge> = {
  readonly name: string
  readonly nodeTypesRead: readonly string[]
  readonly edgeTypesRead: readonly string[]
  readonly nodeFieldWrites: readonly DeriverFieldWrite[]
  readonly edgeFieldWrites: readonly DeriverFieldWrite[]
  readonly dependsOn: readonly string[]
  readonly derive: (graph: Graph) => DeriverOutput
}

export type Engine = {
  readonly registerNodeType: (def: NodeTypeDef) => void
  readonly registerEdgeType: (def: EdgeTypeDef) => void
  readonly registerProducer: (producer: Producer) => void
  readonly registerDeriver: (spec: Deriver) => void
  readonly build: (ctx: BuildContext) => Promise<Graph>
}
