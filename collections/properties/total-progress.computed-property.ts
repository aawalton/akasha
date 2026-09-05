import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type TotalProgress = number

export const totalProgress = {
  id: "01a07231-dd66-7801-846b-93af55027f86",
  pageTypeSlug: "computed-property",
  slug: "total-progress",
  propertySlug: "total-progress",
  definition: "how much of the collection and everything it holds has been worked through",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
