import type { Domain } from "../../../domains/domain.page-type.ts"

export const clusterWorkflows = {
  id: "01a08159-2c08-7405-9b92-be964673ac80",
  pageTypeSlug: "domain",
  slug: "cluster-workflows",
  definition: "a run of steps the cluster carries out",
  partSlugs: [
    "workspace-package/workflow-language",
    "module/preparation-provisioning",
    "module/preparation-installing",
    "module/preparation-repo-mending",
  ],
} as const satisfies Domain
