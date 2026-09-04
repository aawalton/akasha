import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const ciBenchmark = {
  id: "01a0675b-16d8-704b-a679-f300bf41cd88",
  pageTypeSlug: "workspace-package",
  slug: "ci-benchmark",
  definition: "one CI node's substrate measured against the whole check registry on a cold store",
  manifest: "json",
  partSlugs: [
    "module/benchmark-aggregate",
    "module/benchmark-job",
    "module/instructions-tree-dependencies",
    "module/benchmark-margin-sweep",
    "module/benchmark-outer-core",
    "module/benchmark-outer-render",
    "module/benchmark-provision",
    "module/benchmark-phases",
    "module/benchmark-report-assembly",
    "module/benchmark-report-types",
    "module/benchmark-running",
    "module/bootstrap-dsl",
    "module/bootstrap-running",
    "module/bootstrap-scheduler",
    "module/buildkit-port",
    "module/cluster-access",
    "module/container-runtime",
    "module/docker-run",
    "module/local-cache",
    "module/local-executor",
    "module/local-step-execution",
    "module/local-step-types",
    "module/output-block",
    "module/output-tee",
    "module/step-secrets",
    "module/toolchain-manifest",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod is placed by a hostname nodeSelector rather than by a node name.",
    },
    {
      invariantKind: "departure",
      statement: "A pod the kubelet rejects is a destroyed run rather than a retried one.",
    },
    {
      invariantKind: "departure",
      statement: "The store is empty at the start of every run, and independent of the node.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs are comparable only where their failures match on name and exit code.",
    },
    {
      invariantKind: "departure",
      statement: "A failure outside the declared set invalidates the run rather than failing it.",
    },
    {
      invariantKind: "departure",
      statement: "The memory request covers the tmpfs size limit as well as the working set.",
    },
  ],
} as const satisfies WorkspacePackage
