import type { MasteryBehaviour } from "akasha/alan/books/pages/learn-everything/mastery-levels/properties/mastery-behaviour.text-property.types.ts"
import type { MasteryRank } from "akasha/alan/books/pages/learn-everything/mastery-levels/properties/mastery-rank.number-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type MasteryLevel = Domain & {
  rank: MasteryRank
  behaviour: MasteryBehaviour
}
