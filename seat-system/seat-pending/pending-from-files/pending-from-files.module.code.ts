import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import {
  everyRecipient,
  messagesTo,
} from "../../messaging/message-file/message-file.module.code.ts"
import { readOwed } from "../../owed-reading/owed-reading.module.code.ts"
import { seatsPresent } from "../../seat-roster/seat-roster.module.code.ts"
import type { TurnPendingComponent } from "../../seat-turn-pending/seat-turn-pending.module.code.ts"
import { pathsUnder } from "../../subagents/presence/subagent-presence.module.code.ts"

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

export function subagentsUnder(seatName: string | null): number {
  if (seatName === null || seatName === "") return 0
  return pathsUnder(akashaRoot(), seatName).length
}

function standsOwed(): boolean {
  return readOwed() === "owed"
}

export function pendingFromFiles(): readonly SeatPending[] {
  const blocked = sendersStandingBlocked()
  return seatsPresent().map((one) => ({
    seat: one.id,
    values: {
      "live-subagent": subagentsUnder(one.name) > 0,
      "send-in-flight": one.name !== null && blocked.has(one.name),
      owed: standsOwed(),
    },
  }))
}
