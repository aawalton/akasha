import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"

export type Restaurant = Collection & {
  title: Title
}

export const restaurant = {
  id: "01a06807-be66-700b-be52-bd042c86fc17",
  pageTypeSlug: "page-type",
  slug: "restaurant",
  definition: "a place Alan eats at",
  pluralSlug: "restaurants",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
