import type { ReplacementPatterns } from "akasha/domain/standard-agent-english/term/banned-term/properties/replacement-patterns.record-property.types.ts"
import type { Term } from "akasha/domain/standard-agent-english/term/term.page-type.types.ts"
import type { Instead } from "akasha/domain/taboo-term/properties/instead.text-property.types.ts"

export type BannedTerm = Term & {
  instead: Instead
  replacementPatterns?: ReplacementPatterns
}
