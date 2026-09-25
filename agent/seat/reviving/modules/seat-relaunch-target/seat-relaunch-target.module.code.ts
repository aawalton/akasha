import {
  frontmatterFromHistory,
  nameFromHistory,
} from "akasha/agent/seat/modules/page-history/seat-page-history.module.code.ts"
import { pageValuesOf } from "akasha/agent/seat/modules/page-values/seat-page-values.module.code.ts"
import { agentPresence } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import { sessionOf } from "akasha/agent/seat/session/seat-session.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { resolveRoots } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const TITLE = "title"

const ACCOUNT_KEY = "registration-account"

const START_MODE_KEY = "start-mode"

interface RelaunchTarget {
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
