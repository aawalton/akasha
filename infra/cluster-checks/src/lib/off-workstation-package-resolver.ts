import { nodeIdPrefix } from "../../../../../instructions/tools/lib/graph/producers/lib/node-id.ts"
import type { Graph, NodeId } from "../../../../../instructions/tools/lib/graph/types.ts"
import { z } from "zod"

export const PACKAGE_NODE_TYPE = "package"
export const PKG_CONTAINS_FILE_EDGE_TYPE = "pkg-contains-file"
export const PACKAGE_ID_PREFIX = nodeIdPrefix(PACKAGE_NODE_TYPE)

const PathAttrsSchema = z.object({ path: z.string() }).passthrough()

export const keyFromNodeId = (id: NodeId): string => {
  const parts = id.split(":")
  if (parts.length < 3) throw new Error(`node id is not <type>:<repo>:<key>: ${id}`)
  return parts.slice(2).join(":")
}

export const packageNameFromId = (id: NodeId): string | undefined =>
  id.startsWith(PACKAGE_ID_PREFIX) ? keyFromNodeId(id) : undefined

export const pathFromFileNodeId = (id: NodeId): string => keyFromNodeId(id)

export const readPath = (attrs: unknown): string | undefined => {
  const parsed = PathAttrsSchema.safeParse(attrs)
  return parsed.success ? parsed.data.path : undefined
}

const buildPackageByFilePath = (graph: Graph): ReadonlyMap<string, string> => {
  const byPath = new Map<string, string>()
  for (const edge of graph.edges({ type: [PKG_CONTAINS_FILE_EDGE_TYPE] })) {
    const pkg = packageNameFromId(edge.from)
    if (pkg === undefined) continue
    const path = pathFromFileNodeId(edge.to)
    if (byPath.has(path)) continue
    byPath.set(path, pkg)
  }
  return byPath
}

export const buildPackageResolver = (graph: Graph): ((path: string) => string | undefined) => {
  const byFile = buildPackageByFilePath(graph)
  const dirs: { readonly prefix: string; readonly name: string }[] = []
  for (const node of graph.nodes([PACKAGE_NODE_TYPE])) {
    const name = packageNameFromId(node.id)
    if (name === undefined) continue
    const dir = readPath(node.attrs)
    if (dir === undefined || dir === "" || dir === ".") continue
    dirs.push({ prefix: dir.endsWith("/") ? dir : `${dir}/`, name })
  }
  dirs.sort((a, b) => b.prefix.length - a.prefix.length)

  return (path: string): string | undefined => {
    const exact = byFile.get(path)
    if (exact !== undefined) return exact
    for (const entry of dirs) {
      if (path.startsWith(entry.prefix)) return entry.name
    }
    return undefined
  }
}
