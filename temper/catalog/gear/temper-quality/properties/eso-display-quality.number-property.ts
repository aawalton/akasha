import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoDisplayQuality = {
  id: "01a0e0b2-f5f9-707c-b4d8-47b91047f981",
  type: "page-type/number-property",
  slug: "eso-display-quality",
  propertySlug: "eso-display-quality",
  definition: "the number The Elder Scrolls Online gives a quality it shows",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
