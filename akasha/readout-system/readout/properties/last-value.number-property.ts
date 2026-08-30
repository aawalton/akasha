import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type LastValue = number

export const lastValue = {
  id: "01a05446-e769-7c83-8027-557c28f004a7",
  pageTypeSlug: "number-property",
  slug: "last-value",
  propertySlug: "last-value",
  definition: "the reading last taken",
  max: null,
} as const satisfies NumberProperty
