import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const headerShowCover = {
  id: "01a0683a-620a-7466-933d-d87085842034",
  type: "boolean-property",
  slug: "header-show-cover",
  propertySlug: "show-cover",
  definition: "whether a page's cover stands above the pages that page gathers",
  types: "ts",
} as const satisfies BooleanProperty
