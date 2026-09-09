import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
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
  extends: ["page-type/page"],
  parts: ["file-property/location-collection-description"],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "file-property/location-collection-description",
      required: false,
      many: false,
    },
    { pagePropertySlug: "text-property/icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection lists no place of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A place names the collection that place is in.",
    },
  ],
} as const satisfies PageType
