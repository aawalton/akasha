import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import {
  frontmatterFromHistory,
  nameFromHistory,
} from "akasha/seat-system/seat-page-history/seat-page-history.module.code.ts"
import { pageValuesOf } from "akasha/seat-system/seat-page-values/seat-page-values.module.code.ts"
import { agentPresence } from "akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "akasha/seat-system/seat-proc-key/seat-proc-key.module.code.ts"
import { sessionOf } from "akasha/seat-system/seat-session/seat-session.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

const TITLE = "title"

const ACCOUNT_KEY = "registration-account"

export interface RelaunchTarget {
  readonly name: string | null
  readonly account: string | null
  readonly presence: SeatPresence
  readonly sessionId: string | null
}

function fromHistory(agentId: string): RelaunchTarget | null {
  const roots = resolveRoots()
  const name = nameFromHistory(agentId, roots)
  if (name === null) return null
  return {
    name,
    account: textAt(frontmatterFromHistory(agentId, roots), ACCOUNT_KEY),
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

      presence: agentPresence(agentId),
      sessionId: sessionOf(agentId)?.value ?? null,
    },
  }
}
