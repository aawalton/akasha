import { z } from "zod"
import { isTestFilePath } from "../../../../akasha/checks/cluster-checks/modules/non-test-population/non-test-population.module.code.ts"
import type { Graph, NodeId } from "../../../../tools/lib/graph/types.ts"
import { graphNodeId } from "./graph-node-id.ts"
import {
  buildPackageResolver,
  PACKAGE_NODE_TYPE,
  PKG_CONTAINS_FILE_EDGE_TYPE,
  packageNameFromId,
  pathFromFileNodeId,
} from "./off-workstation-package-resolver"
import { collectRoots, type ResolvedRoot, WORKFLOW_NODE_TYPE } from "./off-workstation-roots"

const STEP_NODE_TYPE = "step"
const PKG_DEPENDS_EDGE_TYPE = "pkg-depends"

const IMPORT_STATIC_EDGE_TYPE = "import-static"
const IMPORT_DYNAMIC_EDGE_TYPE = "import-dynamic"
const RE_EXPORT_EDGE_TYPE = "re-export"
const IMPORT_EDGE_TYPES: readonly string[] = [
  IMPORT_STATIC_EDGE_TYPE,
  IMPORT_DYNAMIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
]

const RUNTIME_DEP_KINDS: ReadonlySet<string> = new Set(["dependencies"])
const DEV_DEP_KIND = "devDependencies"

const PackageAttrSchema = z.object({ package: z.string() }).passthrough()
const PackagePathSchema = z.object({ path: z.string() }).passthrough()
const DispatchNodesAttrsSchema = z.object({ dispatchNodes: z.array(z.string()) }).passthrough()
const ScriptAttrsSchema = z.object({ script: z.string() }).passthrough()
const PkgDependsKindSchema = z.object({ kind: z.string() }).passthrough()
const ImportTypeOnlySchema = z.object({ typeOnly: z.boolean() }).passthrough()

export type ReachPolicy = {
  readonly includeDevDependencies: boolean
}

export type OffWorkstationReach = {
  readonly roots: readonly ResolvedRoot[]
  readonly unresolvedRoots: readonly ResolvedRoot[]
  readonly reachedPaths: readonly string[]
  readonly seedPackages: readonly string[]
  readonly reachedPackages: readonly string[]
  readonly unreachedPackages: readonly string[]
  readonly packagePopulation: readonly string[]
}

const readDeclaredPackage = (attrs: unknown): string | undefined => {
  const parsed = PackageAttrSchema.safeParse(attrs)
  return parsed.success ? parsed.data.package : undefined
}

const readScript = (attrs: unknown): string | undefined => {
  const parsed = ScriptAttrsSchema.safeParse(attrs)
  return parsed.success ? parsed.data.script : undefined
}

const WORKSPACE_CONTAINER_PATH = ""

const isWorkspaceContainer = (attrs: unknown): boolean => {
  const parsed = PackagePathSchema.safeParse(attrs)
  return parsed.success && parsed.data.path === WORKSPACE_CONTAINER_PATH
}

const readWatchedPackages = (
  attrs: unknown,
  resolvePackage: (path: string) => string | undefined
): readonly string[] => {
  const parsed = DispatchNodesAttrsSchema.safeParse(attrs)
  if (!parsed.success) return []
  const out: string[] = []
  for (const id of parsed.data.dispatchNodes) {
    const declared = packageNameFromId(id)
    if (declared !== undefined) {
      out.push(declared)
      continue
    }
    if (!id.includes(":")) continue
    const owner = resolvePackage(pathFromFileNodeId(id))
    if (owner !== undefined) out.push(owner)
  }
  return out
}

const dependsEdgeCarriesReach = (attrs: unknown, policy: ReachPolicy): boolean => {
  const parsed = PkgDependsKindSchema.safeParse(attrs)
  if (!parsed.success) return false
  const kind = parsed.data.kind
  if (RUNTIME_DEP_KINDS.has(kind)) return true
  return policy.includeDevDependencies && kind === DEV_DEP_KIND
}

