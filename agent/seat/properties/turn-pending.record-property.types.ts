import type { Compacting } from "akasha/agent/seat/properties/compacting.boolean-property.types.ts"
import type { LiveShell } from "akasha/agent/seat/properties/live-shell.boolean-property.types.ts"
import type { LiveSubagent } from "akasha/agent/seat/properties/live-subagent.boolean-property.types.ts"
import type { SendInFlight } from "akasha/agent/seat/properties/send-in-flight.boolean-property.types.ts"

export type TurnPending = {
  compacting: Compacting
  liveShell: LiveShell
  liveSubagent: LiveSubagent
  sendInFlight: SendInFlight
}
