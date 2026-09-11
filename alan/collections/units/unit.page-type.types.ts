import type { Words } from "akasha/alan/collections/units/properties/words.number-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Unit = Domain & {
  words: Words
}
