import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { LocationCollectionDescription } from "akasha/places/location-collections/properties/location-collection-description.file-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type LocationCollection = Page & {
  title: Title
  locationCollectionDescription?: LocationCollectionDescription
  icon?: Icon
}
