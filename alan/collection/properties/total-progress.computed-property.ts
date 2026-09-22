import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const totalProgress = {
  id: "01a07231-dd66-7801-846b-93af55027f86",
  type: "page-type/computed-property",
  slug: "total-progress",
  propertySlug: "total-progress",
  definition: "how much of the collection and everything it holds is done",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
