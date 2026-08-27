import type { NodeType } from "../../../../../instructions/tools/lib/workflow-dsl/types.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types"
import { VERIFICATION_SURFACE_CHECKS } from "./check-configs-verification-surface"
import { PROSE_CARRIER_NODE_TYPES } from "../../../../../instructions/tools/lib/check-workflow/prose-mechanism-restatement"

const TS_POPULATION: readonly NodeType[] = ["ts-file", "tsx-file"]
const YAML_POPULATION: readonly NodeType[] = ["yaml-file", "yml-file"]
const PACKAGE_POPULATION: readonly NodeType[] = ["package"]

export const SOURCE_SCANNER_CHECKS: CheckConfig[] = [
  {
    name: "prose-mechanism-restatement",
    dispatchNodeTypes: [...PROSE_CARRIER_NODE_TYPES],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-prose-mechanism-restatement.ts",
      "ts-file:code:infra/cluster-checks/src/lib/prose-mechanism-restatement.ts",
      "ts-file:code:infra/cluster-checks/src/lib/blank-comments.ts",
      "ts-file:code:infra/cluster-checks/src/lib/suppression-subject.ts",
      "json-file:code:infra/cluster-checks/src/lib/prose-mechanism-restatement.ratchet.json",
    ],
    script: "infra/cluster-checks/src/checks/check-prose-mechanism-restatement.ts",
  },
  {
    name: "generated-suffix",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-generated-suffix.cli.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-generated-suffix.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-generated-suffix.cli.ts",
  },
  {
    name: "porcelain-status-boundary",
    dispatchNodeTypes: [...TS_POPULATION, "sh-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-porcelain-status-boundary.ts",
      "ts-file:code:infra/cluster-checks/src/lib/porcelain-status-boundary.ts",
      "ts-file:code:infra/git-porcelain/src/parse-status.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-porcelain-status-boundary.ts",
  },
  {
    name: "dep-versions",
    dispatchNodeTypes: PACKAGE_POPULATION,
    dispatchNodes: ["json-file:code:package.json"],
    script: "infra/cluster-checks/src/checks/check-dep-versions.ts",
  },
  {
    name: "playwright-image-alignment",
    dispatchNodeTypes: [...PACKAGE_POPULATION, "json-file", "sh-file", "lock-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-playwright-image-alignment.ts",
      "ts-file:code:infra/cluster-checks/src/lib/playwright-image-alignment.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-playwright-image-alignment.ts",
  },
  {
    name: "unused-deps",
    dispatchNodeTypes: [
      ...TS_POPULATION,
      ...YAML_POPULATION,
      ...PACKAGE_POPULATION,
      "css-file",
      "sh-file",
      "dockerfile-file",
      "json-file",
    ],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-unused-deps.ts",
      "ts-file:code:infra/cluster-checks/src/lib/workspace-deps.ts",
    ],
    backendOptions: {
      kubernetes: { resources: { requests: { cpu: "1500m" }, limits: { memory: "2Gi" } } },
    },
    script: "infra/cluster-checks/src/checks/check-unused-deps.ts",
    args: treeShaArgs,
  },
  {
    name: "ast-unused-coverage",
    dispatchNodeTypes: ["package"],
    dispatchNodes: [
      "json-file:code:ast-unused.config.json",
      "ts-file:code:infra/cluster-checks/src/checks/check-ast-unused-coverage.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ast-unused-coverage.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-ast-unused-coverage.ts",
  },
  {
    name: "tmpfs-scratch",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "json-file:code:tmpfs-scratch.config.json",
      "ts-file:code:infra/cluster-checks/src/checks/check-tmpfs-scratch.ts",
      "ts-file:code:infra/cluster-checks/src/lib/tmpfs-scratch-coverage.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-tmpfs-scratch.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tmpfs-scratch.ts",
  },
  {
    name: "tsconfig",
    alwaysRun: true,
    dispatchNodeTypes: [...PACKAGE_POPULATION, "json-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-tsconfig.ts",
      "ts-file:code:infra/cluster-checks/src/lib/tsconfig-conventions.ts",
      "ts-file:code:infra/cluster-checks/src/lib/tsconfig-source-layout.ts",
      "ts-file:code:infra/cluster-checks/src/lib/tsconfig-import-graph.ts",
      "ts-file:code:infra/cluster-checks/src/lib/functional-type.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tsconfig.ts",
    args: treeShaArgs,
  },
  {
    name: "phantom-deps",
    alwaysRun: true,
    dispatchNodeTypes: [...TS_POPULATION, ...PACKAGE_POPULATION],
    script: "infra/cluster-checks/src/checks/check-phantom-deps.ts",
    args: treeShaArgs,
  },
  {
    name: "worker-shape",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: ["ts-file:code:infra/cluster-checks/src/checks/check-worker-shape.ts"],
    script: "infra/cluster-checks/src/checks/check-worker-shape.ts",
    args: treeShaArgs,
  },
  {
    name: "worker-tick-yield",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: ["ts-file:code:infra/cluster-checks/src/checks/check-worker-tick-yield.ts"],
    script: "infra/cluster-checks/src/checks/check-worker-tick-yield.ts",
    args: treeShaArgs,
  },
  {
    name: "verdict-emitter-chokepoint",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/infra/checks/src/checks" }],
    dispatchNodes: [
      "json-file:code:verdict-emitter-chokepoint.config.json",
      "ts-file:code:infra/cluster-checks/src/checks/check-verdict-emitter-chokepoint.ts",
      "ts-file:code:infra/cluster-checks/src/lib/verdict-emitter-chokepoint.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-verdict-emitter-chokepoint.ts",
  },
  {
    name: "client-page-access-boundary",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-client-page-access-boundary.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-client-page-access.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-client-page-access-boundary.ts",
  },
  {
    name: "properties-file-key-space",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-properties-file-key-space.ts",
      "ts-file:code:infra/cluster-checks/src/lib/properties-file-key-space.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-properties-file-key-space.ts",
  },
  ...VERIFICATION_SURFACE_CHECKS,
]
