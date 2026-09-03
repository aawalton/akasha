import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const runCostEternal = {
  id: "01a06860-a0ef-7629-b053-71a22f8acc1a",
  pageTypeSlug: "domain",
  slug: "run-cost-eternal",
  definition: "the cost of a run taking longer than fifteen minutes",
} as const satisfies Domain
