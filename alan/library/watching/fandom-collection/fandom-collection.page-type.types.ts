import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type FandomCollection = Collection & {
  title: Title
}
