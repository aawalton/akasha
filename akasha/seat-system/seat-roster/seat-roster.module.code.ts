import { slugNamed } from "@akasha/markdown-pages/page-address"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { akashaSeatsInHistory } from "../seat-akasha-history/seat-akasha-history.module.code.ts"
import { akashaSeatsStated } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { agentPresence } from "../seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"
import { sessionOf } from "../seat-session/seat-session.module.code.ts"

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

function bareSlug(value: string | null): string | null {
  return value === null ? null : slugNamed(value)
}

function slugAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

function seatedFrom(
  frontmatter: Record<string, unknown> | null,
  name: string,
  activeAtMs: number
): Seated | null {
  if (frontmatter === null) return null
  const id = slugAt(frontmatter, "id")
  if (id === null) return null
  return {
    id,
    name,
    domain: bareSlug(slugAt(frontmatter, "domain-slug")),
    role: slugAt(frontmatter, "role-slug"),
    activeAtMs,
    session: slugAt(frontmatter, SESSION_KEY),
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
