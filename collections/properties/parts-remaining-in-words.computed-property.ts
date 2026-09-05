import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type PartsRemainingInWords = number

export const partsRemainingInWords = {
  id: "01a07231-dd65-75ec-9c0e-78571de7719b",
  pageTypeSlug: "computed-property",
  slug: "parts-remaining-in-words",
  propertySlug: "parts-remaining-in-words",
  definition: "how much of everything the collection holds is left to work through",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
