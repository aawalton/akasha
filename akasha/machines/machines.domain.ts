import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const machines = {
  id: "01a06596-0000-7000-8000-000000000301",
  pageTypeSlug: "domain",
  slug: "machines",
  definition: "the machines Alan owns and what they are worth running",
  partSlugs: ["page-type/computer", "page-type/host", "page-type/cluster", "domain/provisioning"],
} as const satisfies Domain
