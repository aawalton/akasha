import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const fitness = {
  id: "01a06558-7000-7000-8000-000000000001",
  pageTypeSlug: "domain",
  slug: "fitness",
  definition: "how Alan trains his body and what the training did",
  partSlugs: ["page-type/mobility-reading"],
} as const satisfies Domain
