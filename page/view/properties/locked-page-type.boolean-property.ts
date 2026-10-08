import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const lockedPageType = {
  id: "01a0680d-4d00-7014-8e35-4a7d1f5c4115",
  type: "page-type/boolean-property",
  slug: "locked-page-type",
  propertySlug: "locked-page-type",
  definition: "whether a person may point a view at another page type",
  types: "ts",
  createdAt: "2026-09-03T16:14:57.280Z",
  updatedAt: "2026-09-15T15:59:02.000Z",
} as const satisfies BooleanProperty
