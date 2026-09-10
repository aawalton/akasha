import type { NumberProperty } from "../../../number-properties/number-property.page-type.types.ts"

export type Max = number | null

export const max = {
  id: "01a049b9-856c-7599-ab4a-e644848ad626",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "max",
  propertySlug: "max",
  definition: "the largest a number may be",
  max: null,
} as const satisfies NumberProperty
