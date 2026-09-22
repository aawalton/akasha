import {
  type LiveProxySeat,
  liveProxySeats,
  seatsNewestFirst,
} from "akasha/agent/model/gateway/modules/proxy-seat/proxy-seat.module.code.ts"
import { seatsPresent } from "akasha/agent/seat/fleet/modules/seat-roster/seat-roster.module.code.ts"
import { readProxyState } from "akasha/agent/seat/model-gateway/modules/seat-proxy-state/seat-proxy-state.module.code.ts"
import { pidAliveOrRefuse } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"

export function liveSeats(): readonly LiveProxySeat[] {
  const agents = seatsNewestFirst(
    seatsPresent().map((seat) => ({ id: seat.id, name: seat.name, activeAtMs: seat.activeAtMs }))
  )
  return liveProxySeats(agents, readProxyState, pidAliveOrRefuse)
}
