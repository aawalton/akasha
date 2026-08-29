import { existsSync, readdirSync, readFileSync } from "node:fs"
import { parse } from "yaml"
import { akashaRoot } from "../repo/roots/roots.ts"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { SEAT_DIR, SUBAGENT_DIR } from "./places.ts"
import { SUBAGENT_MARK } from "./writer.ts"

function seatDir(): string {
  return `${akashaRoot()}/${SEAT_DIR}`
}

function subagentDir(): string {
  return `${akashaRoot()}/${SUBAGENT_DIR}`
}

const SEAT_SUFFIX = ".seat.md"

const SUBAGENT_SUFFIX = ".subagent.md"

const PAGE_SUFFIX = ".md"

const READINGS_SUFFIX = ".readings.uncommitted.attachment.json"

const UNCOMMITTED_SUFFIX = ".uncommitted.yaml"

const CONTEXT_REPLACED = "context-replaced"

const RETAINED = "resume"

const ID_KEY = "id"

const SUBAGENT_ID_KEY = "subagent-id"

export type Entry = {
  oid: string
  seenAt: number
  mechanicalOid?: string
  expiredAt?: number
}

export type Records = Record<string, Entry>

export interface Reading {
  readonly oid: string
  readonly seenAt: number
  readonly mechanicalOid?: string | null
}

function entryOf(value: unknown): Entry | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { oid, seenAt, mechanicalOid, expiredAt } = value as {
    oid?: unknown
    seenAt?: unknown
    mechanicalOid?: unknown
    expiredAt?: unknown
  }
  if (typeof oid !== "string" || oid === "") return null
  if (typeof seenAt !== "number" || !Number.isFinite(seenAt)) return null
  const entry: Entry = { oid, seenAt }
  if (typeof mechanicalOid === "string" && mechanicalOid !== "") entry.mechanicalOid = mechanicalOid
  if (typeof expiredAt === "number" && Number.isFinite(expiredAt)) entry.expiredAt = expiredAt
  return entry
}

export function recordsOf(parsed: unknown): Records {
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return {}
  const records: Records = {}
  for (const [file, value] of Object.entries(parsed as Record<string, unknown>)) {
    const entry = entryOf(value)
    if (entry !== null) records[file] = entry
  }
  return records
}

export function loadPath(path: string): Records {
  if (!existsSync(path)) return {}
  try {
    return recordsOf(JSON.parse(readFileSync(path, "utf8")) as unknown)
  } catch {
    return {}
  }
}

export function countLines(text: string): number {
  if (text === "") return 0
  const parts = text.split("\n")
  return parts[parts.length - 1] === "" ? parts.length - 1 : parts.length
}

export function bodyItself(reading: Reading | null, oid: string): boolean {
  return reading !== null && reading.oid === oid
}

export function sameBody(reading: Reading | null, oid: string): boolean {
  return bodyItself(reading, oid) || (reading !== null && reading.mechanicalOid === oid)
}

function seatPageWithId(id: string): string | null {
  if (!existsSync(seatDir())) return null
  for (const name of readdirSync(seatDir())) {
    if (!name.endsWith(SEAT_SUFFIX)) continue
    const at = `${seatDir()}/${name}`
    try {
      if (textField(parseFrontmatter(readFileSync(at, "utf8")), ID_KEY) === id) return at
    } catch {
      continue
    }
  }
  return null
}

function subagentPageWith(childId: string): string | null {
  if (!existsSync(subagentDir())) return null
  for (const name of readdirSync(subagentDir())) {
    if (!name.endsWith(SUBAGENT_SUFFIX)) continue
    const at = `${subagentDir()}/${name}`
    try {
      if (textField(parseFrontmatter(readFileSync(at, "utf8")), SUBAGENT_ID_KEY) === childId) return at
    } catch {
      continue
    }
  }
  return null
}

export function agentPageFor(writer: string): string | null {
  const mark = writer.indexOf(SUBAGENT_MARK)
  if (mark > 0) {
    const named = `${subagentDir()}/${writer}${SUBAGENT_SUFFIX}`
    if (existsSync(named)) return named
    return subagentPageWith(writer.slice(mark + SUBAGENT_MARK.length))
  }
  return seatPageWithId(writer)
}

export function agentPages(): readonly string[] {
  const found: string[] = []
  for (const dir of [seatDir(), subagentDir()]) {
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) if (name.endsWith(PAGE_SUFFIX)) found.push(`${dir}/${name}`)
  }
  return found
}

function besidePage(page: string, suffix: string): string {
  return `${page.slice(0, -PAGE_SUFFIX.length)}${suffix}`
}

function parsedAt(path: string): unknown {
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return null
  }
  try {
    return path.endsWith(UNCOMMITTED_SUFFIX) ? parse(raw) : (JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export interface Replacement {
  readonly at: number
  readonly source: string
}

export function replacedBy(page: string): Replacement | null {
  const held = parsedAt(besidePage(page, UNCOMMITTED_SUFFIX))
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const stated = (held as Record<string, unknown>)[CONTEXT_REPLACED]
  if (stated === null || typeof stated !== "object" || Array.isArray(stated)) return null
  const { value, at } = stated as { value?: unknown; at?: unknown }
  if (typeof value !== "string" || value === RETAINED) return null
  if (typeof at !== "number" || !Number.isFinite(at)) return null
  return { at, source: value }
}

export function replacedAt(page: string): number {
  return replacedBy(page)?.at ?? 0
}

function readingOf(value: unknown, cutoff: number): Reading | null {
  const entry = entryOf(value)
  if (entry === null) return null
  if (entry.expiredAt !== undefined) return null
  if (cutoff !== 0 && !(entry.seenAt > cutoff)) return null
  return {
    oid: entry.oid,
    seenAt: entry.seenAt,
    mechanicalOid: entry.mechanicalOid ?? null,
  }
}

export interface ReadRecord {
  readonly page: string
  readonly at: string
  readonly reading: (absolutePath: string) => Reading | null
  readonly paths: () => readonly string[]
  readonly replaced: Replacement | null
  readonly expired: (absolutePath: string) => boolean
}

export function readRecordFor(writer: string): ReadRecord | null {
  const page = agentPageFor(writer)
  if (page === null) return null
  const at = besidePage(page, READINGS_SUFFIX)
  const held = parsedAt(at)
  const records =
    held === null || typeof held !== "object" || Array.isArray(held)
      ? {}
      : (held as Record<string, unknown>)
  const replaced = replacedBy(page)
  const cutoff = replaced?.at ?? 0
  const known = new Map<string, Reading | null>()
  const reading = (absolutePath: string): Reading | null => {
    const already = known.get(absolutePath)
    if (already !== undefined) return already
    const made = readingOf(records[absolutePath], cutoff)
    known.set(absolutePath, made)
    return made
  }
  const expired = (absolutePath: string): boolean =>
    entryOf(records[absolutePath]) !== null && reading(absolutePath) === null
  return {
    page,
    at,
    reading,
    paths: () => Object.keys(records).filter((one) => reading(one) !== null),
    replaced,
    expired,
  }
}
