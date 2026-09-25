import {
  type KeptTurn,
  turnStateOf,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import type { TurnState } from "akasha/agent/seat/properties/turn-state.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<KeptTurn, TurnState> = (page, reach) => turnStateOf(page, reach)
