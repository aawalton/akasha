import type { Instead } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/properties/instead.text-property.types.ts"
import type { ReplacementPatterns } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/properties/replacement-patterns.record-property.types.ts"
import type { Term } from "akasha/domain/plain-language/standard-agent-english/term/term.page-type.types.ts"

export type BannedTerm = Term & {
  instead: Instead
  replacementPatterns?: ReplacementPatterns
}
