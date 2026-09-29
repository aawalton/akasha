import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereIiiReputationRenown = {
  id: "01a0ed2d-fea0-73dd-9985-b4b237d6019a",
  type: "page-type/number-property",
  slug: "overwhere-iii-reputation-renown",
  propertySlug: "renown",
  definition:
    "how well a place's people in Overwhere III think of a character, from minus 100 to 100",
  nullable: false,
  max: 100,
  types: "ts",
} as const satisfies NumberProperty
