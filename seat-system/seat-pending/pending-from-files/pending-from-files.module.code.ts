import { handedOver } from "akasha/changes/modules/subagent-handed/subagent-handed.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import {
  everyRecipient,
  messagesTo,
} from "../../messaging/message-file/message-file.module.code.ts"
import {
  anyLiveShell,
  workingOf,
} from "../../seat-observation/seat-turn/turn-working/turn-working.module.code.ts"
import { seatsPresent } from "../../seat-roster/seat-roster.module.code.ts"
import type { TurnPendingComponent } from "../../seat-turn-pending/seat-turn-pending.module.code.ts"
import { pagesIn, type SubagentPage } from "../../subagent-census/subagent-census.module.code.ts"

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

export type Handed = (page: string) => boolean

export function seatsWithSubagentPage(
  pages: readonly SubagentPage[],
  handed: Handed = () => false
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of pages) {
    if (one.seatId === "") continue
    if (handed(one.path)) continue
    found.add(one.seatId)
  }
  return found
}

export function pendingFromFiles(): readonly SeatPending[] {
  const blocked = sendersStandingBlocked()
  const root = akashaRoot()
  const hasChild = seatsWithSubagentPage(pagesIn(root), (page) => handedOver(root, page))
  return seatsPresent().map((one) => {
    const working = workingOf(one.id)
    return {
      seat: one.id,
      values: {
        "live-shell": anyLiveShell(working),
        "live-subagent": hasChild.has(one.id),
        "send-in-flight": one.name !== null && blocked.has(one.name),
      },
    }
  })
}
