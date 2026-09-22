import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoCollectibleId = {
  id: "01a06153-0ea9-7001-b53f-073db3a36aa1",
  type: "page-type/number-property",
  slug: "eso-collectible-id",
  propertySlug: "eso-collectible-id",
  definition: "the number The Elder Scrolls Online gives a collectible",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
