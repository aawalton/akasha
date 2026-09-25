import type { Instead } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/properties/instead.text-property.types.ts"
import type { Sense } from "akasha/domain/taboo-term/properties/sense.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type TabooSenses = List<{
  sense: Sense
  instead: Instead
}>
