import type { Compacting } from "akasha/agents/seats/properties/compacting.boolean-property.types.ts"
import type { LiveShell } from "akasha/agents/seats/properties/live-shell.boolean-property.types.ts"
import type { LiveSubagent } from "akasha/agents/seats/properties/live-subagent.boolean-property.types.ts"
import type { SendInFlight } from "akasha/agents/seats/properties/send-in-flight.boolean-property.types.ts"

export type TurnPending = {
  compacting: Compacting
  liveShell: LiveShell
  liveSubagent: LiveSubagent
  sendInFlight: SendInFlight
}
