import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Solved = boolean

export const solved = {
  id: "01a06582-bd62-7a28-b768-6bf2c654a592",
  pageTypeSlug: "boolean-property",
  slug: "solved",
  propertySlug: "solved",
  definition: "whether Alan has answered a puzzle",
} as const satisfies BooleanProperty
