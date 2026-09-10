import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.types.ts"

export type FullBleed = boolean

export const fullBleed = {
  id: "01a0683a-620a-7435-8338-a09996d02130",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "full-bleed",
  propertySlug: "full-bleed",
  definition: "whether a page is drawn with no margin held around it",
} as const satisfies BooleanProperty
