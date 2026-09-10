import type { Domain } from "../../../../domains/domain.page-type.types.ts"
import type { MasteryBehaviour } from "./properties/mastery-behaviour.text-property.ts"
import type { MasteryRank } from "./properties/mastery-rank.number-property.ts"

export type MasteryLevel = Domain & {
  rank: MasteryRank
  behaviour: MasteryBehaviour
}
