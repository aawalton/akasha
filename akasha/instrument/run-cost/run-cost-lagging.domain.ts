import type { Domain } from "@akasha/domain-system/domain"

export const runCostLagging = {
  id: "01a06860-a0ef-71f3-b599-95f96a7e268d",
  pageTypeSlug: "domain",
  slug: "run-cost-lagging",
  definition: "the cost of a run finishing within fifteen seconds",
} as const satisfies Domain
