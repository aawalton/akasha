import type { InterruptMessage } from "akasha/seat-system/seats/properties/interrupt-message.text-property.types.ts"
import type { RequestedAction } from "akasha/seat-system/seats/properties/requested-action.relation-property.types.ts"
import type { RestartArmedAt } from "akasha/seat-system/seats/properties/restart-armed-at.instant-property.types.ts"

export type Request = {
  action: RequestedAction
  message?: InterruptMessage
  armedAt?: RestartArmedAt
}
