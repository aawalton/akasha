import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"

export type TravelCollection = Collection & {
  title: Title
}

export const travelCollection = {
  id: "01a06807-be66-700e-8f4d-f3b9e45380d1",
  pageTypeSlug: "page-type",
  slug: "travel-collection",
  definition: "a shelf of places Alan means to travel to",
  pluralSlug: "travel-collections",
  extendsSlug: ["page-type/collection"],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
