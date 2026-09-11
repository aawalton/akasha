import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export const totalProgress = {
  id: "01a07231-dd66-7801-846b-93af55027f86",
  type: "computed-property",
  slug: "total-progress",
  propertySlug: "total-progress",
  definition: "how much of the collection and everything it holds has been worked through",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
