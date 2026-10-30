import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const app = {
  id: "01a06420-b258-77aa-a836-0e4b20b62584",
  type: "page-type/relation-property",
  slug: "app",
  propertySlug: "app",
  definition: "the iOS app whose extension holds a readout widget",
  targetPageType: "page-type/ios-app",
  types: "ts",
  createdAt: "2026-09-02T21:57:39.544Z",
  updatedAt: "2026-10-30T16:01:23.363Z",
} as const satisfies RelationProperty
