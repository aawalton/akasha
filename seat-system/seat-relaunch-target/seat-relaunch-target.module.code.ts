import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  frontmatterFromHistory,
  nameFromHistory,
} from "../seat-page-history/seat-page-history.module.code.ts"
import { pageValuesOf } from "../seat-page-values/seat-page-values.module.code.ts"
import { agentPresence } from "../seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"
import { sessionOf } from "../seat-session/seat-session.module.code.ts"

const TITLE = "title"

const ACCOUNT_KEY = "registration-account"

export interface RelaunchTarget {
  readonly name: string | null
  readonly account: string | null
  readonly presence: SeatPresence
  readonly sessionId: string | null
}

function textAt(frontmatter: Record<string, unknown> | null, key: string): string | null {
  const held = frontmatter?.[key]
  return typeof held === "string" && held !== "" ? held : null
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
  // The page, then the history — the same order everywhere else reads in. A relaunch stands a
  // seat back up from what this answers, so a seat read as stating nothing is relaunched
  // without the account it signs in as.
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
      // Presence is one answer for a seat standing and a seat gone alike, so it is asked for by
      // id rather than read off whichever page happened to be found.
      presence: agentPresence(agentId),
      sessionId: sessionOf(agentId)?.value ?? null,
    },
  }
}
