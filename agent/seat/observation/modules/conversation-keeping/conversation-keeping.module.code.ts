import { renameSync, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { akashaSeatsThatExist } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import {
  akashaSeatsDirIn,
  seatPathForName,
} from "akasha/agent/seat/modules/reading/seat-reading.module.code.ts"
import {
  type ConversationEntry,
  conversationBody,
  conversationFrom,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.module.code.ts"
import { bytesOf } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import { conversation } from "akasha/agent/seat/properties/conversation.file-property.ts"
import { leftWhereCodeMoved } from "akasha/infrastructure/service/workstation/modules/code-moving/code-moving.module.code.ts"
import {
  type Following,
  followFolders,
} from "akasha/infrastructure/service/workstation/modules/file-following/file-following.module.code.ts"

import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const TRANSCRIPT_KEY = "transcript-path"

const HELD = "jsonl"

const PART = "part"

const LINE_END = 10

const SETTLE_MS = 100

const SAID_AS = "keep-seat-conversations"

const COMPACTED = Buffer.from('"subtype":"compact_boundary"')

const CHUNK = 4 * 1024 * 1024

export type Kept = {
  readonly transcript: string
  readonly scannedTo: number
  readonly entries: readonly ConversationEntry[]
}

export type BytesOf = (path: string, from: number, upTo: number) => Buffer | null

export type StartOf = (path: string, size: number, read: BytesOf) => number

export function lastCompactionAt(path: string, size: number, read: BytesOf): number {
  let upTo = size
  while (upTo > 0) {
    const from = Math.max(0, upTo - CHUNK)
    const bytes = read(path, from, Math.min(size, upTo + COMPACTED.length))
    if (bytes === null) return 0
    const at = bytes.lastIndexOf(COMPACTED)
    if (at >= 0) return from + bytes.lastIndexOf(LINE_END, at) + 1
    upTo = from
  }
  return 0
}

export function readOn(
  was: Kept | undefined,
  transcript: string,
  size: number,
  read: BytesOf = bytesOf,
  start: StartOf = lastCompactionAt
): Kept | null {
  const kept =
    was !== undefined && was.transcript === transcript && size >= was.scannedTo ? was : undefined
  const from = kept?.scannedTo ?? start(transcript, size, read)
  if (kept !== undefined && from === size) return null
  const bytes = read(transcript, from, size)
  if (bytes === null) return null
  const whole = bytes.subarray(0, bytes.lastIndexOf(LINE_END) + 1)
  if (kept !== undefined && whole.length === 0) return null
  return {
    transcript,
    scannedTo: from + whole.length,
    entries: conversationFrom(whole.toString("utf8"), kept?.entries ?? []),
  }
}

export function changedFrom(was: Kept | undefined, now: Kept): boolean {
  if (was === undefined || was.transcript !== now.transcript) return true
  if (was.entries.length !== now.entries.length) return true
  return was.entries[0] !== now.entries[0]
}

export function conversationAt(seatName: string): string | null {
  return uncommittedBesideAt(seatPathForName(seatName), conversation.propertySlug, HELD)
}

function written(root: string, at: string, body: string): undefined {
  const full = join(root, at)
  const scratch = `${full}.${process.pid}.${PART}`
  writeFileSync(scratch, body, "utf8")
  renameSync(scratch, full)
}

function transcriptOf(id: string): string | null {
  const path = akashaObservedOf(id)?.[TRANSCRIPT_KEY]
  return typeof path === "string" && path !== "" ? path : null
}

function sizeOf(path: string): number | null {
  try {
    return statSync(path).size
  } catch {
    return null
  }
}

function keepSeat(root: string, id: string, name: string, kept: Map<string, Kept>): boolean {
  const transcript = transcriptOf(id)
  if (transcript === null) return false
  const size = sizeOf(transcript)
  if (size === null) return false
  const was = kept.get(id)
  const now = readOn(was, transcript, size)
  if (now === null) return false
  kept.set(id, now)
  if (!changedFrom(was, now)) return false
  const at = conversationAt(name)
  if (at === null) return false
  written(root, at, conversationBody(now.entries))
  return true
}

export function keepEvery(root: string, kept: Map<string, Kept>): number {
  const seats = akashaSeatsThatExist()
  for (const id of [...kept.keys()]) if (!seats.has(id)) kept.delete(id)
  let count = 0
  for (const [id, name] of seats) {
    try {
      if (keepSeat(root, id, name, kept)) count += 1
    } catch (thrown) {
      process.stderr.write(`${SAID_AS}: ${name} was not kept — ${String(thrown)}\n`)
    }
  }
  return count
}

function foldersFollowed(root: string): readonly string[] {
  const found = new Set<string>([akashaSeatsDirIn(root)])
  for (const id of akashaSeatsThatExist().keys()) {
    const transcript = transcriptOf(id)
    if (transcript !== null) found.add(dirname(transcript))
  }
  return [...found].sort()
}

export function watchConversations(root: string): () => undefined {
  const kept = new Map<string, Kept>()
  const followed = new Map<string, Following>()
  const run = (): undefined => {
    keepEvery(root, kept)
    for (const dir of foldersFollowed(root)) {
      if (followed.has(dir)) continue
      const following = followFolders(new Set([dir]), run, SETTLE_MS)
      for (const one of following.unfollowed) {
        process.stderr.write(`${SAID_AS}: nothing is at ${one}, so it is not followed\n`)
      }
      followed.set(dir, following)
    }
    leftWhereCodeMoved()
    return undefined
  }
  run()
  return () => {
    for (const one of followed.values()) one.stop()
    return undefined
  }
}
