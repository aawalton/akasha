import type { TurnStateColor } from "akasha/agents/seats/turn-states/properties/turn-state-color.relation-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type SeatTurnState = Domain & {
  color: TurnStateColor
}
