import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const continuity = {
  id: "01a06577-f385-7f47-8c46-429d378841ca",
  type: "page-type/text-property",
  slug: "continuity",
  propertySlug: "continuity",
  definition: "what a story has constant between its chapters",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
