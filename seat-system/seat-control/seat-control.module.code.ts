import { akashaObservedOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBeside } from "../seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"

const CLEARED = {
  requestedAction: null,
  interruptMessage: null,
  restartArmedAt: null,
} as const

// AKASHA ALONE. This laid the old sidecar over the top so that a null it held would beat whatever
// akasha still carried, a request being cleared by writing null rather than by dropping the key.
//
// Akasha is written that null too, and `akashaObservedOf` leaves a null out rather than carrying it
// through — so a cleared request arrives here as a key that is not there instead of a key that is
// null. Every reader of this asks whether the value is a non-empty string, which an absent key and
// a null one both fail, so the two say the same thing to everything that asks.
export function controlOf(agentId: string): Record<string, unknown> | null {
  return akashaObservedOf(agentId)
}

export function requestedActionOf(agentId: string): string | null {
  const held = controlOf(agentId)?.requestedAction
  return typeof held === "string" && held !== "" ? held : null
}

// THE SEAT IS FOUND IN AKASHA RATHER THAN BY ITS OLD PAGE STANDING. Both of these asked for that
// page and treated its absence as the seat being gone, which was true while every seat had one and
// stops being true as those pages go.
export function setControl(agentId: string, values: Record<string, unknown>): void {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) {
    throw new Error(
      `no seat stands in akasha for agent ${agentId}, so there is nothing beside a page to carry the request. ` +
        "A seat that is not there has no agent present in it, and a request reaches only a running seat."
    )
  }
  keepBeside(seatName, { ...CLEARED, ...values })
}

export function clearControl(agentId: string): void {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) return
  keepBeside(seatName, CLEARED)
}
