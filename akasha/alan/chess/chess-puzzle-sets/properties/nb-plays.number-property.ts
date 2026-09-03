import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NbPlays = number

export const nbPlays = {
  id: "01a06582-bd62-7b65-b938-0e6e042909e7",
  pageTypeSlug: "number-property",
  slug: "nb-plays",
  propertySlug: "nb-plays",
  definition: "how many times a puzzle was played",
  max: null,
} as const satisfies NumberProperty
