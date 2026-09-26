import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const haremHotelSkillLevel = {
  id: "01a0de53-340a-7a06-b650-4f370315e5ea",
  type: "page-type/number-property",
  slug: "harem-hotel-skill-level",
  propertySlug: "level",
  definition: "how far a skill in the Harem Hotel has come within its rank",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
