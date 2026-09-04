import {
  everyRecipient,
  messagesTo,
} from "../../messaging/message-file/message-file.module.code.ts"
import { readOwed } from "../../owed-reading/owed-reading.module.code.ts"
import { seatsPresent } from "../../seat-roster/seat-roster.module.code.ts"
import {
  anyLiveShell,
  anyLiveSubagent,
  workingOf,
} from "../../seat-turn/turn-working/turn-working.module.code.ts"
import type { TurnPendingComponent } from "../../seat-turn-pending/seat-turn-pending.module.code.ts"

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

function standsOwed(): boolean {
  return readOwed() === "owed"
}

export function pendingFromFiles(): readonly SeatPending[] {
  const blocked = sendersStandingBlocked()
  return seatsPresent().map((one) => {
    const working = workingOf(one.id)
    return {
      seat: one.id,
      values: {
        "live-shell": anyLiveShell(working),
        "live-subagent": anyLiveSubagent(working),
        "send-in-flight": one.name !== null && blocked.has(one.name),
        owed: standsOwed(),
      },
    }
  })
}
