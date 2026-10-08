import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const app = {
  id: "01a06420-b258-77aa-a836-0e4b20b62584",
  type: "page-type/relation-property",
  slug: "app",
  propertySlug: "app",
  definition: "the app whose extension holds a widget",
  targetPageType: "page-type/ios-app",
  types: "ts",
  createdAt: "2026-09-02T21:57:39.544Z",
  updatedAt: "2026-09-22T13:57:00.000Z",
} as const satisfies RelationProperty
