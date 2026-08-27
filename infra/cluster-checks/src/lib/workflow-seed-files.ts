import {
  isScopedPopulation,
  type NodeType,
  type ScopedNodeTypePopulation,
} from "../../../../tools/lib/workflow-dsl/types.ts"
import {
  closureFromSeeds,
  importGraphClosureFromSeeds,
} from "../../../../tools/lib/graph/queries/closure.ts"
import type { Graph, Node } from "../../../../tools/lib/graph/types.ts"
import { graphNodeId } from "./graph-node-id.ts"
import { z } from "zod"
import { K8S_RESOURCE_NODE_TYPE } from "../../../../tools/lib/graph/producers/k8s/types"
import { PACKAGE_NODE_TYPE } from "../../../../tools/lib/graph/producers/package/types"
import { WORKFLOW_NODE_TYPE } from "../../../../tools/lib/graph/producers/pipeline/types"

const PathAttrsSchema = z.object({ path: z.string() }).passthrough()
const WorkflowSourcePathAttrsSchema = z.object({ sourcePath: z.string() }).passthrough()

const pathsFromNode = (node: Node): { paths: readonly string[]; isPackage: boolean } => {
  switch (node.type) {
    case PACKAGE_NODE_TYPE: {
      return { paths: [], isPackage: true }
    }
    case WORKFLOW_NODE_TYPE: {
      const attrs = WorkflowSourcePathAttrsSchema.parse(node.attrs)
      return { paths: [attrs.sourcePath], isPackage: false }
    }
    case K8S_RESOURCE_NODE_TYPE: {
      const attrs = PathAttrsSchema.parse(node.attrs)
      return { paths: [attrs.path], isPackage: false }
    }
    default: {
      const parsed = PathAttrsSchema.safeParse(node.attrs)
      if (parsed.success) {
        return { paths: [parsed.data.path], isPackage: false }
      }
      return { paths: [], isPackage: false }
    }
  }
}

const expandPopulationEntry = (
  graph: Graph,
  entry: NodeType | ScopedNodeTypePopulation
): Iterable<string> => {
  if (!isScopedPopulation(entry)) {
    return graph.nodes(entry).map((n) => n.id)
  }
  const scoped = entry
  const prefix = `${scoped.under}/`
  const ids: string[] = []
  for (const node of graph.nodes(scoped.kind)) {
    const { paths } = pathsFromNode(node)
    if (paths.length === 0) continue
    const matched = paths.some((p) => p === scoped.under || p.startsWith(prefix))
    if (matched) ids.push(node.id)
  }
  return ids
}

export const importGraphClosureFiles = (
  graph: Graph,
  seedIds: Iterable<string>
): readonly string[] => {
  const reached = importGraphClosureFromSeeds(graph, seedIds)
  const files = new Set<string>()
  for (const id of reached) {
    const node = graph.node(id)
    if (node === undefined) continue
    const { paths } = pathsFromNode(node)
    for (const path of paths) files.add(path)
  }
  return [...files].sort()
}

export interface WorkflowSeedSource {
  readonly name: string
  readonly package?: string
  readonly dispatchNodes?: readonly string[]
  readonly dispatchNodeTypes?: readonly (NodeType | ScopedNodeTypePopulation)[]
  readonly steps?: readonly {
    readonly dispatchNodes?: readonly string[]
    readonly dispatchNodeTypes?: readonly (NodeType | ScopedNodeTypePopulation)[]
  }[]
}

export const resolveWorkflowSeedFiles = (
  graph: Graph,
  workflows: readonly WorkflowSeedSource[],
  opts: { readonly includeStepSeeds?: boolean } = {}
): Map<string, readonly string[]> => {
  const configs = new Map<string, readonly string[]>()

  for (const p of workflows) {
    const seedIds = new Set<string>()

    const addBindingSeeds = (
      dispatchNodes: readonly string[] | undefined,
      dispatchNodeTypes: readonly (NodeType | ScopedNodeTypePopulation)[] | undefined
    ): undefined => {
      if (dispatchNodes) {
        for (const id of dispatchNodes) seedIds.add(id)
      }
      if (dispatchNodeTypes) {
        for (const t of dispatchNodeTypes) {
          for (const id of expandPopulationEntry(graph, t)) seedIds.add(id)
        }
      }
    }

    const pkgName = p.package
    if (pkgName != null) {
      const seedId = graphNodeId(PACKAGE_NODE_TYPE, pkgName)
      if (graph.node(seedId) !== undefined) seedIds.add(seedId)
    }
    addBindingSeeds(p.dispatchNodes, p.dispatchNodeTypes)
    if (opts.includeStepSeeds && p.steps) {
      for (const step of p.steps) addBindingSeeds(step.dispatchNodes, step.dispatchNodeTypes)
    }

    if (seedIds.size === 0) continue

    const reached = closureFromSeeds(graph, seedIds)
    const files = new Set<string>()
    let sawPackage = false
    for (const id of reached) {
      const node = graph.node(id)
      if (node === undefined) continue
      const { paths, isPackage } = pathsFromNode(node)
      for (const path of paths) files.add(path)
      if (isPackage) sawPackage = true
    }
    if (sawPackage) {
      files.add("package.json")
      files.add("bun.lock")
    }
    const selfNode = graph.node(graphNodeId(WORKFLOW_NODE_TYPE, p.name))
    if (selfNode !== undefined) {
      const selfAttrs = WorkflowSourcePathAttrsSchema.parse(selfNode.attrs)
      files.add(selfAttrs.sourcePath)
    }

    if (files.size === 0) continue

    configs.set(p.name, [...files].sort())
  }

  return configs
}
