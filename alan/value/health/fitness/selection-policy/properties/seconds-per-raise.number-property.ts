import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const secondsPerRaise = {
  id: "01a0ba57-fb54-70a9-a68a-e712c4a0541d",
  type: "page-type/number-property",
  slug: "seconds-per-raise",
  propertySlug: "seconds-per-raise",
  definition: "how many seconds Alan spends on any one movement that raises his temperature",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
