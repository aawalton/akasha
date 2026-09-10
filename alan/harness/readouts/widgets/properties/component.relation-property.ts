import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const component = {
  id: "01a05480-1c87-7234-89bb-4e8776905c5c",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "component",
  propertySlug: "component",
  definition: "the component a tile is drawn in",
  targetPageType: "page-type/ios-component",
  types: "ts",
} as const satisfies RelationProperty
