import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { HERE } from "../graph/roots.ts"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"

const SEAT_DIR = `${HERE}/agent/seat`

const SUBAGENT_DIR = `${HERE}/agent/subagent`

const SEAT_SUFFIX = ".seat.md"

const SUBAGENT_SUFFIX = ".subagent.md"

const PAGE_SUFFIX = ".md"

const READINGS_SUFFIX = ".readings.uncommitted.attachment.json"

const UNCOMMITTED_SUFFIX = ".uncommitted.yaml"

const CONTEXT_REPLACED = "context-replaced"

const RETAINED = "resume"

const SUBAGENT_MARK = "--"

const ID_KEY = "id"

const SUBAGENT_ID_KEY = "subagent-id"

export type Span = readonly [number, number]

export interface Reading {
  readonly at: number
  readonly spans: readonly Span[]
  readonly blob: string | null
  readonly mechanical: string | null
}

export function blobId(content: Uint8Array): string {
  return createHash("sha1").update(`blob ${content.length}\0`).update(content).digest("hex")
}

export function countLines(text: string): number {
  if (text === "") return 0
  const parts = text.split("\n")
  return parts[parts.length - 1] === "" ? parts.length - 1 : parts.length
}

export function coveredTo(spans: readonly Span[]): number {
  let covered = 0
  for (const [start, end] of [...spans].sort((a, b) => a[0] - b[0])) {
    if (start > covered + 1) break
    covered = Math.max(covered, end)
  }
  return covered
}

export function bodyItself(reading: Reading | null, mark: string): boolean {
  return reading !== null && reading.blob === mark
}

export function sameBody(reading: Reading | null, mark: string): boolean {
  return bodyItself(reading, mark) || (reading !== null && reading.mechanical === mark)
}

export function firstUnreadLine(reading: Reading | null, mark: string, lines: number): number | null {
  if (lines === 0) return null
  if (reading === null) return 1
  if (!sameBody(reading, mark)) return 1
  const covered = coveredTo(reading.spans)
  return covered >= lines ? null : covered + 1
}

function seatPageWithId(id: string): string | null {
  if (!existsSync(SEAT_DIR)) return null
  for (const name of readdirSync(SEAT_DIR)) {
    if (!name.endsWith(SEAT_SUFFIX)) continue
    const at = `${SEAT_DIR}/${name}`
    try {
      if (textField(parseFrontmatter(readFileSync(at, "utf8")), ID_KEY) === id) return at
    } catch {
      continue
    }
  }
  return null
}

function subagentPageWith(childId: string): string | null {
  if (!existsSync(SUBAGENT_DIR)) return null
  for (const name of readdirSync(SUBAGENT_DIR)) {
    if (!name.endsWith(SUBAGENT_SUFFIX)) continue
    const at = `${SUBAGENT_DIR}/${name}`
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
    const named = `${SUBAGENT_DIR}/${writer}${SUBAGENT_SUFFIX}`
    if (existsSync(named)) return named
    return subagentPageWith(writer.slice(mark + SUBAGENT_MARK.length))
  }
  return seatPageWithId(writer)
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

function spanOf(value: unknown): Span | null {
  if (!Array.isArray(value)) return null
  const [start, end] = value as readonly unknown[]
  return typeof start === "number" && typeof end === "number" ? [start, end] : null
}

function readingOf(value: unknown, cutoff: number): Reading | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { at, spans, blob, seen, via, mechanical } = value as Record<string, unknown>
  if (via === "notify") return null
  if (typeof at !== "number" || !Number.isFinite(at) || !Array.isArray(spans)) return null
  if (cutoff !== 0 && !(typeof seen === "number" && seen > cutoff)) return null
  const kept: Span[] = []
  for (const raw of spans) {
    const span = spanOf(raw)
    if (span === null) return null
    kept.push(span)
  }
  return {
    at,
    spans: kept,
    blob: typeof blob === "string" && blob !== "" ? blob : null,
    mechanical: typeof mechanical === "string" && mechanical !== "" ? mechanical : null,
  }
}

export interface ReadLog {
  readonly page: string
  readonly at: string
  readonly reading: (absolutePath: string) => Reading | null
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
  return {
    page,
    at,
    reading: (absolutePath) => {
      const already = known.get(absolutePath)
      if (already !== undefined) return already
      const made = readingOf(records[absolutePath], cutoff)
      known.set(absolutePath, made)
      return made
    },
  }
}
