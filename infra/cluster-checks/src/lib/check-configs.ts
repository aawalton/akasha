import { IMAGES } from "../../../../tools/lib/workflow-dsl/images.ts"
import { SECRETS, secret } from "../../../../tools/lib/workflow-dsl/secrets.ts"
import type { NodeType } from "../../../../tools/lib/workflow-dsl/types.ts"
import { GRAPH_ARTIFACT_CHECKS } from "./check-configs-graph"
import { REPO_PATH_CHECKS } from "./check-configs-repo-paths"
import { SHELL_CHECKS } from "./check-configs-shell"
import { TYPECHECK_CHECKS } from "./check-configs-typecheck"
import { type CheckConfig, treeShaArgs, WORKFLOW_SURFACE_POPULATION } from "./check-configs-types"
import { WIDGET_MIRROR_CHECKS } from "./check-configs-widget"


const TS_POPULATION: readonly NodeType[] = ["ts-file", "tsx-file"]
const YAML_POPULATION: readonly NodeType[] = ["yaml-file", "yml-file"]
const PACKAGE_POPULATION: readonly NodeType[] = ["package"]

export const STATIC_CHECKS: CheckConfig[] = [
  ...SHELL_CHECKS,
  {
    name: "bin-mode",
    dispatchNodeTypes: PACKAGE_POPULATION,
    script: "infra/cluster-checks/src/checks/check-bin-mode.ts",
  },
  {
    name: "healthkit-read-only",
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-healthkit-read-only.ts",
      "ts-file:code:infra/cluster-checks/src/lib/healthkit-read-only-violations.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-healthkit-read-only.ts",
  },
  {
    name: "app-intent-brand-words",
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-app-intent-brand-words.ts",
      "ts-file:code:infra/cluster-checks/src/lib/app-intent-brand-word-violations.ts",
      "ts-file:code:infra/cluster-checks/src/lib/alanwalton-ios-seam.ts",
      "ts-file:code:infra/cluster-checks/src/lib/swift-masked-source.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-app-intent-brand-words.ts",
  },
  {
    name: "health-samples-stream",
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-health-samples-stream.ts",
      "ts-file:code:infra/cluster-checks/src/lib/health-samples-stream-violations.ts",
      "ts-file:code:infra/cluster-checks/src/lib/alanwalton-ios-seam.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-health-samples-stream.ts",
  },
  ...WIDGET_MIRROR_CHECKS,
  {
    name: "eso-live-dir-candidate-order",
    dispatchNodeTypes: ["rust-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts",
      "ts-file:code:infra/cluster-checks/src/lib/eso-live-dir-candidate-order.ts",
      "json-file:code:temper/shared-foundation-misc-eso-paths--from-instructions/package.json",
      "ts-file:code:temper/shared-foundation-misc-eso-paths--from-instructions/src/index.ts",
      "ts-file:code:temper/shared-foundation-misc-eso-paths--from-instructions/src/eso-paths.ts",
      "rust-file:code:packages/temper/watcher-tray/src/tray.rs",
    ],
    script: "infra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts",
  },
  ...TYPECHECK_CHECKS,
  {
    name: "lint",
    image: IMAGES.UNIVERSAL,
    dispatchNodeTypes: [...TS_POPULATION, "js-file", "jsx-file", "json-file"],
    alwaysRun: true,
    backendOptions: {
      kubernetes: { resources: { requests: { cpu: "1500m" } } },
    },
    script: "infra/cluster-checks/src/checks/lint-verdict.ts",
    args: () => ["."],
  },
  {
    name: "image-tags",
    dispatchNodeTypes: [...YAML_POPULATION, "dockerfile-file", "workflow"],
    dispatchNodes: ["ts-file:code:packages/infra/workflow-dsl/src/dsl/images.ts"],
    script: "infra/cluster-checks/src/checks/check-image-tags.ts",
    args: treeShaArgs,
  },
  {
    name: "service-dockerfiles-gitignored",
    alwaysRun: true,
    dispatchNodeTypes: [...PACKAGE_POPULATION, "json-file", "dockerfile-file"],
    dispatchNodes: [
      "ts-file:code:packages/infra/scripts/src/generate-dockerfiles-registry.ts",
      "ts-file:code:packages/infra/scripts/src/generate-dockerfiles-tool.ts",
      "ts-file:code:packages/infra/scripts/src/generate-dockerfiles-types.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-service-dockerfiles-gitignored.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-service-dockerfiles-gitignored.ts",
  },
  {
    name: "memory-qos",
    dispatchNodeTypes: [...YAML_POPULATION, "workflow"],
    script: "infra/cluster-checks/src/checks/check-memory-qos.ts",
    args: treeShaArgs,
  },
  {
    name: "image-tools",
    closurePolicy: "import-graph",
    dispatchNodeTypes: ["workflow", WORKFLOW_SURFACE_POPULATION],
    script: "packages/infra/checks/src/checks/check-image-tools.ts",
    args: treeShaArgs,
  },
  {
    name: "sops-manifests",
    dispatchNodeTypes: YAML_POPULATION,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-sops-manifests.ts",
      "ts-file:code:infra/cluster-checks/src/lib/sops-manifest.ts",
    ],
    environment: {
      SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
    },
    script: "infra/cluster-checks/src/checks/check-sops-manifests.ts",
    args: treeShaArgs,
  },
  {
    name: "tailwind-sources",
    dispatchNodeTypes: ["css-file", ...PACKAGE_POPULATION],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-tailwind-sources.ts",
      "ts-file:code:infra/cluster-checks/src/lib/tailwind-sources-violations.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tailwind-sources.ts",
    args: treeShaArgs,
  },
  {
    name: "vite-supabase-rr-define",
    dispatchNodeTypes: [...PACKAGE_POPULATION],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-vite-supabase-rr-define.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-vite-supabase-rr-define.ts",
  },
  ...REPO_PATH_CHECKS,
  {
    name: "yaml-usage",
    alwaysRun: true,
    dispatchNodeTypes: [...YAML_POPULATION],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-yaml-usage.ts",
      "ts-file:code:infra/cluster-checks/src/lib/yaml-usage.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-yaml-usage.ts",
    args: treeShaArgs,
    backendOptions: {
      kubernetes: {
        resources: { requests: { memory: "1Gi" }, limits: { memory: "2Gi" } },
      },
    },
  },
  {
    name: "test-step-paths",
    dispatchNodeTypes: [...TS_POPULATION, ...PACKAGE_POPULATION],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks.workflow.ts",
      "ts-file:code:infra/cluster-checks/src/checks/check-test-step-paths.ts",
      "ts-file:code:infra/cluster-checks/src/lib/test-step-paths.ts",
      "ts-file:code:infra/cluster-checks/src/lib/test-step-loader.ts",
      "ts-file:code:packages/infra/tests/src/list-typed-workspaces.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-test-step-paths.ts",
  },
  ...GRAPH_ARTIFACT_CHECKS,
]
