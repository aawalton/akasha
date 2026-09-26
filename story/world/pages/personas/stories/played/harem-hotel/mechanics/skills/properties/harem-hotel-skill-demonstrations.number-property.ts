import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const haremHotelSkillDemonstrations = {
  id: "01a0de53-340a-7786-973f-51cb9c7923ca",
  type: "page-type/number-property",
  slug: "harem-hotel-skill-demonstrations",
  propertySlug: "demonstrations",
  definition: "how many times a skill in the Harem Hotel was shown at the rank above its own",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
