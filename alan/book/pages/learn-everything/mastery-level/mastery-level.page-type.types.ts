import type { MasteryBehaviour } from "akasha/alan/book/pages/learn-everything/mastery-level/properties/mastery-behaviour.text-property.types.ts"
import type { MasteryRank } from "akasha/alan/book/pages/learn-everything/mastery-level/properties/mastery-rank.number-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type MasteryLevel = Domain & {
  rank: MasteryRank
  behaviour: MasteryBehaviour
}
