import type { Instead } from "../../../taboo-terms/properties/instead.text-property.ts"
import type { Term } from "../term.page-type.types.ts"
import type { ReplacementPatterns } from "./properties/replacement-patterns.record-property.ts"

export type BannedTerm = Term & {
  instead: Instead
  replacementPatterns?: ReplacementPatterns
}
