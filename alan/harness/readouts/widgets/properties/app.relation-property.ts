import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const app = {
  id: "01a06420-b258-77aa-a836-0e4b20b62584",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "app",
  propertySlug: "app",
  definition: "the app whose extension a widget is built into",
  targetPageType: "page-type/ios-app",
  types: "ts",
} as const satisfies RelationProperty
