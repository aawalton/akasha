import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const lorePinZoneX = {
  id: "01a0d5da-b5a1-7874-9dae-220d469b4dd0",
  type: "page-type/number-property",
  slug: "lore-pin-zone-x",
  propertySlug: "zone-x",
  definition:
    "how far across its zone map a lore book's place lies, as a share of that map's width",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
