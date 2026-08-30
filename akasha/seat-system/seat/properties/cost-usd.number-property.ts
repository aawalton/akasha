import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type CostUsd = number

export const costUsd = {
  id: "01a05035-2609-73cf-b840-a31927bcf3f1",
  pageTypeSlug: "number-property",
  slug: "cost-usd",
  definition: "what a seat has spent, in US dollars",
  max: null,
} as const satisfies NumberProperty
