import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type AppSlug = Slug

export const appSlug = {
  id: "01a06420-b258-77aa-a836-0e4b20b62584",
  pageTypeSlug: "relation-property",
  slug: "app-slug",
  propertySlug: "app-slug",
  definition: "the app whose extension a widget is built into",
  targetPageTypeSlug: "page-type/ios-app",
} as const satisfies RelationProperty
