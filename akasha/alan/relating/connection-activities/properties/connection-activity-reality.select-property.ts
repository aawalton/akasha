import type { SelectProperty } from "@akasha/pages-system/select-property"

export const connectionActivityReality = {
  id: "01a0658e-c30e-7c88-8f0c-57a734da914d",
  pageTypeSlug: "select-property",
  slug: "connection-activity-reality",
  propertySlug: "connection-activity-reality",
  definition: "how much of the other person he is actually meeting",
  values: ["authentic", "professional", "celebrity"],
} as const satisfies SelectProperty

export type ConnectionActivityReality = (typeof connectionActivityReality.values)[number]
