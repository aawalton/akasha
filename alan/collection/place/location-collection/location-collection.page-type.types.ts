import type { LocationCollectionDescription } from "akasha/alan/collection/place/location-collection/properties/location-collection-description.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type LocationCollection = Page & {
  title: Title
  locationCollectionDescription?: LocationCollectionDescription
}
