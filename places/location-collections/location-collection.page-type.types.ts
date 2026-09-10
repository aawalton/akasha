import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
import type { LocationCollectionDescription } from "./properties/location-collection-description.file-property.ts"

export type LocationCollection = Page & {
  title: Title
  locationCollectionDescription?: LocationCollectionDescription
  icon?: Icon
}
