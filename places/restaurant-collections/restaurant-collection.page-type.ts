import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"

export type RestaurantCollection = Collection & {
  title: Title
}

export const restaurantCollection = {
  id: "01a06807-be66-700c-bf31-55485b34bab0",
  pageTypeSlug: "page-type",
  slug: "restaurant-collection",
  definition: "a shelf of restaurants Alan keeps together",
  pluralSlug: "restaurant-collections",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
