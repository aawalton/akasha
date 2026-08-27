import type { NodeType } from "../../../../tools/lib/workflow-dsl/types.ts"
import type { NodeId } from "../../../../tools/lib/graph/types.ts"
import type { CheckConfig } from "./check-configs-types"
import { AST_GREP_CHECK } from "./check-configs-ast-grep"
import { TS_POPULATION, treeShaArgs, WORKFLOW_SURFACE_POPULATION } from "./check-configs-types"

const WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES: readonly (
  | NodeType
  | typeof WORKFLOW_SURFACE_POPULATION
)[] = ["workflow", WORKFLOW_SURFACE_POPULATION]
const WORKFLOW_DEFINITION_DISPATCH_NODES: readonly NodeId[] = ["package:code:@infra/workflow-dsl"]

export const CI_META_CHECKS: CheckConfig[] = [
  {
    name: "ci-workflow-graph",
    dispatchNodeTypes: [
      ...WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES,
      { kind: "ts-file", under: "packages/infra/ci" },
    ],
    dispatchNodes: [
      ...WORKFLOW_DEFINITION_DISPATCH_NODES,
      "ts-file:code:packages/infra/checks/src/checks/check-ci-workflow-graph.ts",
      "ts-file:code:packages/infra/checks/src/checks/check-ci-workflow-graph.cli.ts",
    ],
    script: "packages/infra/checks/src/checks/check-ci-workflow-graph.cli.ts",
    args: treeShaArgs,
  },
  {
    name: "ci-naming-conventions",
    dispatchNodeTypes: WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES,
    dispatchNodes: [
      ...WORKFLOW_DEFINITION_DISPATCH_NODES,
      "ts-file:code:packages/infra/checks/src/checks/check-ci-naming-conventions.ts",
      "ts-file:code:packages/infra/checks/src/checks/check-ci-naming-conventions.cli.ts",
      "ts-file:code:infra/cluster-checks/src/lib/pod-name-shape.ts",
    ],
    script: "packages/infra/checks/src/checks/check-ci-naming-conventions.cli.ts",
    args: treeShaArgs,
  },
  {
    name: "run-check-routing",
    alwaysRun: true,
    dispatchNodeTypes: WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES,
    dispatchNodes: [
      ...WORKFLOW_DEFINITION_DISPATCH_NODES,
      "ts-file:code:packages/infra/checks/src/checks/check-run-check-routing.ts",
      "ts-file:code:infra/cluster-checks/src/lib/run-check-routing.ts",
      "ts-file:code:infra/cluster-checks/src/run-check.ts",
    ],
    script: "packages/infra/checks/src/checks/check-run-check-routing.ts",
    args: treeShaArgs,
  },
  AST_GREP_CHECK,
  {
    name: "node-type-registry-sync",
    dispatchNodeTypes: TS_POPULATION,
    args: treeShaArgs,
    backendOptions: {
      kubernetes: {
        resources: { requests: { memory: "2Gi" }, limits: { memory: "4Gi" } },
      },
    },
    script: "infra/cluster-checks/src/checks/check-node-type-registry-sync.ts",
  },
  {
    name: "bare-ts-population-seeds",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/infra/checks/src" }],
    script: "packages/infra/checks/src/checks/check-bare-ts-population-seeds.ts",
  },
  {
    name: "step-config-field-consumption",
    dispatchNodes: [
      "package:code:@infra/ci-orchestrator",
      "ts-file:code:infra/cluster-checks/src/checks/check-step-config-field-consumption.ts",
      "ts-file:code:infra/cluster-checks/src/lib/step-config-field-consumption.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-step-config-field-consumption.ts",
  },
  {
    name: "supervisor-watch-set",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:packages/infra/ci/orchestrator/check-supervisor-watch-set.ts",
      "ts-file:code:packages/infra/ci/orchestrator/supervisor-watch-set.ts",
      "ts-file:code:packages/infra/ci/orchestrator-preparation/src/preparation-steps.ts",
      "ts-file:code:packages/infra/ci/orchestrator/k8s/synth-deployment.ts",
      "ts-file:code:packages/shared/worker-supervisor/src/main.ts",
      "ts-file:code:packages/shared/worker-supervisor/src/discovery.ts",
    ],
    script: "packages/infra/ci/orchestrator/check-supervisor-watch-set.ts",
  },
]
