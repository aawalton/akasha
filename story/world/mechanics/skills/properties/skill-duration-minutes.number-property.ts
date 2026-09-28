import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const skillDurationMinutes = {
  id: "01a0e95e-8461-7bce-88e7-d1e29ab23df1",
  type: "page-type/number-property",
  slug: "skill-duration-minutes",
  propertySlug: "duration-minutes",
  definition: "how many minutes of story time a skill holds once it is worked",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
