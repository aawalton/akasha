import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type LiveChild = boolean

export const liveChild = {
  id: "01a0541c-db61-7ca1-9498-341a4a8f7126",
  pageTypeSlug: "boolean-property",
  slug: "live-child",
  propertySlug: "live-child",
  definition: "whether a seat this one started has a turn still to come",
} as const satisfies BooleanProperty
