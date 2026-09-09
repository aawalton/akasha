import type { NumberProperty } from "../../number-properties/number-property.page-type.ts"

export type MaxWallSeconds = number

export const maxWallSeconds = {
  id: "01a08790-c7ec-7749-b14a-e818de74aed8",
  pageTypeSlug: "number-property",
  slug: "max-wall-seconds",
  propertySlug: "max-wall-seconds",
  definition: "the most time one run of the file may take, in seconds",
  max: null,
} as const satisfies NumberProperty
