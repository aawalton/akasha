import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const ciContainers = {
  id: "01a06861-24c9-7016-a566-df6b94950828",
  pageTypeSlug: "workspace-package",
  slug: "ci-containers",
  definition: "the container a pipeline step runs in, placed on the cluster and cleared off it",
  manifest: "json",
  partSlugs: [
    "module/ci-container-cpu-rate",
    "module/ci-container-entrypoint",
    "module/ci-container-launch",
    "module/ci-container-manifest",
    "module/ci-container-name",
    "module/ci-dispatch-candidates",
    "module/ci-dispatch-cluster",
    "module/ci-dispatch-lines",
    "module/ci-dispatch-placement",
    "module/ci-dispatch-reservations",
    "module/ci-dispatch-shapes",
    "module/ci-dispatch-step-state",
    "module/ci-dispatcher-tick",
    "module/ci-infra-signature",
    "module/ci-launch-refusal",
    "module/ci-node-capacity",
    "module/ci-reap-decision",
    "module/ci-reaper-ceiling",
    "module/ci-reaper-cluster",
    "module/ci-reaper-step-pages",
    "module/ci-reaper-tick",
    "module/ci-step-taking",
    "module/ci-wedge",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A step's container is named from its pipeline, step and commit, and read back the same way.",
    },
    {
      invariantKind: "departure",
      statement:
        "The dispatcher writes a step to launching, and the reaper never writes a step's verdict.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step moved from one status to another is moved only from the status it was read at.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cluster is reached over its api server with a service-account token rather than through kubectl.",
    },
  ],
} as const satisfies WorkspacePackage
