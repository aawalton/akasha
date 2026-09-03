import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { LocationCollectionDescription } from "./properties/location-collection-description.file-property.ts"

export type LocationCollection = Page & {
  title: Title
  locationCollectionDescription?: LocationCollectionDescription
}

export const locationCollection = {
  id: "01a06583-a7d5-7a07-9f29-61c53d736a5a",
  pageTypeSlug: "page-type",
  slug: "location-collection",
  definition: "places gathered under one name",
  pluralSlug: "location-collections",
  extendsSlug: "page-type/page",
  partSlugs: ["file-property/location-collection-description"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "location-collection-description", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection lists no place of its own; a place names the collection it is in.",
    },
  ],
} as const satisfies PageType
