import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type MaintainsDesign = boolean

export const maintainsDesign = {
  id: "01a0673c-8e0e-700c-be50-206d37ef2bd7",
  pageTypeSlug: "boolean-property",
  slug: "maintains-design",
  propertySlug: "maintains-design",
  definition: "whether a game keeps a record of the decisions its design rests on",
} as const satisfies BooleanProperty
