import type { Collection } from "../../../../collections/collection.page-type.types.ts"
import type { ExternalId } from "../../../../collections/externals/properties/external-id.text-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { PassageText } from "./properties/passage-text.file-property.ts"
import type { ScriptureBook } from "./properties/scripture-book.text-property.ts"
import type { ScriptureTranslation } from "./properties/scripture-translation.select-property.ts"

export type ScripturePassage = Collection & {
  title: Title
  externalId?: ExternalId
  book?: ScriptureBook
  translation?: ScriptureTranslation
  passageText?: PassageText
}
