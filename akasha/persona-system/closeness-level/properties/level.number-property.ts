import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type Level = number

export const level = {
  id: "01a0540e-5113-72f9-856c-77346199f587",
  pageTypeSlug: "number-property",
  slug: "level",
  propertySlug: "level",
  definition: "how far along the closeness ladder this rung stands",
  max: null,
} as const satisfies NumberProperty
