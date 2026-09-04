import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type ShowCountBadge = boolean

export const showCountBadge = {
  id: "01a0680e-5e00-7006-9d84-6f2b7a5e5107",
  pageTypeSlug: "boolean-property",
  slug: "show-count-badge",
  propertySlug: "show-count-badge",
  definition: "whether a nav item carries how many pages stand under it",
} as const satisfies BooleanProperty
