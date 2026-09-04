import type { PopulationEntry } from "@akasha/old-graph/old-graph-queries"
import type { Graph, NodeId } from "@akasha/old-graph/old-graph-types"
import type {
  PipelineEntity,
  WorkflowEntity,
} from "../pipeline-entities/pipeline-entities.module.code.ts"

export type WorkflowConfig = {
  name: string
  kind?: string
  dependsOn?: readonly string[]
  whenBranch?: string
  alwaysRun?: boolean
  dispatchNodes?: readonly NodeId[]
  dispatchNodeTypes?: readonly PopulationEntry[]
  config: Record<string, unknown>
}

export type PipelineConfig = {
  readonly workflows: readonly WorkflowConfig[]
  readonly changedPaths: readonly string[]
  readonly graph?: Graph
}

export type AbsorbedWorkflow = {
  workflow: WorkflowEntity
  fromPipeline: PipelineEntity
  config: Record<string, unknown>
}
