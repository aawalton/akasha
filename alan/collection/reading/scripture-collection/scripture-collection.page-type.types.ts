import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { ScriptureTranslation } from "akasha/alan/collection/reading/scripture-passage/properties/scripture-translation.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ScriptureCollection = CollectionExternal & {
  title: Title
  externalId?: ExternalId
  translation?: ScriptureTranslation
}
