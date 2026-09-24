import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const lorePinZoneY = {
  id: "01a0d5da-b5a1-705e-b9e6-6d852a8b21fd",
  type: "page-type/number-property",
  slug: "lore-pin-zone-y",
  propertySlug: "zone-y",
  definition: "how far down its zone map a lore book's place lies, as a share of that map's height",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