const importEdgeCarriesReach = (attrs: unknown, edgeType: string): boolean => {
  if (edgeType === IMPORT_DYNAMIC_EDGE_TYPE) return true
  const parsed = ImportTypeOnlySchema.safeParse(attrs)
  return !(parsed.success && parsed.data.typeOnly)
}

export const reachedPackagesFrom = (
  graph: Graph,
  seedPackageNames: readonly string[],
  policy: ReachPolicy,
  resolvePackage: (path: string) => string | undefined
): ReadonlySet<string> => {
  const reachedPackages = new Set<string>()
  const visited = new Set<NodeId>()
  const queue: NodeId[] = []

  const pushPackage = (name: string): undefined => {
    reachedPackages.add(name)
    const id = graphNodeId(PACKAGE_NODE_TYPE, name)
    if (visited.has(id)) return
    visited.add(id)
    queue.push(id)
  }

  for (const name of seedPackageNames) pushPackage(name)

  while (queue.length > 0) {
    const id = queue.shift()
    if (id === undefined) break

    if (packageNameFromId(id) !== undefined) {
      for (const edge of graph.outEdges(id, [PKG_DEPENDS_EDGE_TYPE])) {
        if (!dependsEdgeCarriesReach(edge.attrs, policy)) continue
        const dep = packageNameFromId(edge.to)
        if (dep !== undefined) pushPackage(dep)
      }
      for (const edge of graph.outEdges(id, [PKG_CONTAINS_FILE_EDGE_TYPE])) {
        if (visited.has(edge.to)) continue
        visited.add(edge.to)
        queue.push(edge.to)
      }
      continue
    }

    const path = pathFromFileNodeId(id)
    const owner = resolvePackage(path)
    if (owner !== undefined) pushPackage(owner)
    if (isTestFilePath(path)) continue

    for (const edge of graph.outEdges(id, IMPORT_EDGE_TYPES)) {
      if (!importEdgeCarriesReach(edge.attrs, edge.type)) continue
      if (visited.has(edge.to)) continue
      visited.add(edge.to)
      queue.push(edge.to)
    }
  }

  return reachedPackages
}

export const computeOffWorkstationReach = (
  graph: Graph,
  policy: ReachPolicy,
  addonManifests: readonly string[] = [],
  spawnedScripts: readonly string[] = [],
  sourcedShellFiles: readonly string[] = [],
  buildToolingSeeds: readonly string[] = []
): OffWorkstationReach => {
  const resolvePackage = buildPackageResolver(graph)
  const roots = collectRoots(
    graph,
    resolvePackage,
    addonManifests,
    spawnedScripts,
    sourcedShellFiles,
    buildToolingSeeds
  )
  const unresolvedRoots = roots.filter((root) => root.packageName === undefined)

  const seeds = new Set<string>()
  for (const root of roots) {
    if (root.packageName !== undefined) seeds.add(root.packageName)
  }
  for (const node of graph.nodes([WORKFLOW_NODE_TYPE])) {
    const declared = readDeclaredPackage(node.attrs)
    if (declared !== undefined) seeds.add(declared)
    for (const watched of readWatchedPackages(node.attrs, resolvePackage)) seeds.add(watched)
  }
  for (const node of graph.nodes([STEP_NODE_TYPE])) {
    const script = readScript(node.attrs)
    if (script === undefined) continue
    const owner = resolvePackage(script)
    if (owner !== undefined) seeds.add(owner)
  }

  const seedPackages = [...seeds].sort()
  const reached = reachedPackagesFrom(graph, seedPackages, policy, resolvePackage)

  const population: string[] = []
  for (const node of graph.nodes([PACKAGE_NODE_TYPE])) {
    if (isWorkspaceContainer(node.attrs)) continue
    const name = packageNameFromId(node.id)
    if (name !== undefined) population.push(name)
  }
  population.sort()

  const reachedPaths = [
    ...new Set(roots.flatMap((root) => (root.subtree === undefined ? [] : [root.subtree]))),
  ].sort()

  return {
    roots,
    unresolvedRoots,
    reachedPaths,
    seedPackages,
    reachedPackages: population.filter((name) => reached.has(name)),
    unreachedPackages: population.filter((name) => !reached.has(name)),
    packagePopulation: population,
  }
}
