import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"

export type RestaurantMenuItem = Collection & {
  title: Title
}

export const restaurantMenuItem = {
  id: "01a06807-be66-700d-8bc5-ae2909f1d723",
  pageTypeSlug: "page-type",
  slug: "restaurant-menu-item",
  definition: "a dish a restaurant serves",
  pluralSlug: "restaurant-menu-items",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
