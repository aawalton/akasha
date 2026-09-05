import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type TotalLength = number

export const totalLength = {
  id: "01a07231-dd66-73da-b891-d75af575ac15",
  pageTypeSlug: "computed-property",
  slug: "total-length",
  propertySlug: "total-length",
  definition: "how much there is to work through in the collection and everything it holds",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
