import { everyRecipient, messagesTo } from "@tools/lib/message-file"
import { readOwed } from "@tools/lib/owed-read"
import { seatsPresent } from "@tools/lib/seat-roster"
import { principalSeatIdOf } from "../../seat-principal/seat-principal.module.code.ts"
import type { TurnPendingComponent } from "../../seat-turn-pending/seat-turn-pending.module.code.ts"
import {
  seatTurnStateOf,
  turnStillToCome,
} from "../../seat-turn-state/seat-turn-state.module.code.ts"

export interface SeatPending {
  readonly seat: string
  readonly values: Partial<Record<TurnPendingComponent, boolean>>
}

const BLOCKED = "blocked"

export function sendersStandingBlocked(): ReadonlySet<string> {
  const found = new Set<string>()
  for (const to of everyRecipient()) {
    for (const one of messagesTo(to)) {
      if (one.warrant === BLOCKED) found.add(one.from)
    }
  }
  return found
}

export function childrenByPrincipal(): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of seatsPresent()) {
    const principal = principalSeatIdOf(one.id)
    if (principal === null) continue
    if (!turnStillToCome(seatTurnStateOf(one.id).state)) continue
    found.set(principal, (found.get(principal) ?? 0) + 1)
  }
  return found
}

function standsOwed(): boolean {
  return readOwed() === "owed"
}

export function pendingFromFiles(): readonly SeatPending[] {
  const blocked = sendersStandingBlocked()
  const children = childrenByPrincipal()
  return seatsPresent().map((one) => ({
    seat: one.id,
    values: {
      "live-child": (children.get(one.id) ?? 0) > 0,
      "send-in-flight": one.name !== null && blocked.has(one.name),
      owed: standsOwed(),
    },
  }))
}
