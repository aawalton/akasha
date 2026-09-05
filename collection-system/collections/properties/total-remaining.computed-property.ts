import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type TotalRemaining = number

export const totalRemaining = {
  id: "01a07231-dd66-7218-ace3-d6ea466f60de",
  pageTypeSlug: "computed-property",
  slug: "total-remaining",
  propertySlug: "total-remaining",
  definition: "how much of the collection and everything it holds is left to work through",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
