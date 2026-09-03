import {
  RE_EXPORT_EDGE_TYPE,
  tsFileNodeIdToCodeRepoRel,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import {
  ReExportAttrsSchema,
  TsFileAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"

export type DefinerResult = { readonly moduleId: string; readonly sourceName: string } | null

export const makeResolveDefiner = (
  graph: Graph
): ((nodeId: string, symbol: string) => DefinerResult) => {
  const memo = new Map<string, DefinerResult>()
  const inProgress = new Set<string>()
  const attrsByNode = new Map<string, ReturnType<typeof TsFileAttrsSchema.parse> | null>()
  const attrsOf = (nodeId: string): ReturnType<typeof TsFileAttrsSchema.parse> | null => {
    const cached = attrsByNode.get(nodeId)
    if (cached !== undefined) return cached
    const node = tsFileNodeIdToCodeRepoRel(nodeId) === null ? undefined : graph.node(nodeId)
    const parsed = node === undefined ? null : TsFileAttrsSchema.parse(node.attrs)
    attrsByNode.set(nodeId, parsed)
    return parsed
  }

  const compute = (nodeId: string, symbol: string): DefinerResult => {
    const attrs = attrsOf(nodeId)
    if (attrs === null) return null

    const direct = attrs.exports.find(
      (e) => e.name === symbol && !e.typeOnly && e.kind !== "reexport"
    )
    if (direct !== undefined) return { moduleId: nodeId, sourceName: symbol }

    for (const edge of graph.outEdges(nodeId, [RE_EXPORT_EDGE_TYPE])) {
      const rattrs = ReExportAttrsSchema.parse(edge.attrs)
      if (rattrs.typeOnly) continue
      if (rattrs.reexportLocalNames === null) {
        if (rattrs.importedSymbols.some((s) => s === "*")) {
          const r = resolve(edge.to, symbol)
          if (r !== null) return r
        }
        continue
      }
      const idx = rattrs.reexportLocalNames.indexOf(symbol)
      if (idx < 0) continue
      const src = rattrs.importedSymbols[idx]
      if (typeof src !== "string" || src === "*") continue
      const r = resolve(edge.to, src)
      if (r !== null) return r
    }
    return null
  }

  const resolve = (nodeId: string, symbol: string): DefinerResult => {
    const key = `${nodeId} ${symbol}`
    const cached = memo.get(key)
    if (cached !== undefined) return cached
    if (inProgress.has(key)) return null
    inProgress.add(key)
    const result = compute(nodeId, symbol)
    inProgress.delete(key)
    memo.set(key, result)
    return result
  }

  return resolve
}
