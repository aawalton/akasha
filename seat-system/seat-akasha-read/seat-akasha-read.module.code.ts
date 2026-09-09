import { type Value, valueAt } from "@akasha/pages/page-value"
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

const STATED: Readonly<Record<string, string>> = {
  id: "id",
  slug: "slug",
  "page-type-slug": "pageTypeSlug",
  "persona-slug": "persona",
  "domain-slug": "assignmentSlug",
  "role-slug": "role",
  "person-slug": "person",
  "principal-seat-name": "principalSeatName",
  "start-mode": "startMode",
  "on-call": "onCall",
  "registration-account": "registrationAccount",
  "transcript-path": "transcriptPath",
  "claude-code-session-uuid": "claudeCodeSessionUuid",
}

const TITLE = "title"

const SLUG = "slug"

const PAGE_TYPE = "type"

const WAS_PAGE_TYPE = "pageTypeSlug"

export function underOldKeys(held: Record<string, unknown>): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  for (const [key, from] of Object.entries(STATED)) {
    const said = from === WAS_PAGE_TYPE ? (held[PAGE_TYPE] ?? held[from]) : held[from]
    if (said !== undefined && said !== null && said !== "") values[key] = said
  }
  const slug = values[SLUG]
  if (typeof slug === "string" && values[TITLE] === undefined) values[TITLE] = slug
  return values
}

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

function asOldKind(held: unknown, kind: string): unknown {
  if (kind !== "instant") return held
  if (typeof held !== "string") return held
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

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
