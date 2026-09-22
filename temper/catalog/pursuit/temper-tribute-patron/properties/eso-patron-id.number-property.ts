import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoPatronId = {
  id: "01a06153-0ea9-7003-a29d-d0ea7e0c70aa",
  type: "page-type/number-property",
  slug: "eso-patron-id",
  propertySlug: "eso-patron-id",
  definition: "the number The Elder Scrolls Online gives a tribute patron",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
