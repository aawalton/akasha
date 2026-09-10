import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { Words } from "./properties/words.number-property.types.ts"

export type Unit = Domain & {
  words: Words
}
