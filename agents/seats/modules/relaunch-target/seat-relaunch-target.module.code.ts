import {
  frontmatterFromHistory,
  nameFromHistory,
} from "akasha/agents/seats/modules/page-history/seat-page-history.module.code.ts"
import { pageValuesOf } from "akasha/agents/seats/modules/page-values/seat-page-values.module.code.ts"
import { agentPresence } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "akasha/agents/seats/modules/proc-key/seat-proc-key.module.code.ts"
import { sessionOf } from "akasha/agents/seats/modules/session/seat-session.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

const TITLE = "title"

const ACCOUNT_KEY = "registration-account"

const START_MODE_KEY = "start-mode"

export interface RelaunchTarget {
  readonly name: string | null
  readonly account: string | null
  readonly startMode: string | null
  readonly presence: SeatPresence
  readonly sessionId: string | null
}

function fromHistory(agentId: string): RelaunchTarget | null {
  const roots = resolveRoots()
  const name = nameFromHistory(agentId, roots)
  if (name === null) return null
  const remembered = frontmatterFromHistory(agentId, roots)
  return {
    name,
    account: textAt(remembered, ACCOUNT_KEY),
    startMode: textAt(remembered, START_MODE_KEY),
    presence: "absent",
    sessionId: null,
  }
}

export async function resolveRelaunchTarget(
  agentId: string
): Promise<{ readonly target: RelaunchTarget } | { readonly error: string }> {
  const seat = pageValuesOf(agentId)
  if (seat === null) {
    const remembered = fromHistory(agentId)
    if (remembered !== null) return { target: remembered }
    return { error: `No agent found matching '${agentId}'` }
  }
  return {
    target: {
      name: textAt(seat, TITLE),
      account: textAt(seat, ACCOUNT_KEY),
      startMode: textAt(seat, START_MODE_KEY),
      presence: agentPresence(agentId),
      sessionId: sessionOf(agentId)?.value ?? null,
    },
  }
}
