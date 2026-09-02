import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Position = number

export const position = {
  id: "01a063de-2c60-700c-a15e-6fcb567118c1",
  pageTypeSlug: "number-property",
  slug: "position",
  propertySlug: "position",
  definition: "where a collection sits among the collections it is part of",
  max: null,
} as const satisfies NumberProperty
