import {
  type ClosureMembership,
  MEMBERSHIP_ALL,
  resolveClosureMembership,
} from "@tools/lib/graph/queries/membership"
import { closureIntersectsChangedFiles } from "../closure-reach/closure-reach.module.code.ts"
import type {
  PipelineConfig,
  WorkflowConfig,
} from "../workflow-config/workflow-config.module.code.ts"

export function workflowWatchMatches(config: PipelineConfig, wf: WorkflowConfig): boolean {
  if (wf.alwaysRun === true) return true
  if (config.graph === undefined) return true
  return closureIntersectsChangedFiles(
    config.graph,
    { nodes: wf.dispatchNodes, nodeTypes: wf.dispatchNodeTypes },
    config.changedPaths
  )
}

export function workflowWatchMembership(
  config: PipelineConfig,
  wf: WorkflowConfig
): ClosureMembership {
  if (config.graph === undefined) return MEMBERSHIP_ALL
  return resolveClosureMembership(config.graph, {
    nodes: wf.dispatchNodes,
    nodeTypes: wf.dispatchNodeTypes,
  })
}
