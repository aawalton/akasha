import type { StartSymbol } from "akasha/domain/plain-language/standard-agent-english/property/properties/start-symbol.relation-property.types.ts"
import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export type StandardAgentEnglishProperty = TextProperty & {
  startSymbol?: StartSymbol
}
