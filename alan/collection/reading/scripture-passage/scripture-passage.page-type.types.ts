import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { PassageText } from "akasha/alan/collection/reading/scripture-passage/properties/passage-text.file-property.types.ts"
import type { ScriptureTranslation } from "akasha/alan/collection/reading/scripture-passage/properties/scripture-translation.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ScripturePassage = Collection & {
  title: Title
  externalId?: ExternalId
  translation?: ScriptureTranslation
  passageText?: PassageText
}
