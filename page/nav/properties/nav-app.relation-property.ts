import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const navApp = {
  id: "01a0cb3f-4536-7c82-aea7-fab1df6b6026",
  type: "page-type/relation-property",
  slug: "nav-app",
  propertySlug: "app",
  definition: "the app a nav item belongs to",
  targetPageType: "page-type/web-app",
  types: "ts",
} as const satisfies RelationProperty
