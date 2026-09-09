import { type LiveProxySeat, liveProxySeats, seatsNewestFirst } from "@akasha/agents/proxy-seats"
import { readProxyState } from "@akasha/seat-system/seat-proxy-state"
import { seatsPresent } from "@akasha/seat-system/seat-roster"
import { pidAliveOrRefuse } from "@akasha/utils/process/pid-signal"

export function liveSeats(): readonly LiveProxySeat[] {
  const agents = seatsNewestFirst(
    seatsPresent().map((seat) => ({ id: seat.id, name: seat.name, activeAtMs: seat.activeAtMs }))
  )
  return liveProxySeats(agents, readProxyState, pidAliveOrRefuse)
}
