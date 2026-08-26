import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { akashaRoot } from "../repo/roots/roots.ts"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { SUBAGENT_MARK } from "./writer.ts"

function seatDir(): string {
  return `${akashaRoot()}/agent/seat`
}

function subagentDir(): string {
  return `${akashaRoot()}/agent/subagent`
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

const NOTIFIED = "notify"

export type Span = readonly [number, number]

export type Entry = {
  at: number
  spans: Span[]
  blob?: string
  seen?: number
  mechanical?: string
}

export type Records = Record<string, Entry>

export interface Reading {
  readonly at: number
  readonly spans: readonly Span[]
  readonly blob: string | null
  readonly mechanical?: string | null
}

function spanOf(value: unknown): Span | null {
  if (!Array.isArray(value)) return null
  const [start, end] = value as readonly unknown[]
  return typeof start === "number" && typeof end === "number" ? [start, end] : null
}

function entryOf(value: unknown): Entry | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { at, spans, blob, seen, via, mechanical } = value as {
    at?: unknown
    spans?: unknown
    blob?: unknown
    seen?: unknown
    via?: unknown
    mechanical?: unknown
  }
  if (typeof at !== "number" || !Number.isFinite(at) || !Array.isArray(spans)) return null
  const kept: Span[] = []
  for (const raw of spans) {
    const span = spanOf(raw)
    if (span === null) return null
    kept.push(span)
  }
  const entry: Entry = { at, spans: kept }
  if (typeof blob === "string" && blob !== "") entry.blob = blob
  if (typeof seen === "number" && Number.isFinite(seen)) entry.seen = seen
  if (typeof mechanical === "string" && mechanical !== "") entry.mechanical = mechanical
  if (via === NOTIFIED) return null
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

export function merge(spans: readonly Span[]): Span[] {
  const sorted = [...spans].sort((a, b) => a[0] - b[0])
  const out: Span[] = []
  for (const span of sorted) {
    const last = out[out.length - 1]
    if (last !== undefined && span[0] <= last[1] + 1) {
      out[out.length - 1] = [last[0], Math.max(last[1], span[1])]
      continue
    }
    out.push(span)
  }
  return out
}

export function coveredTo(spans: readonly Span[]): number {
  let covered = 0
  for (const [start, end] of merge(spans)) {
    if (start > covered + 1) break
    covered = Math.max(covered, end)
  }
  return covered
}

export function loadPath(path: string): Records {
  if (!existsSync(path)) return {}
  try {
    return recordsOf(JSON.parse(readFileSync(path, "utf8")) as unknown)
  } catch {
    return {}
  }
}

export function blobId(content: Uint8Array): string {
  return createHash("sha1").update(`blob ${content.length}\0`).update(content).digest("hex")
}

export function countLines(text: string): number {
  if (text === "") return 0
  const parts = text.split("\n")
  return parts[parts.length - 1] === "" ? parts.length - 1 : parts.length
}

export function bodyItself(reading: Reading | null, mark: string): boolean {
  return reading !== null && reading.blob === mark
}

export function sameBody(reading: Reading | null, mark: string): boolean {
  return bodyItself(reading, mark) || (reading !== null && reading.mechanical === mark)
}

export function firstGapIn(spans: readonly Span[], lines: number): number | null {
  if (lines === 0) return null
  const covered = coveredTo(spans)
  return covered >= lines ? null : covered + 1
}

export function firstUnreadLine(reading: Reading | null, mark: string, lines: number): number | null {
  if (lines === 0) return null
  if (reading === null) return 1
  if (!sameBody(reading, mark)) return 1
  return firstGapIn(reading.spans, lines)
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
    return path.endsWith(UNCOMMITTED_SUFFIX) ? Bun.YAML.parse(raw) : (JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export function replacedAt(page: string): number {
  const held = parsedAt(besidePage(page, UNCOMMITTED_SUFFIX))
  if (held === null || typeof held !== "object" || Array.isArray(held)) return 0
  const stated = (held as Record<string, unknown>)[CONTEXT_REPLACED]
  if (stated === null || typeof stated !== "object" || Array.isArray(stated)) return 0
  const { value, at } = stated as { value?: unknown; at?: unknown }
  if (typeof value !== "string" || value === RETAINED) return 0
  return typeof at === "number" && Number.isFinite(at) ? at : 0
}

function readingOf(value: unknown, cutoff: number): Reading | null {
  const entry = entryOf(value)
  if (entry === null) return null
  if (cutoff !== 0 && !(entry.seen !== undefined && entry.seen > cutoff)) return null
  return {
    at: entry.at,
    spans: entry.spans,
    blob: entry.blob ?? null,
    mechanical: entry.mechanical ?? null,
  }
}

export interface ReadLog {
  readonly page: string
  readonly at: string
  readonly reading: (absolutePath: string) => Reading | null
  readonly paths: () => readonly string[]
}

export function readLogFor(writer: string): ReadLog | null {
  const page = agentPageFor(writer)
  if (page === null) return null
  const at = besidePage(page, READINGS_SUFFIX)
  const held = parsedAt(at)
  const records =
    held === null || typeof held !== "object" || Array.isArray(held)
      ? {}
      : (held as Record<string, unknown>)
  const cutoff = replacedAt(page)
  const known = new Map<string, Reading | null>()
  const reading = (absolutePath: string): Reading | null => {
    const already = known.get(absolutePath)
    if (already !== undefined) return already
    const made = readingOf(records[absolutePath], cutoff)
    known.set(absolutePath, made)
    return made
  }
  return {
    page,
    at,
    reading,
    paths: () => Object.keys(records).filter((one) => reading(one) !== null),
  }
}
