import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Visited = boolean

export const visited = {
  id: "01a06583-acfb-7283-afd9-4e61dda0b062",
  pageTypeSlug: "boolean-property",
  slug: "visited",
  propertySlug: "visited",
  definition: "whether the person has been",
} as const satisfies BooleanProperty
