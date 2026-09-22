import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const component = {
  id: "01a05480-1c87-7234-89bb-4e8776905c5c",
  type: "page-type/relation-property",
  slug: "component",
  propertySlug: "component",
  definition: "a tile's component",
  targetPageType: "page-type/ios-component",
  types: "ts",
} as const satisfies RelationProperty
