import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const beatOrdinal = {
  id: "01a0c94a-5030-7a54-bf6d-7b97bb1fa18f",
  type: "page-type/number-property",
  slug: "beat-ordinal",
  propertySlug: "ordinal",
  definition: "where one beat falls among the beats a timeline holds",
  max: 1000,
  types: "ts",
} as const satisfies NumberProperty
