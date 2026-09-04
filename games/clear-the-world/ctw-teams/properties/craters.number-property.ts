import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Craters = number

export const craters = {
  id: "01a06579-e4f7-7792-a8c5-47fa15198d5f",
  pageTypeSlug: "number-property",
  slug: "craters",
  propertySlug: "craters",
  definition: "how many craters the team has set off",
  max: null,
} as const satisfies NumberProperty
