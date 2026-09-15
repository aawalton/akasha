import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const showCountBadge = {
  id: "01a0680e-5e00-7006-9d84-6f2b7a5e5107",
  type: "page-type/boolean-property",
  slug: "show-count-badge",
  propertySlug: "show-count-badge",
  definition: "whether a nav item carries how many pages are under it",
  types: "ts",
} as const satisfies BooleanProperty
