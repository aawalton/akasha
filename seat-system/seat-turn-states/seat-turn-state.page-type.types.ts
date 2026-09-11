import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { TurnStateColor } from "akasha/seat-system/seat-turn-states/properties/turn-state-color.relation-property.types.ts"

export type SeatTurnState = Domain & {
  color: TurnStateColor
}
