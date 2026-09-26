import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { LoreFact } from "akasha/story/lore/properties/lore-fact.text-property.types.ts"
import type { LoreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.types.ts"

export type LoreFacts = List<{
  fact: LoreFact
  knowers: LoreKnowers
}>
