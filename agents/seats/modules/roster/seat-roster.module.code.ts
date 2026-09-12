import { bareSlug } from "akasha/agents/attributes/agent-attributes.module.code.ts"
import { agentPresence } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "akasha/agents/seats/modules/proc-key/seat-proc-key.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { akashaSeatsInHistory } from "akasha/seat-system/seat-akasha-history/seat-akasha-history.module.code.ts"
import { akashaSeatsStated } from "akasha/seat-system/seat-akasha-read/seat-akasha-read.module.code.ts"
import { sessionOf } from "akasha/seat-system/seat-session/seat-session.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

const SESSION_KEY = "claude-code-session-uuid"

const SEAT_SUFFIX = ".seat.ts"

function nameInPath(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1)
  return base.endsWith(SEAT_SUFFIX) ? base.slice(0, -SEAT_SUFFIX.length) : base
}

export interface Seated {
  readonly id: string
  readonly name: string | null
  readonly domain: string | null
  readonly role: string | null
  readonly activeAtMs: number
  readonly session: string | null
}

function seatedFrom(
  frontmatter: Record<string, unknown> | null,
  name: string,
  activeAtMs: number
): Seated | null {
  if (frontmatter === null) return null
  const id = textAt(frontmatter, "id")
  if (id === null) return null
  return {
    id,
    name,
    domain: bareSlug(textAt(frontmatter, "domain-slug")),
    role: textAt(frontmatter, "role-slug"),
    activeAtMs,
    session: textAt(frontmatter, SESSION_KEY),
  }
}

export function seatsStanding(): readonly (Seated & {
  readonly presence: SeatPresence
  readonly present: boolean
})[] {
  const found: (Seated & { presence: SeatPresence; present: boolean })[] = []
  for (const one of akashaSeatsStated()) {
    const seated = seatedFrom(one.values, one.name, one.activeAtMs)
    if (seated === null) continue
    const presence = agentPresence(one.id)
    const session = sessionOf(one.id)?.value ?? seated.session
    found.push({ ...seated, session, presence, present: presence === "present" })
  }
  return found
}

export function seatsPresent(): readonly Seated[] {
  return seatsStanding().filter((one) => one.present)
}

export function seatsAbsent(): readonly Seated[] {
  const standing = seatsStanding()
  const byId = new Map<string, Seated>()
  for (const one of standing) {
    if (one.presence === "absent") byId.set(one.id, one)
  }
  const live = new Set(standing.filter((one) => one.presence !== "absent").map((one) => one.id))
  for (const [id, held] of akashaSeatsInHistory(rootFor(resolveRoots(), AKASHA))) {
    if (live.has(id)) continue
    const seated = seatedFrom(held.values, nameInPath(held.path), held.atMs)
    if (seated === null) continue
    const already = byId.get(seated.id)
    if (already === undefined || already.activeAtMs < seated.activeAtMs) byId.set(seated.id, seated)
  }
  return [...byId.values()]
}

export function seatRoster(live: boolean): readonly Seated[] {
  return live ? seatsPresent() : seatsAbsent()
}
