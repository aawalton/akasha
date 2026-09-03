import {
  CSS_FILE_NODE_TYPE,
  CssFileAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/css-file/types.ts"
import { TS_FILE_NODE_TYPES } from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import { TsFileAttrsSchema } from "../../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import { extractPackageName } from "../../../../../tools/lib/graph/producers/package/scanner-helpers.ts"
import { PackageAttrsSchema } from "../../../../../tools/lib/graph/producers/package/types.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"
import type {
  WorkspaceInfo,
  WorkspaceUsage,
} from "../check-unused-deps-types/check-unused-deps-types.module.code.ts"

interface FileUsage {
  readonly specifiers: Set<string>
  readonly protocols: Set<string>
}

export type FileUsageIndex = ReadonlyMap<string, FileUsage>

export function indexFileUsage(graph: Graph): FileUsageIndex {
  const byPackage = new Map<string, FileUsage>()
  const bucketFor = (pkg: string): FileUsage => {
    const existing = byPackage.get(pkg)
    if (existing !== undefined) return existing
    const fresh: FileUsage = { specifiers: new Set<string>(), protocols: new Set<string>() }
    byPackage.set(pkg, fresh)
    return fresh
  }

  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    const attrs = TsFileAttrsSchema.parse(node.attrs)
    const usage = bucketFor(attrs.package)
    for (const entry of attrs.imports) {
      const spec = entry.specifier
      if (spec.startsWith("node:") || spec.startsWith("bun:")) {
        usage.protocols.add(spec)
        continue
      }
      const pkg = extractPackageName(spec)
      if (pkg !== null) usage.specifiers.add(pkg)
    }
  }

  for (const node of graph.nodes(CSS_FILE_NODE_TYPE)) {
    const attrs = CssFileAttrsSchema.parse(node.attrs)
    if (attrs.package === null) continue
    const usage = bucketFor(attrs.package)
    for (const ref of attrs.packageRefs) usage.specifiers.add(ref)
  }

  return byPackage
}

export function collectUsage(
  graph: Graph,
  ws: WorkspaceInfo,
  fileUsage: FileUsageIndex
): WorkspaceUsage {
  const specifiers = new Set<string>()
  const commands = new Set<string>()
  const protocols = new Set<string>()
  const configFileNames = new Set<string>()
  let hasTsconfig = false

  const pkgNode = graph.node(ws.nodeId)
  if (pkgNode !== undefined) {
    const attrs = PackageAttrsSchema.parse(pkgNode.attrs)
    for (const cmd of attrs.commandUsages) commands.add(cmd)
    for (const spec of attrs.nonTsSpecifiers) specifiers.add(spec)
    for (const proto of attrs.configFileProtocols) protocols.add(proto)
    for (const name of attrs.configFileNames) configFileNames.add(name)
    hasTsconfig = attrs.hasTsconfig
  }

  const own = fileUsage.get(ws.name)
  if (own !== undefined) {
    for (const spec of own.specifiers) specifiers.add(spec)
    for (const proto of own.protocols) protocols.add(proto)
  }

  return { specifiers, commands, protocols, hasTsconfig, configFileNames }
}

export function usageByWorkspace(
  graph: Graph,
  workspaces: readonly WorkspaceInfo[]
): ReadonlyMap<string, WorkspaceUsage> {
  const fileUsage = indexFileUsage(graph)
  const byRoot = new Map<string, WorkspaceUsage>()
  for (const ws of workspaces) byRoot.set(ws.root, collectUsage(graph, ws, fileUsage))
  return byRoot
}
