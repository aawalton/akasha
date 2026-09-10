import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const rated = {
  id: "01a06582-bd62-736a-8a46-0cfcfa56cab8",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "rated",
  propertySlug: "rated",
  definition: "whether a game counted toward a rating",
  types: "ts",
} as const satisfies BooleanProperty
