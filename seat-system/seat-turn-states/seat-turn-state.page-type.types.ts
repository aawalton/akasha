import type { Domain } from "../../domains/domain.page-type.ts"
import type { TurnStateColor } from "./properties/turn-state-color.relation-property.ts"

export type SeatTurnState = Domain & {
  color: TurnStateColor
}
