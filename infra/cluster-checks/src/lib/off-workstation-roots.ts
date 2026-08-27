import {
  DOCKERFILE_RECIPE_INPUT_EDGE_TYPE,
  DOCKERFILE_RECIPE_NODE_TYPE,
} from "../../../../../instructions/tools/lib/graph/producers/dockerfile-recipe/types.ts"
import type { Graph, NodeId } from "../../../../../instructions/tools/lib/graph/types.ts"
import { graphNodeId } from "./graph-node-id.ts"
import { WORKER_SUFFIX } from "./worker-suffix.ts"
import { z } from "zod"
import {
  PACKAGE_NODE_TYPE,
  packageNameFromId,
  pathFromFileNodeId,
  readPath,
} from "./off-workstation-package-resolver"
import { isProcSourceCandidate } from "./ts-proc-source-names"

export const WORKFLOW_NODE_TYPE = "workflow"
const K8S_RESOURCE_NODE_TYPE = "k8s-resource"
const TS_FILE_NODE_TYPE = "ts-file"
const JSON_FILE_NODE_TYPE = "json-file"
const SH_FILE_NODE_TYPE = "sh-file"
const NATIVE_SHELL_MANIFEST = "capacitor.config.json"

const SourcePathAttrsSchema = z.object({ sourcePath: z.string() }).passthrough()
const RepoPathsAttrsSchema = z.object({ repoPaths: z.array(z.string()) }).passthrough()

export type RootKind =
  | "workflow"
  | "k8s-resource"
  | "pod-program"
  | "worker-entry"
  | "proc-source"
  | "addon"
  | "native-shell"
  | "spawned-script"
  | "sourced-shell-file"
  | "build-tooling-seed"
  | "dockerfile-recipe"

export type ResolvedRoot = {
  readonly kind: RootKind
  readonly nodeId: NodeId
  readonly path: string
  readonly packageName: string | undefined
  readonly subtree?: string
}

const readSourcePath = (attrs: unknown): string | undefined => {
  const parsed = SourcePathAttrsSchema.safeParse(attrs)
  return parsed.success ? parsed.data.sourcePath : undefined
}

const readRepoPaths = (attrs: unknown): readonly string[] => {
  const parsed = RepoPathsAttrsSchema.safeParse(attrs)
  return parsed.success ? parsed.data.repoPaths : []
}

export const collectRoots = (
  graph: Graph,
  resolvePackage: (path: string) => string | undefined,
  addonManifests: readonly string[] = [],
  spawnedScripts: readonly string[] = [],
  sourcedShellFiles: readonly string[] = [],
  buildToolingSeeds: readonly string[] = []
): readonly ResolvedRoot[] => {
  const roots: ResolvedRoot[] = []
  const packageDirs = new Map<string, string | undefined>()
  for (const node of graph.nodes([PACKAGE_NODE_TYPE])) {
    const name = packageNameFromId(node.id)
    if (name === undefined) continue
    packageDirs.set(name, readPath(node.attrs))
  }
  for (const path of addonManifests) {
    roots.push({
      kind: "addon",
      nodeId: graphNodeId(JSON_FILE_NODE_TYPE, path),
      path,
      packageName: resolvePackage(path),
    })
  }
  for (const path of spawnedScripts) {
    roots.push({
      kind: "spawned-script",
      nodeId: graphNodeId(TS_FILE_NODE_TYPE, path),
      path,
      packageName: resolvePackage(path),
    })
  }
  for (const path of sourcedShellFiles) {
    roots.push({
      kind: "sourced-shell-file",
      nodeId: graphNodeId(SH_FILE_NODE_TYPE, path),
      path,
      packageName: resolvePackage(path),
    })
  }
  for (const seed of buildToolingSeeds) {
    const declared = packageNameFromId(seed)
    if (declared === undefined) {
      const path = pathFromFileNodeId(seed)
      roots.push({
        kind: "build-tooling-seed",
        nodeId: seed,
        path,
        packageName: resolvePackage(path),
      })
      continue
    }
    const known = packageDirs.has(declared)
    roots.push({
      kind: "build-tooling-seed",
      nodeId: seed,
      path: packageDirs.get(declared) ?? seed,
      packageName: known ? declared : undefined,
    })
  }
  for (const node of graph.nodes([DOCKERFILE_RECIPE_NODE_TYPE])) {
    for (const edge of graph.outEdges(node.id, [DOCKERFILE_RECIPE_INPUT_EDGE_TYPE])) {
      const path = pathFromFileNodeId(edge.to)
      roots.push({
        kind: "dockerfile-recipe",
        nodeId: edge.to,
        path,
        packageName: resolvePackage(path),
      })
    }
  }
  for (const node of graph.nodes([JSON_FILE_NODE_TYPE])) {
    const path = pathFromFileNodeId(node.id)
    if (!path.endsWith(`/${NATIVE_SHELL_MANIFEST}`)) continue
    roots.push({
      kind: "native-shell",
      nodeId: node.id,
      path,
      packageName: resolvePackage(path),
      subtree: path.slice(0, path.length - NATIVE_SHELL_MANIFEST.length),
    })
  }
  for (const node of graph.nodes([TS_FILE_NODE_TYPE])) {
    const path = pathFromFileNodeId(node.id)
    if (path.endsWith(WORKER_SUFFIX)) {
      roots.push({
        kind: "worker-entry",
        nodeId: node.id,
        path,
        packageName: resolvePackage(path),
      })
      continue
    }
    if (isProcSourceCandidate(path)) {
      roots.push({
        kind: "proc-source",
        nodeId: node.id,
        path,
        packageName: resolvePackage(path),
      })
    }
  }
  for (const node of graph.nodes([WORKFLOW_NODE_TYPE])) {
    const path = readSourcePath(node.attrs)
    if (path === undefined) continue
    roots.push({
      kind: "workflow",
      nodeId: node.id,
      path,
      packageName: resolvePackage(path),
    })
  }
  for (const node of graph.nodes([K8S_RESOURCE_NODE_TYPE])) {
    const path = readPath(node.attrs)
    if (path !== undefined) {
      roots.push({
        kind: "k8s-resource",
        nodeId: node.id,
        path,
        packageName: resolvePackage(path),
      })
    }
    for (const programPath of readRepoPaths(node.attrs)) {
      roots.push({
        kind: "pod-program",
        nodeId: node.id,
        path: programPath,
        packageName: resolvePackage(programPath),
      })
    }
  }
  return roots
}
