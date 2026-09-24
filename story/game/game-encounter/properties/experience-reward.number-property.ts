import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const experienceReward = {
  id: "01a0c647-dd96-740e-bbb3-973d342ad2bd",
  type: "page-type/number-property",
  slug: "experience-reward",
  propertySlug: "experience",
  definition: "what beating an encounter is worth towards the next level",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
