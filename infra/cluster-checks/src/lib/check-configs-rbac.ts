import type { NodeType, ScopedNodeTypePopulation } from "../../../../../instructions/tools/lib/workflow-dsl/types.ts"
import type { CheckConfig } from "./check-configs-types"

const RBAC_GENERATOR_MODULES: ScopedNodeTypePopulation = {
  kind: "ts-file",
  under: "packages/infra/ci/workflows/src",
}

const PROFILE_POPULATION: readonly NodeType[] = ["namespace-role"]

export const RBAC_CHECKS: CheckConfig[] = [
  {
    name: "rbac-check",
    dispatchNodeTypes: [...PROFILE_POPULATION, RBAC_GENERATOR_MODULES],
    dispatchNodes: ["ts-file:code:packages/infra/ci/workflows/src/generate-rbac.ts"],
    commands: (ci) => [
      `cd ${ci.workspace} && bun packages/infra/ci/workflows/src/generate-rbac.ts --check`,
    ],
  },
  {
    name: "rbac-check-manifests",
    dispatchNodeTypes: ["workflow", "ts-file"],
    dispatchNodes: ["ts-file:code:packages/infra/ci/workflows/src/generate-rbac.ts"],
    commands: (ci) => [
      `cd ${ci.workspace} && bun packages/infra/ci/workflows/src/generate-rbac.ts --check-manifests`,
    ],
  },
  {
    name: "rbac-check-pipelines",
    dispatchNodeTypes: ["workflow", ...PROFILE_POPULATION, RBAC_GENERATOR_MODULES],
    dispatchNodes: ["ts-file:code:packages/infra/ci/workflows/src/generate-rbac.ts"],
    commands: (ci) => [
      `cd ${ci.workspace} && bun packages/infra/ci/workflows/src/generate-rbac.ts --check-pipelines`,
    ],
  },
  {
    name: "rbac-check-cluster-resource-names",
    dispatchNodeTypes: ["ts-file"],
    dispatchNodes: ["ts-file:code:packages/infra/ci/workflows/src/generate-rbac.ts"],
    commands: (ci) => [
      `cd ${ci.workspace} && bun packages/infra/ci/workflows/src/generate-rbac.ts --check-cluster-resource-names`,
    ],
  },
  {
    name: "rbac-check-cluster-grants",
    dispatchNodeTypes: ["ts-file"],
    dispatchNodes: ["ts-file:code:packages/infra/ci/workflows/src/generate-rbac.ts"],
    commands: (ci) => [
      `cd ${ci.workspace} && bun packages/infra/ci/workflows/src/generate-rbac.ts --check-cluster-grants`,
    ],
  },
]
