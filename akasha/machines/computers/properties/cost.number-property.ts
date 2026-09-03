import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Cost = number

export const cost = {
  id: "01a0658c-329a-78a2-ad0d-f2f3925debcd",
  pageTypeSlug: "number-property",
  slug: "cost",
  propertySlug: "cost",
  definition: "what Alan paid for it",
  max: null,
} as const satisfies NumberProperty
