import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoNum = {
  id: "01a05fd1-d43a-7c6d-944f-47ddf5e57228",
  type: "page-type/number-property",
  slug: "eso-num",
  propertySlug: "eso-num",
  definition: "a gear value's number in The Elder Scrolls Online",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
