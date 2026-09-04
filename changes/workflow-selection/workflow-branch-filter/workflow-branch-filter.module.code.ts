import type {
  PipelineConfig,
  WorkflowConfig,
} from "../workflow-config/workflow-config.module.code.ts"
import { workflowWatchMatches } from "../workflow-watch-gate/workflow-watch-gate.module.code.ts"

export function matchesBranch(wf: WorkflowConfig, currentBranch: string): boolean {
  const filter = wf.whenBranch
  if (filter === undefined || filter === "*") return true
  if (filter.startsWith("!")) return currentBranch !== filter.slice(1)
  return filter === currentBranch
}

export function selectWorkflows(config: PipelineConfig, branch: string): readonly WorkflowConfig[] {
  return config.workflows
    .filter((wf) => workflowWatchMatches(config, wf))
    .filter((wf) => matchesBranch(wf, branch))
}
