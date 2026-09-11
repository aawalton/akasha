import type { Instead } from "akasha/domains/taboo-terms/properties/instead.text-property.types.ts"
import type { Sense } from "akasha/domains/taboo-terms/properties/sense.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type TabooSenses = List<{
  sense: Sense
  instead: Instead
}>
