import type { NumberProperty } from "@akasha/pages/number-property"

export type LayoffGraceDays = number

export const layoffGraceDays = {
  id: "01a06865-7f45-7c7b-a9b1-bb749191fdbd",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "layoff-grace-days",
  propertySlug: "layoff-grace-days",
  definition: "how many days off a movement takes before its load is cut at all",
  max: null,
} as const satisfies NumberProperty
