import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { sweeping } from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export function sweepSubagentPagesOf(seat: string, why: string): undefined {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return
  sweeping(rootFor(resolveRoots(), AKASHA), seatName, seat, why)
}
