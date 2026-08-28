import { exclusively } from "../exclusive/exclusive.ts"
import { attachmentFileOf, readAttachment, writeAttachment } from "../page/attachment-file.ts"
import {
  agentPageFor,
  agentPages,
  type Entry,
  type Records,
  recordsOf,
  replacedAt,
} from "./read-record.ts"

const READINGS = "readings"

const EXTENSION = "json"

const UNCOMMITTED = true

function vouched(records: Records, cutoff: number): Records {
  if (cutoff === 0) return records
  const kept: Records = {}
  for (const [path, entry] of Object.entries(records)) {
    if (entry.seenAt > cutoff) {
      kept[path] = entry
      continue
    }
    if (entry.expiredAt === undefined || entry.expiredAt === cutoff) {
      kept[path] = { ...entry, expiredAt: cutoff }
    }
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
  const live: Records = {}
  for (const [path, entry] of Object.entries(heldFor(page, cutoff))) {
    if (entry.expiredAt === undefined) live[path] = entry
  }
  return live
}

export function recordRead(
  page: string,
  cutoff: number,
  absolutePath: string,
  seenAt: number,
  oid: string
): void {
  const records = heldFor(page, cutoff)
  records[absolutePath] = { oid, seenAt }
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
    if (JSON.stringify(kept) === JSON.stringify(standing)) return
    landReadings(page, kept)
  })
}

export interface Moved {
  readonly path: string
  readonly from: string
  readonly to: string
}

export function carriedReading(entry: Entry, move: Moved): Entry | null {
  if ((entry.mechanicalOid ?? entry.oid) !== move.from) return null
  return { ...entry, mechanicalOid: move.to }
}

export function recordReadBy(
  writer: string,
  absolutePath: string,
  seenAt: number,
  oid: string
): void {
  const page = agentPageFor(writer)
  if (page === null) return
  recordRead(page, replacedAt(page), absolutePath, seenAt, oid)
}

export function carryReadingsBy(moves: readonly Moved[]): number {
  return carryReadings(moves, agentPages())
}

function carryInto(records: Records, byPath: ReadonlyMap<string, Moved>): number {
  let carried = 0
  for (const [file, entry] of Object.entries(records)) {
    const move = byPath.get(file)
    if (move === undefined) continue
    const carriedOn = carriedReading(entry, move)
    if (carriedOn === null) continue
    records[file] = carriedOn
    carried += 1
  }
  return carried
}

/**
 * Carrying every agent's reading of a file that moved.
 *
 * THE UNLOCKED READ IS A HINT AND NEVER WHAT LANDS. Reading inside the lock unconditionally would
 * take the lock on all of the agent pages on every mechanical landing, and `exclusive.ts` says in
 * its own docblock why a lock wait inside a hook deadline is what a caller under one must avoid. So
 * the first read only asks whether this page has anything to carry, and the answer that lands is
 * read again inside the lock.
 *
 * WHAT THE HINT COSTS IF IT IS WRONG IS ONE LOCK, taken over a page that turned out to have nothing
 * to carry. What reading it inside the lock buys is that no entry another writer landed while this
 * one waited is written back over: the snapshot taken outside was already stale by then, and landing
 * it dropped that entry with nothing saying so.
 */
export function carryReadings(moves: readonly Moved[], pages: readonly string[]): number {
  if (moves.length === 0) return 0
  const byPath = new Map(moves.map((one) => [one.path, one]))
  let carried = 0
  for (const page of pages) {
    if (carryInto(standingOn(page), byPath) === 0) continue
    exclusively(recordPathFor(page), () => {
      const records = standingOn(page)
      const landed = carryInto(records, byPath)
      if (landed === 0) return
      landReadings(page, records)
      carried += landed
    })
  }
  return carried
}

process.on("exit", () => {
  try {
    flushReadings()
  } catch {
  }
})
