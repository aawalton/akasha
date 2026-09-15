import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const rated = {
  id: "01a06582-bd62-736a-8a46-0cfcfa56cab8",
  type: "page-type/boolean-property",
  slug: "rated",
  propertySlug: "rated",
  definition: "whether a game counted toward a rating",
  types: "ts",
} as const satisfies BooleanProperty
