import { exclusively } from "../file/exclusive.ts"
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

function recordAt(page: string): string {
  return attachmentFileOf(page, READINGS, EXTENSION, UNCOMMITTED)
}

const pending = new Map<string, Records>()

function heldFor(agent: string, page: string): Records {
  const already = pending.get(agent)
  if (already !== undefined) return already
  return vouched(standingOn(page), replacedAt(page))
}

export function recordsFor(agent: string): Records {
  const page = agentPageFor(agent)
  return page === null ? {} : heldFor(agent, page)
}

function carryOn(existing: Entry | undefined, at: number, blob: string | undefined): Entry | null {
  if (existing === undefined) return null
  if (blob === undefined) return existing.at === at ? existing : null
  return existing.blob === blob ? existing : null
}

export function recordRead(
  agent: string,
  absolutePath: string,
  at: number,
  span: Span,
  blob?: string
): void {
  const page = agentPageFor(agent)
  if (page === null) return
  const records = heldFor(agent, page)
  const carried = carryOn(records[absolutePath], at, blob)
  const spans = merge(carried === null ? [span] : [...carried.spans, span])
  const named = blob ?? carried?.blob
  const entry: Entry = { at, spans, seen: Date.now() }
  if (named !== undefined) entry.blob = named
  records[absolutePath] = entry
  pending.set(agent, records)
}

export function flushReadings(): void {
  for (const [agent, records] of pending) {
    const page = agentPageFor(agent)
    if (page === null) continue
    exclusively(recordAt(page), () => {
      landReadings(page, { ...vouched(standingOn(page), replacedAt(page)), ...records })
    })
  }
  pending.clear()
}

export function resetReadings(agent: string, cutoff: number): void {
  if (cutoff === 0) return
  const page = agentPageFor(agent)
  if (page === null) return
  pending.delete(agent)
  exclusively(recordAt(page), () => {
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

export function carryReadings(moves: readonly Moved[]): number {
  if (moves.length === 0) return 0
  const byPath = new Map(moves.map((one) => [one.path, one]))
  let carried = 0
  for (const page of agentPages()) {
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
      exclusively(recordAt(page), () => {
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
