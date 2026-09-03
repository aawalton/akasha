import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type LockedPageType = boolean

export const lockedPageType = {
  id: "01a0680d-4d00-7014-8e35-4a7d1f5c4115",
  pageTypeSlug: "boolean-property",
  slug: "locked-page-type",
  propertySlug: "locked-page-type",
  definition: "whether a person may point a view at another page type",
} as const satisfies BooleanProperty
