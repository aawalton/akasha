import type { FromPattern } from "akasha/domains/standard-agent-english/terms/banned-terms/properties/from-pattern.text-property.types.ts"
import type { ProseFrame } from "akasha/domains/standard-agent-english/terms/banned-terms/properties/prose-frame.relation-property.types.ts"
import type { ToPattern } from "akasha/domains/standard-agent-english/terms/banned-terms/properties/to-pattern.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type ReplacementPatterns = List<{
  frame: ProseFrame
  fromPattern: FromPattern
  toPattern: ToPattern
}>
