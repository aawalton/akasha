import {
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPE,
  TSX_FILE_NODE_TYPE,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import {
  ReExportAttrsSchema,
  TsFileAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"

const isTsSourceNodeType = (type: string): boolean =>
  type === TS_FILE_NODE_TYPE || type === TSX_FILE_NODE_TYPE
const WILDCARD_SYMBOL = "*"

const collectInto = (
  graph: Graph,
  fileNodeId: string,
  visited: Set<string>,
  surface: Set<string>
): undefined => {
  if (visited.has(fileNodeId)) return
  visited.add(fileNodeId)

  const node = graph.node(fileNodeId)
  if (node === undefined || !isTsSourceNodeType(node.type)) return

  const attrs = TsFileAttrsSchema.parse(node.attrs)

  for (const entry of attrs.exports) {
    if (entry.typeOnly) continue
    if (entry.kind === "interface" || entry.kind === "type") continue
    surface.add(entry.name)
  }

  const reExportEdges = graph.outEdges(fileNodeId, [RE_EXPORT_EDGE_TYPE])
  for (const edge of reExportEdges) {
    const edgeAttrs = ReExportAttrsSchema.parse(edge.attrs)
    if (edgeAttrs.typeOnly) continue
    const isWildcard = edgeAttrs.importedSymbols.some((s) => s === WILDCARD_SYMBOL)
    if (!isWildcard) continue
    collectInto(graph, edge.to, visited, surface)
  }
}

export const computeRuntimeExportSurface = (
  graph: Graph,
  fileNodeId: string
): readonly string[] | null => {
  const node = graph.node(fileNodeId)
  if (node === undefined) return null
  if (!isTsSourceNodeType(node.type)) return null

  const surface = new Set<string>()
  collectInto(graph, fileNodeId, new Set<string>(), surface)
  return [...surface].sort()
}
