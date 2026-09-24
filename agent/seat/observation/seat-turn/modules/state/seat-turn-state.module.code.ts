import { attributesOf } from "akasha/agent/modules/attributes/agent-attributes.module.code.ts"
import { roleIsOnCall } from "akasha/agent/seat/declaration/modules/seat-role-on-call/seat-role-on-call.module.code.ts"
import { agentPresence } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { pendingOf } from "akasha/agent/seat/observation/seat-turn/modules/pending/seat-turn-pending.module.code.ts"
import {
  readSeatTurn,
  type SeatTurnReading,
  type SeatTurnRecords,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { workingOf } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"

function seatTurnRecordsOf(agent: string): SeatTurnRecords {
  return {
    presence: agentPresence(agent),
    pending: pendingOf(agent),
    working: workingOf(agent),
    onCallRole: roleIsOnCall(attributesOf(agent).role?.slug ?? null),
  }
}

export function seatTurnStateOf(agent: string): SeatTurnReading {
  return readSeatTurn(seatTurnRecordsOf(agent))
}
