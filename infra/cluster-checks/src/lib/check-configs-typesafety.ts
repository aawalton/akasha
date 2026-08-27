import type { NodeType } from "../../../../tools/lib/workflow-dsl/types.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types"

const TS_POPULATION: readonly NodeType[] = ["ts-file", "tsx-file"]

export const TYPESAFETY_CHECKS: CheckConfig[] = [
  {
    name: "syntax-bundle",
    alwaysRun: true,
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-syntax-bundle.ts",
      "ts-file:code:infra/cluster-checks/src/lib/syntax-scanner-entry.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-file-iteration.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-no-class.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-class-declarations.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-no-enum.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-enum-declarations.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-method-signature-bivariance.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-method-signatures.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-type-assertions.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-type-assertions.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-no-void-return.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-void-declarations.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-readonly-collections.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-collection-types.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-exhaustive-dispatch.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-exhaustive-dispatch.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-boundary-parse.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-boundary-reads.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-timezone-handling.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-timezone-violations.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-population-read-swallow.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-population-read-swallow.ts",
      "ts-file:code:infra/cluster-checks/src/lib/population.ts",
    ],
    backendOptions: {
      kubernetes: {
        resources: { requests: { cpu: "1", memory: "2Gi" }, limits: { memory: "4Gi" } },
      },
    },
    script: "infra/cluster-checks/src/checks/check-syntax-bundle.ts",
    args: treeShaArgs,
  },
  {
    name: "mock-module-surface",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-mock-module-surface.ts",
      "ts-file:code:infra/cluster-checks/src/lib/runtime-export-surface.ts",
      "ts-file:code:packages/shared/graph/producers/src/file/ts-file/parse-mock-module.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-mock-module-surface.ts",
    args: treeShaArgs,
  },
  {
    name: "mock-module-leak",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-mock-module-leak.ts",
      "ts-file:code:infra/cluster-checks/src/lib/runtime-export-surface.ts",
      "ts-file:code:infra/cluster-checks/src/lib/barrel-rebinding.ts",
      "ts-file:code:infra/cluster-checks/src/lib/fetch-seam-leak.ts",
      "ts-file:code:packages/shared/graph/producers/src/file/ts-file/parse-mock-module.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-mock-module-leak.ts",
    args: treeShaArgs,
  },
  {
    name: "unit-test-io-hermeticity",
    dispatchNodeTypes: [...TS_POPULATION, "json-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-unit-test-io-hermeticity.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-unit-test-io-hermeticity.ts",
    args: treeShaArgs,
  },
]
