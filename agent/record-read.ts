import { exclusively } from "../exclusive/exclusive.ts"
import { attachmentFileOf, readAttachment, writeAttachment } from "../page/attachment-file.ts"
import { agentPageFor, agentPages, replacedAt } from "./read-log.ts"
import { coveredTo, type Entry, merge, type Records, recordsOf, type Span } from "./read-records.ts"

const READINGS = "readings"

const EXTENSION = "json"

const UNCOMMITTED = true

function vouched(records: Records, cutoff: number): Records {
  if (cutoff === 0) return records
  const kept: Records = {}
  for (const [path, entry] of Object.entries(records)) {
    if (entry.seen !== undefined && entry.seen > cutoff) kept[path] = entry
  }
  return kept
}

function standingOn(page: string): Records {
  const held = readAttachment(page, READINGS, EXTENSION, UNCOMMITTED)
  if (held === null) return {}
  try {
    return recordsOf(JSON.parse(held) as unknown)
  } catch {
    return {}
  }
}

function landReadings(page: string, records: Records): void {
  writeAttachment(page, READINGS, EXTENSION, `${JSON.stringify(records)}\n`, UNCOMMITTED)
}

export function recordPathFor(page: string): string {
  return attachmentFileOf(page, READINGS, EXTENSION, UNCOMMITTED)
}

const pending = new Map<string, Records>()

const cutoffs = new Map<string, number>()

function heldFor(page: string, cutoff: number): Records {
  const already = pending.get(page)
  if (already !== undefined) return already
  cutoffs.set(page, cutoff)
  return vouched(standingOn(page), cutoff)
}

export function recordsFor(page: string, cutoff: number): Records {
  return heldFor(page, cutoff)
}

function carryOn(existing: Entry | undefined, at: number, blob: string | undefined): Entry | null {
  if (existing === undefined) return null
  if (blob === undefined) return existing.at === at ? existing : null
  return existing.blob === blob ? existing : null
}

export function recordRead(
  page: string,
  cutoff: number,
  absolutePath: string,
  at: number,
  span: Span,
  blob?: string
): void {
  const records = heldFor(page, cutoff)
  const carried = carryOn(records[absolutePath], at, blob)
  const spans = merge(carried === null ? [span] : [...carried.spans, span])
  const named = blob ?? carried?.blob
  const entry: Entry = { at, spans, seen: Date.now() }
  if (named !== undefined) entry.blob = named
  records[absolutePath] = entry
  pending.set(page, records)
  cutoffs.set(page, cutoff)
}

export function flushReadings(): void {
  for (const [page, records] of pending) {
    const cutoff = cutoffs.get(page) ?? 0
    exclusively(recordPathFor(page), () => {
      landReadings(page, { ...vouched(standingOn(page), cutoff), ...records })
    })
  }
  pending.clear()
  cutoffs.clear()
}

export function resetReadings(page: string, cutoff: number): void {
  if (cutoff === 0) return
  pending.delete(page)
  cutoffs.delete(page)
  exclusively(recordPathFor(page), () => {
    const standing = standingOn(page)
    const kept = vouched(standing, cutoff)
    if (Object.keys(kept).length === Object.keys(standing).length) return
    landReadings(page, kept)
  })
}

export interface Moved {
  readonly path: string
  readonly from: string
  readonly to: string
  readonly wasLines: number
  readonly lines: number
}

export function carriedReading(entry: Entry, move: Moved): Entry | null {
  if ((entry.mechanical ?? entry.blob) !== move.from) return null
  if (coveredTo(entry.spans) < move.wasLines) return null
  return { ...entry, spans: [[1, Math.max(1, move.lines)]], mechanical: move.to }
}

export function recordReadBy(
  writer: string,
  absolutePath: string,
  at: number,
  span: Span,
  blob?: string
): void {
  const page = agentPageFor(writer)
  if (page === null) return
  recordRead(page, replacedAt(page), absolutePath, at, span, blob)
}

export function carryReadingsBy(moves: readonly Moved[]): number {
  return carryReadings(moves, agentPages())
}

export function carryReadings(moves: readonly Moved[], pages: readonly string[]): number {
  if (moves.length === 0) return 0
  const byPath = new Map(moves.map((one) => [one.path, one]))
  let carried = 0
  for (const page of pages) {
    const records = standingOn(page)
    let touched = false
    for (const [file, entry] of Object.entries(records)) {
      const move = byPath.get(file)
      if (move === undefined) continue
      const carriedOn = carriedReading(entry, move)
      if (carriedOn === null) continue
      records[file] = carriedOn
      touched = true
      carried += 1
    }
    if (touched) {
      exclusively(recordPathFor(page), () => {
        landReadings(page, records)
      })
    }
  }
  return carried
}

process.on("exit", () => {
  try {
    flushReadings()
  } catch {
  }
})
