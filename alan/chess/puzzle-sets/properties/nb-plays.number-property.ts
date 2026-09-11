import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const nbPlays = {
  id: "01a06582-bd62-7b65-b938-0e6e042909e7",
  type: "number-property",
  slug: "nb-plays",
  propertySlug: "nb-plays",
  definition: "how many times a puzzle was played",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
