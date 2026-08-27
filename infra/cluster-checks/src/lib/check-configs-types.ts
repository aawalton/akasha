import type { NodeType, ScopedNodeTypePopulation } from "../../../../../instructions/tools/lib/workflow-dsl/types.ts"
import type { NodeId } from "../../../../../instructions/tools/lib/graph/types.ts"
import type {
  BackendOptions,
  CIContext,
  SecretRef,
} from "../../../../../instructions/tools/lib/workflow-dsl/types.ts"

export const treeShaArgs = (ci: CIContext): readonly string[] => ["--tree-sha", ci.treeSha]

export const WORKFLOW_SURFACE_POPULATION: ScopedNodeTypePopulation = {
  kind: "ts-file",
  under: "packages/infra/checks/src/lib/workflow-surface",
}

export const TS_POPULATION: readonly NodeType[] = ["ts-file", "tsx-file"]

export const TS_GRAPH_INPUT_POPULATION: readonly NodeType[] = [...TS_POPULATION, "tsconfig-file"]

interface CheckConfigCommon {
  name: string
  image?: string
  volumes?: readonly string[]
  environment?: Record<string, string | SecretRef>
  backendOptions?: BackendOptions
  rendersVerdict?: false
  dispatchNodes?: readonly NodeId[]
  dispatchNodeTypes?: readonly (NodeType | ScopedNodeTypePopulation)[]
  dependsOn?: readonly string[]
  closurePolicy?: "import-graph"
  alwaysRun?: boolean
}

export interface ScriptCheckConfig extends CheckConfigCommon {
  script: string
  args?: (ci: CIContext) => readonly string[]
  commands?: never
}

export interface CommandCheckConfig extends CheckConfigCommon {
  commands: (ci: CIContext) => readonly string[]
  script?: never
  args?: never
}

export type CheckConfig = ScriptCheckConfig | CommandCheckConfig
