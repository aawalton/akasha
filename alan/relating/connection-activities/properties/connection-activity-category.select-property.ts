import type { SelectProperty } from "@akasha/pages-system/select-property"

export const connectionActivityCategory = {
  id: "01a0658e-c30d-7292-9428-4162d0f20d29",
  pageTypeSlug: "select-property",
  slug: "connection-activity-category",
  propertySlug: "connection-activity-category",
  definition: "the company it puts him in",
  values: ["in-person", "group", "spouse", "online-real", "parasocial", "ai", "solo"],
} as const satisfies SelectProperty

export type ConnectionActivityCategory = (typeof connectionActivityCategory.values)[number]
