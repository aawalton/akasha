import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PriorityOrder = number

export const priorityOrder = {
  id: "01a05fcb-fd32-7c0a-a49a-caef7ddc3592",
  pageTypeSlug: "number-property",
  slug: "priority-order",
  propertySlug: "priority-order",
  definition: "which branch takes an item where more than one branch admits it",
  max: null,
} as const satisfies NumberProperty
