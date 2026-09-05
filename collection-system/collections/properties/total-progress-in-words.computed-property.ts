import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type TotalProgressInWords = number

export const totalProgressInWords = {
  id: "01a07231-dd66-7e56-b4da-5e16976f160f",
  pageTypeSlug: "computed-property",
  slug: "total-progress-in-words",
  propertySlug: "total-progress-in-words",
  definition: "how much of the collection and everything it holds has been worked through",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
