import type { MasteryBehaviour } from "akasha/alan/library/book-of-everything/mastery-levels/properties/mastery-behaviour.text-property.ts"
import type { MasteryRank } from "akasha/alan/library/book-of-everything/mastery-levels/properties/mastery-rank.number-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type MasteryLevel = Domain & {
  rank: MasteryRank
  behaviour: MasteryBehaviour
}
