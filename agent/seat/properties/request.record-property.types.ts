import type { InterruptMessage } from "akasha/agent/seat/properties/interrupt-message.text-property.types.ts"
import type { RequestedAction } from "akasha/agent/seat/properties/requested-action.relation-property.types.ts"
import type { RestartArmedAt } from "akasha/agent/seat/properties/restart-armed-at.instant-property.types.ts"

export type Request = {
  action: RequestedAction
  message?: InterruptMessage
  armedAt?: RestartArmedAt
}
