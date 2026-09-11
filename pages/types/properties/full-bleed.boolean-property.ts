import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const fullBleed = {
  id: "01a0683a-620a-7435-8338-a09996d02130",
  type: "boolean-property",
  slug: "full-bleed",
  propertySlug: "full-bleed",
  definition: "whether a page is drawn with no margin held around it",
  types: "ts",
} as const satisfies BooleanProperty
