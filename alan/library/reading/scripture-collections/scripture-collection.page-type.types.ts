import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type ScriptureCollection = CollectionExternal & {
  title: Title
  externalId?: ExternalId
}
