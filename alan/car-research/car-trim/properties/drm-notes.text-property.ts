import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const drmNotes = {
  id: "01a0c543-abe8-77e1-aa86-f3c0ae2a1596",
  type: "page-type/text-property",
  slug: "drm-notes",
  propertySlug: "drm-notes",
  definition: "what the maker keeps locked in its own software on a trim",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
