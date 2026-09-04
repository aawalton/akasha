import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type HeaderShowCover = boolean

export const headerShowCover = {
  id: "01a0683a-620a-7466-933d-d87085842034",
  pageTypeSlug: "boolean-property",
  slug: "header-show-cover",
  propertySlug: "show-cover",
  definition: "whether a page's cover stands above the pages that page gathers",
} as const satisfies BooleanProperty
