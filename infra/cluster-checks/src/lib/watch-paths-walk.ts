import type { Graph } from "../../../../tools/lib/graph/types.ts"
import { PackageAttrsSchema, PKG_DEPENDS_EDGE_TYPE, PkgDependsAttrsSchema, type PkgDependsKind, packageNodeId } from "../../../../tools/lib/graph/producers/package/types"

const ALLOWED_KINDS: ReadonlySet<PkgDependsKind> = new Set(["dependencies", "devDependencies"])

export type WorkspaceDepKinds = ReadonlySet<PkgDependsKind> | "all"

export const transitiveWorkspaceDeps = (
  graph: Graph,
  pkgName: string,
  kinds: WorkspaceDepKinds = ALLOWED_KINDS
): Map<string, string> => {
  const seedId = packageNodeId(pkgName)
  if (graph.node(seedId) === undefined) return new Map()

  const reached = new Set<string>([seedId])
  const result = new Map<string, string>()
  const queue: string[] = [seedId]

  while (queue.length > 0) {
    const current = queue.shift()
    if (current === undefined) break
    for (const edge of graph.outEdges(current, [PKG_DEPENDS_EDGE_TYPE])) {
      const kind = PkgDependsAttrsSchema.parse(edge.attrs).kind
      if (kinds !== "all" && !kinds.has(kind)) continue
      if (reached.has(edge.to)) continue
      reached.add(edge.to)
      const node = graph.node(edge.to)
      if (node === undefined) continue
      const attrs = PackageAttrsSchema.parse(node.attrs)
      result.set(attrs.name, attrs.path)
      queue.push(edge.to)
    }
  }

  return result
}
