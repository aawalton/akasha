import type { FromPattern } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/properties/from-pattern.text-property.types.ts"
import type { ProseFrame } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/properties/prose-frame.relation-property.types.ts"
import type { ToPattern } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/properties/to-pattern.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ReplacementPatterns = List<{
  frame: ProseFrame
  fromPattern: FromPattern
  toPattern: ToPattern
}>
