import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type App = Slug

export const app = {
  id: "01a06420-b258-77aa-a836-0e4b20b62584",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "app",
  propertySlug: "app",
  definition: "the app whose extension a widget is built into",
  targetPageType: "page-type/ios-app",
} as const satisfies RelationProperty
