import type { InterruptMessage } from "akasha/agents/seats/properties/interrupt-message.text-property.types.ts"
import type { RequestedAction } from "akasha/agents/seats/properties/requested-action.relation-property.types.ts"
import type { RestartArmedAt } from "akasha/agents/seats/properties/restart-armed-at.instant-property.types.ts"

export type Request = {
  action: RequestedAction
  message?: InterruptMessage
  armedAt?: RestartArmedAt
}
