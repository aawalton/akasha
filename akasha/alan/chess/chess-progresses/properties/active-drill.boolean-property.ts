import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type ActiveDrill = boolean

export const activeDrill = {
  id: "01a06582-bd62-7ff9-a9fc-fd5762be3ca1",
  pageTypeSlug: "boolean-property",
  slug: "active-drill",
  propertySlug: "active-drill",
  definition: "whether a part of Alan's chess is drilled now",
} as const satisfies BooleanProperty
