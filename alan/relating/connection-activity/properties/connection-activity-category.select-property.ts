import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const connectionActivityCategory = {
  id: "01a0658e-c30d-7292-9428-4162d0f20d29",
  type: "page-type/select-property",
  slug: "connection-activity-category",
  propertySlug: "connection-activity-category",
  definition: "an activity's kind of company",
  values: ["in-person", "group", "spouse", "online-real", "parasocial", "ai", "solo"],
  types: "ts",
} as const satisfies SelectProperty
