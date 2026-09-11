import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type Achievement = CollectionExternal & {
  title: Title
}
