import {
  fiveHourSpent,
  type Reading,
  readingsIn,
  sevenDaySpent,
} from "@akasha/agents/claude-account-measuring"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"

export interface Mean {
  readonly value: number | null
  readonly over: number
}

function meanOf(spent: readonly (number | null)[]): Mean {
  const held = spent.filter((one): one is number => one !== null)
  if (held.length === 0) return { value: null, over: 0 }
  return { value: held.reduce((sum, one) => sum + one, 0) / held.length, over: held.length }
}

export interface FleetUsage {
  readonly session: Mean
  readonly weekly: Mean
}

export function readFleetUsage(): FleetUsage {
  const readings: readonly Reading[] = readingsIn(rootFor(resolveRoots(), AKASHA))
  if (readings.length === 0) {
    throw new Error(
      "no claude-account page exists in akasha, and every account holding a page is answered, " +
        "so a fleet of none is the pages going unread rather than a fleet with nothing spent"
    )
  }
  return {
    session: meanOf(readings.map(fiveHourSpent)),
    weekly: meanOf(readings.map(sevenDaySpent)),
  }
}
