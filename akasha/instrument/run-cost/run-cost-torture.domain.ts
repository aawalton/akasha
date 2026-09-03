import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const runCostTorture = {
  id: "01a06860-a0ef-76bb-bd1a-8f8853023f44",
  pageTypeSlug: "domain",
  slug: "run-cost-torture",
  definition: "the cost of a run finishing within fifteen minutes",
} as const satisfies Domain
