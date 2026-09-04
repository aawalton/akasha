import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/temper-things/properties/icon.text-property.ts"
import type { LocationCollectionDescription } from "./properties/location-collection-description.file-property.ts"

export type LocationCollection = Page & {
  title: Title
  locationCollectionDescription?: LocationCollectionDescription
  icon?: Icon
}

export const locationCollection = {
  id: "01a06589-d12e-7daf-abd1-8fb5c89e9127",
  pageTypeSlug: "page-type",
  slug: "location-collection",
  definition: "places gathered under one name",
  pluralSlug: "location-collections",
  extendsSlug: ["page-type/page"],
  partSlugs: ["file-property/location-collection-description"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "location-collection-description", required: false, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection lists no place of its own; a place names the collection it is in.",
    },
  ],
} as const satisfies PageType
