import { defineNodeDeriver } from "../../../../tools/lib/graph/define-node-deriver.ts"
import {
  ImportStaticAttrsSchema,
  ReExportAttrsSchema,
  TsFileAttrsSchema,
} from "../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPE,
  TS_FILE_NODE_TYPES,
  TSX_FILE_NODE_TYPE,
  type TsFileAttrs,
} from "../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import type { Edge, Graph, Node, NodeId } from "../../../../tools/lib/graph/types.ts"

const FOLLOWED_EDGE_TYPES = [
  IMPORT_STATIC_EDGE_TYPE,
  IMPORT_DYNAMIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
] as const

const ENTRY_DISCOVERED_VIA = new Set<TsFileAttrs["discoveredVia"]>([
  "tsconfig",
  "adapter",
  "entry-glob",
])

const readDiscoveredVia = (node: Node): TsFileAttrs["discoveredVia"] | undefined => {
  const parsed = TsFileAttrsSchema.safeParse(node.attrs)
  if (!parsed.success) return undefined
  return parsed.data.discoveredVia
}

const propagatesRuntime = (edge: Edge): boolean => {
  if (edge.type === IMPORT_DYNAMIC_EDGE_TYPE) return true
  if (edge.type === IMPORT_STATIC_EDGE_TYPE) {
    return ImportStaticAttrsSchema.parse(edge.attrs).typeOnly !== true
  }
  if (edge.type === RE_EXPORT_EDGE_TYPE) {
    return ReExportAttrsSchema.parse(edge.attrs).typeOnly !== true
  }
  return false
}

const forwardClosure = (graph: Graph, entries: readonly NodeId[]): ReadonlySet<NodeId> => {
  const visited = new Set<NodeId>(entries)
  const queue: NodeId[] = [...entries]
  while (queue.length > 0) {
    const id = queue.shift()
    if (id === undefined) break
    for (const edge of graph.outEdges(id, FOLLOWED_EDGE_TYPES)) {
      if (!propagatesRuntime(edge)) continue
      if (!visited.has(edge.to)) {
        visited.add(edge.to)
        queue.push(edge.to)
      }
    }
  }
  return visited
}

export default defineNodeDeriver({
  name: "reachable-from-primary-entry",
  nodeTypesRead: [TS_FILE_NODE_TYPE, TSX_FILE_NODE_TYPE],
  edgeTypesRead: [IMPORT_STATIC_EDGE_TYPE, IMPORT_DYNAMIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE],
  nodeFieldWrites: [
    { typeName: TS_FILE_NODE_TYPE, fields: ["reachableFromPrimaryEntry"] },
    { typeName: TSX_FILE_NODE_TYPE, fields: ["reachableFromPrimaryEntry"] },
  ],
  dependsOn: [],
  derive: (graph) => {
    const tsFiles = graph.nodes(TS_FILE_NODE_TYPES)
    const entries: NodeId[] = []
    for (const node of tsFiles) {
      const dv = readDiscoveredVia(node)
      if (dv !== undefined && ENTRY_DISCOVERED_VIA.has(dv)) {
        entries.push(node.id)
      }
    }
    const reachable = forwardClosure(graph, entries)
    const nodePatches = tsFiles.map((node) => ({
      id: node.id,
      derived: { reachableFromPrimaryEntry: reachable.has(node.id) },
    }))
    return { nodePatches }
  },
})
