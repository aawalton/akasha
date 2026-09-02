import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StackCount = number

export const stackCount = {
  id: "01a06053-b382-7fd6-a97a-e9ff94c0ca37",
  pageTypeSlug: "number-property",
  slug: "stack-count",
  propertySlug: "stack-count",
  definition: "how many of an item a stack holds",
  max: null,
} as const satisfies NumberProperty
