import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const app = {
  id: "01a06420-b258-77aa-a836-0e4b20b62584",
  type: "page-type/relation-property",
  slug: "app",
  propertySlug: "app",
  definition: "the app whose extension holds a widget",
  targetPageType: "page-type/ios-app",
  types: "ts",
} as const satisfies RelationProperty
