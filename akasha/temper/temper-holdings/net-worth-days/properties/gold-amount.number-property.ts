import type { NumberProperty } from "@akasha/pages-system/number-property"

export type GoldAmount = number

export const goldAmount = {
  id: "01a05fcb-fd34-7737-9c6d-6dd9effa4c8e",
  pageTypeSlug: "number-property",
  slug: "gold-amount",
  propertySlug: "gold-amount",
  definition: "how much gold an account holds",
  max: null,
} as const satisfies NumberProperty
