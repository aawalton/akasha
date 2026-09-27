import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const setPieceMost = {
  id: "01a0e1a3-2f07-7477-99e2-215f3131826b",
  type: "page-type/number-property",
  slug: "set-piece-most",
  propertySlug: "set-piece-most",
  definition: "the most pieces of one set a character can wear at once",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
