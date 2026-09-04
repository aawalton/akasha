import { type Value, valueAt } from "@akasha/pages-system/page-value"
import {
  akashaBesideOf,
  akashaRoot,
  akashaSeatPathForAgent,
  akashaSeatsThatExist,
  besideWrittenAtMs,
  CARRIED,
  RECORDS,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import type { SeatRecord } from "../seat-record/seat-record.module.code.ts"

// What is observed of a seat sits beside its page in akasha. Reaching it through the old page
// is what the sweep broke: taking that page away orphaned a sidecar that was still there, and
// every reader below it answered nothing rather than saying it could not look.
//
// Where a seat sits and where each of its values sits on it are held in `seat-akasha-beside`,
// which the writer reaches too. What is here is the reading of those values back into the shapes
// the old system's readers take.

function heldAt(values: Record<string, unknown>, at: readonly string[]): unknown {
  const [one, two] = at
  if (one === undefined) return undefined
  const first = values[one]
  if (two === undefined) return first
  if (first === null || typeof first !== "object" || Array.isArray(first)) return undefined
  return (first as Record<string, unknown>)[two]
}

function saidAsText(held: unknown): string | null {
  if (typeof held === "string") return held === "" ? null : held
  if (typeof held === "number") return Number.isFinite(held) ? String(held) : null
  return null
}

// What a seat STATES, as against what is observed of it, and where each old key sits in akasha.
// The old readers ask by the keys the markdown frontmatter carried, so a page read from akasha is
// answered under those names rather than akasha's own.
//
// `assignment-slug` answers `domain-slug`: akasha names the property for the assignment because a
// person and a persona each extend a domain, and the value either one holds is the same string
// the old page carried.
const STATED: Readonly<Record<string, string>> = {
  id: "id",
  slug: "slug",
  "page-type-slug": "pageTypeSlug",
  "persona-slug": "personaSlug",
  "domain-slug": "assignmentSlug",
  "role-slug": "roleSlug",
  "person-slug": "personSlug",
  "principal-seat-name": "principalSeatName",
  "start-mode": "startMode",
  "on-call": "onCall",
  "registration-account": "registrationAccount",
  "transcript-path": "transcriptPath",
  // Observed of a seat and committed all the same, because nothing re-derives it. This is the
  // read that answers it for a seat whose old page has gone, which is what a resume needs.
  "claude-code-session-uuid": "claudeCodeSessionUuid",
}

const TITLE = "title"

const SLUG = "slug"

// ONE SEAT'S VALUES, CARRIED FROM AKASHA'S NAMES BACK TO THE OLD PAGE'S. This takes the value
// rather than the seat, so a body read from anywhere is answered the same way — the page sitting
// now, or the one a commit still holds after a stop took the file away.
export function underOldKeys(held: Record<string, unknown>): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  for (const [key, from] of Object.entries(STATED)) {
    const said = held[from]
    if (said !== undefined && said !== null && said !== "") values[key] = said
  }
  // The old page carried a title and akasha carries none, because a seat's title was only ever its
  // slug spelled again. A reader asking for one is answered rather than left short.
  const slug = values[SLUG]
  if (typeof slug === "string" && values[TITLE] === undefined) values[TITLE] = slug
  return values
}

// What a seat states in akasha, under the keys the old page carried. Null where akasha holds no
// such seat; refuses a root that names no seat index at all.
export function akashaSeatValuesOf(agentId: string): Record<string, unknown> | null {
  const page = akashaSeatPathForAgent(agentId)
  if (page === null) return null
  const held: Value | null = valueAt(page, akashaRoot())
  if (held === null) return null
  return underOldKeys(held as Record<string, unknown>)
}

export interface SeatStated {
  readonly id: string
  readonly name: string
  readonly values: Record<string, unknown>
  readonly activeAtMs: number
}

// EVERY SEAT AKASHA HOLDS, EACH WITH WHAT IT STATES, under the keys the old page's frontmatter
// carried. This is what a walk of the old seat directory turns into. A reader that asks after one
// seat was answered here already; these are the readers that LIST them, and every one of them
// opened each file in that directory and parsed its frontmatter to find the set.
//
// THE SET IS ANSWERED BY THE INDEX AND NO PAGE IS OPENED TO FIND IT. Only the seats the index
// names are read, so this costs the fleet rather than the corpus, and it is a shorter walk than
// the directory was.
//
// A SEAT'S ACTIVITY IS WHEN WHAT IS OBSERVED OF IT WAS LAST WRITTEN. The old walk took the newest
// of the page and its sidecar, and a seat's page is written once where its sidecar is written
// every beat, so the sidecar was already the answer in all but the first moment of a seat's life.
export function akashaSeatsStated(): readonly SeatStated[] {
  const found: SeatStated[] = []
  for (const [id, name] of akashaSeatsThatExist()) {
    const values = akashaSeatValuesOf(id)
    if (values === null) continue
    const page = akashaSeatPathForAgent(id)
    found.push({ id, name, values, activeAtMs: page === null ? 0 : besideWrittenAtMs(page) })
  }
  return found
}

// The old store keeps an instant as milliseconds and akasha writes it as ISO 8601, so a value
// carried out through `CARRIED` is carried back the same way. A reader taking this instead of the
// raw sidecar must not have to know which of the two it is holding.
function asOldKind(held: unknown, kind: string): unknown {
  if (kind !== "instant") return held
  if (typeof held !== "string") return held
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

// EVERY VALUE AKASHA HOLDS BESIDE A SEAT, UNDER THE KEYS THE OLD SIDECAR CARRIED. `CARRIED` and
// `RECORDS` walked the other way, so a reader that took the raw sidecar can take this instead
// without learning akasha's names. What akasha does not carry is absent here rather than null,
// which lets a caller lay the old sidecar over the top and have a value it holds win.
export function akashaObservedOf(agentId: string): Record<string, unknown> | null {
  const values = akashaBesideOf(agentId)
  if (values === null) return null
  const held: Record<string, unknown> = {}
  for (const [key, where] of Object.entries(CARRIED)) {
    const said = asOldKind(heldAt(values, where.at), where.kind)
    if (said !== undefined && said !== null) held[key] = said
  }
  for (const [key, name] of Object.entries(RECORDS)) {
    const said = values[name]
    if (said !== undefined && said !== null) held[key] = said
  }
  return held
}

// One value a seat carries, read from akasha under the old system's key and returned in the shape
// the old store's readers take. The mapping is `CARRIED`, walked the other way, so a key akasha
// does not carry answers null here rather than guessing at a name for it.
export function akashaSeatRecordOf(agentId: string, key: string): SeatRecord | null {
  const where = CARRIED[key]
  if (where === undefined) return null
  const values = akashaBesideOf(agentId)
  if (values === null) return null
  const value = saidAsText(heldAt(values, where.at))
  if (value === null) return null
  const page = akashaSeatPathForAgent(agentId)
  return { value, at: page === null ? 0 : besideWrittenAtMs(page) }
}
