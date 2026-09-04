import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ToDoSortOrder = number

export const toDoSortOrder = {
  id: "01a065a1-49b7-786c-882a-8a97ac2930ad",
  pageTypeSlug: "number-property",
  slug: "to-do-sort-order",
  propertySlug: "to-do-sort-order",
  definition: "where a to-do sits among the others Alan is shown",
  max: null,
} as const satisfies NumberProperty
