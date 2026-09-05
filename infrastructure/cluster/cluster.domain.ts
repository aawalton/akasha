import type { Domain } from "../../domains/domain.page-type.ts"

export const cluster = {
  id: "01a073f1-e67a-717a-9d6a-324244b75878",
  pageTypeSlug: "domain",
  slug: "cluster",
  definition: "the Kubernetes cluster the system's services run on",
  partSlugs: [],
} as const satisfies Domain
