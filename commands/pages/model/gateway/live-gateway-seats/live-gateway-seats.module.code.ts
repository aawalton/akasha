import {
  type LiveProxySeat,
  liveProxySeats,
  seatsNewestFirst,
} from "akasha/agents/models/gateway/modules/proxy-seats/proxy-seats.module.code.ts"
import { readProxyState } from "akasha/agents/seats/modules/proxy-state/seat-proxy-state.module.code.ts"
import { seatsPresent } from "akasha/agents/seats/modules/roster/seat-roster.module.code.ts"
import { pidAliveOrRefuse } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"

export function liveSeats(): readonly LiveProxySeat[] {
  const agents = seatsNewestFirst(
    seatsPresent().map((seat) => ({ id: seat.id, name: seat.name, activeAtMs: seat.activeAtMs }))
  )
  return liveProxySeats(agents, readProxyState, pidAliveOrRefuse)
}
