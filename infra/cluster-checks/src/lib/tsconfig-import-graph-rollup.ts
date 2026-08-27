import { IMPORT_DYNAMIC_EDGE_TYPE, IMPORT_STATIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE, TS_FILE_NODE_TYPES, type TsFileAttrs } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/types.ts"
import { TsFileAttrsSchema } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/types-schemas"
import {
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
} from "../../../../../instructions/tools/lib/graph/producers/package/types.ts"
import type { Graph, NodeId } from "../../../../../instructions/tools/lib/graph/types.ts"
import type { ImportGraphs } from "./tsconfig-import-graph.ts"

const CODE_REPO = "code"

const IMPORT_EDGE_TYPES = [
  IMPORT_STATIC_EDGE_TYPE,
  IMPORT_DYNAMIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
] as const

const CONTRIBUTES_ALL: ReadonlySet<TsFileAttrs["discoveredVia"]> = new Set<
  TsFileAttrs["discoveredVia"]
>(["tsconfig", "tsconfig-include-only", "adapter", "entry-glob", "workspace-walk"])

const CONTRIBUTES_INCLUDED: TsFileAttrs["discoveredVia"] = "tsconfig"

interface Site {
  readonly workspace: string
  readonly pkg: string
}

interface SourceSite extends Site {
  readonly discoveredVia: TsFileAttrs["discoveredVia"]
}

function reach(map: Map<string, Set<string>>, from: string, to: string): undefined {
  const standing = map.get(from)
  if (standing === undefined) map.set(from, new Set([to]))
  else standing.add(to)
}

export function rollUpPackageImportGraphs(graph: Graph): ImportGraphs {
  const sources = new Map<NodeId, SourceSite>()
  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = TsFileAttrsSchema.parse(node.attrs)
    sources.set(node.id, {
      workspace: attrs.workspaceRoot,
      pkg: attrs.package,
      discoveredVia: attrs.discoveredVia,
    })
  }

  const packages = new Map<NodeId, Site>()
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = PackageAttrsSchema.parse(node.attrs)
    packages.set(node.id, { workspace: attrs.path, pkg: attrs.name })
  }

  const included = new Map<string, Set<string>>()
  const all = new Map<string, Set<string>>()

  for (const [id, source] of sources) {
    if (!CONTRIBUTES_ALL.has(source.discoveredVia)) continue
    const alsoIncluded = source.discoveredVia === CONTRIBUTES_INCLUDED
    for (const edge of graph.outEdges(id, IMPORT_EDGE_TYPES)) {
      const target = sources.get(edge.to) ?? packages.get(edge.to)
      if (target === undefined) continue
      if (target.pkg === source.pkg) continue
      if (target.workspace === source.workspace) continue
      reach(all, source.workspace, target.workspace)
      if (alsoIncluded) reach(included, source.workspace, target.workspace)
    }
  }

  return { included, all }
}
