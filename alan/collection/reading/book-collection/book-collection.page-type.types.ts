import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type BookCollection = CollectionExternal & {
  title: Title
}
