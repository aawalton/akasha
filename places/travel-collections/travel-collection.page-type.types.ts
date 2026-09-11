import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type TravelCollection = Collection & {
  title: Title
}
