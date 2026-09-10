import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const equipmentSortOrder = {
  id: "01a06865-7f45-748c-9408-f37812f3dc8d",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "equipment-sort-order",
  propertySlug: "sort-order",
  definition: "where a piece of kit sits when the kit is read as a list",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
