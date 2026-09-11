import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.types.ts"
import type { PassageText } from "akasha/alan/library/reading/scripture-passages/properties/passage-text.file-property.types.ts"
import type { ScriptureBook } from "akasha/alan/library/reading/scripture-passages/properties/scripture-book.text-property.types.ts"
import type { ScriptureTranslation } from "akasha/alan/library/reading/scripture-passages/properties/scripture-translation.select-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type ScripturePassage = Collection & {
  title: Title
  externalId?: ExternalId
  book?: ScriptureBook
  translation?: ScriptureTranslation
  passageText?: PassageText
}
