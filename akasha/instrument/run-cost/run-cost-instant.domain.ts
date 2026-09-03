import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const runCostInstant = {
  id: "01a06860-a0ef-71bb-8c4f-ca7c638ef79e",
  pageTypeSlug: "domain",
  slug: "run-cost-instant",
  definition: "the cost of a run finishing within a second",
} as const satisfies Domain
