import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const towerSkillDemonstrations = {
  id: "01a0de18-0b6f-7626-93e3-077a909a9324",
  type: "page-type/number-property",
  slug: "tower-skill-demonstrations",
  propertySlug: "demonstrations",
  definition: "how many times a skill was shown at the rank above its own",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
