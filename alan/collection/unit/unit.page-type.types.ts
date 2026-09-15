import type { Words } from "akasha/alan/collection/unit/properties/words.number-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Unit = Domain & {
  words: Words
}
