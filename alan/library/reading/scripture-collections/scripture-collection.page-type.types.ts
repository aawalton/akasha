import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type ScriptureCollection = CollectionExternal & {
  title: Title
}
