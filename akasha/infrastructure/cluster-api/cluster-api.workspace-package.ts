import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const clusterApi = {
  id: "01a068d4-d2aa-79d4-b241-bf8c8672b7fd",
  pageTypeSlug: "workspace-package",
  slug: "cluster-api",
  definition: "how a program reaches the cluster's API server and what it asks of it",
  manifest: "json",
  partSlugs: ["module/cluster-api-fetch", "module/cluster-jobs", "module/cluster-workloads"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every call here goes to the API server directly rather than through a proxy.",
    },
    {
      invariantKind: "departure",
      statement: "The credential is a service account token the environment carries.",
    },
  ],
} as const satisfies WorkspacePackage
