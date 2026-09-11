import type { ReplacementPatterns } from "akasha/domains/standard-agent-english/terms/banned-terms/properties/replacement-patterns.record-property.ts"
import type { Term } from "akasha/domains/standard-agent-english/terms/term.page-type.types.ts"
import type { Instead } from "akasha/domains/taboo-terms/properties/instead.text-property.types.ts"

export type BannedTerm = Term & {
  instead: Instead
  replacementPatterns?: ReplacementPatterns
}
