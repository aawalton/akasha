import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Rated = boolean

export const rated = {
  id: "01a06582-bd62-736a-8a46-0cfcfa56cab8",
  pageTypeSlug: "boolean-property",
  slug: "rated",
  propertySlug: "rated",
  definition: "whether a game counted toward a rating",
} as const satisfies BooleanProperty
