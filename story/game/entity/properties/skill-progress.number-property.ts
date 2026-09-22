import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const skillProgress = {
  id: "01a0c638-1e4d-7a99-af86-92422da9d97d",
  type: "page-type/number-property",
  slug: "skill-progress",
  propertySlug: "progress",
  definition: "how far an entity has got with a skill, giving that skill's rung",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
