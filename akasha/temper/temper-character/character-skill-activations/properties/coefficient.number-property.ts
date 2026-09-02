import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Coefficient = number

export const coefficient = {
  id: "01a05fcd-f548-778c-a2fa-4da3aa0c7663",
  pageTypeSlug: "number-property",
  slug: "coefficient",
  propertySlug: "coefficient",
  definition: "what the number an effect reads is multiplied by",
  max: null,
} as const satisfies NumberProperty
