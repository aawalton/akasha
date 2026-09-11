import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const layoffGraceDays = {
  id: "01a06865-7f45-7c7b-a9b1-bb749191fdbd",
  type: "number-property",
  slug: "layoff-grace-days",
  propertySlug: "layoff-grace-days",
  definition: "how many days off a movement takes before its load is cut at all",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
