import {
  parseSeatProcKey,
  type SeatPresence,
  seatProcKeyPresence,
} from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  akashaHolderProcessOf,
  akashaSeatsThatExist,
} from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import {
  type SeatStopSaying,
  stopSeat,
} from "akasha/agent/seat/stopping/modules/stop-seat/stop-seat.module.code.ts"

const GONE = "absent"

const UNKNOWN = "unknown"

const SWEPT: SeatStopSaying = {
  acting: "Sweeping",
  ended: "was found with no agent in it",
  took: "a sweep",
}

export type Stated = readonly (readonly [string, string | null])[]

export function agentsWithNoOne(
  stated: Stated,
  presenceOf: (said: string) => SeatPresence
): readonly string[] {
  const found: string[] = []
  for (const [agentId, said] of stated) {
    if (said === null || said === "") continue
    if (presenceOf(said) === GONE) found.push(agentId)
  }
  return found
}

export function presenceStated(said: string): SeatPresence {
  const key = parseSeatProcKey(said)
  return key === null ? UNKNOWN : seatProcKeyPresence(key)
}

function statedNow(): Stated {
  return [...akashaSeatsThatExist()].map(
    ([agentId]) => [agentId, akashaHolderProcessOf(agentId)] as const
  )
}

export async function sweepAbsentSeats(): Promise<readonly string[]> {
  const taken: string[] = []
  for (const agentId of agentsWithNoOne(statedNow(), presenceStated)) {
    const stopped = await stopSeat({ agentId, force: false, saying: SWEPT })
    taken.push(stopped.name ?? agentId)
  }
  return taken
}
