import { closeSync, type FSWatcher, openSync, readSync, statSync, watch } from "node:fs"
import { dirname } from "node:path"
import { akashaSeatIdForName } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaSeatRecordOf } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import type { TakenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { afterExchange } from "akasha/command/argument/pages/after-exchange.argument.ts"
import { seat } from "akasha/command/argument/pages/seat.argument.ts"
import { waitSeconds } from "akasha/command/argument/pages/wait-seconds.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { seatTranscriptFollow as page } from "akasha/command/pages/seat/transcript-follow/seat-transcript-follow.command.ts"

const TRANSCRIPT_KEY = "transcript-path"

const ASKED_RECORD = "user"

const ANSWER_RECORD = "assistant"

const TEXT_BLOCK = "text"

const TYPE = "type"

const MESSAGE = "message"

const CONTENT = "content"

const ORIGIN = "origin"

const ORIGIN_KIND = "kind"

const PERSON = "human"

const SIDECHAIN = "isSidechain"

const UUID = "uuid"

const LINE_END = 10

const SETTLE_MS = 40

const SWEEP_MS = 1000

const A_SECOND = 1000

const PAGES = [seat, afterExchange, waitSeconds]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export interface Exchange {
  readonly uuid: string
  readonly said: string
  readonly replied: string
}

export interface Scanned {
  readonly readTo: number
  readonly text: string
}

export type Where = () => string | null

export type Reading = (from: number, upTo: number) => Scanned | null

type Held = Record<string, unknown>

type Asked = { readonly uuid: string; readonly said: string }

export const NOTHING_SCANNED: Scanned = { readTo: 0, text: "" }

function heldIn(line: string): Held | null {
  if (line.trim() === "") return null
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = said as Held
  return typeof held[TYPE] === "string" ? held : null
}

function messageIn(held: Held): Held | null {
  const found = held[MESSAGE]
  if (found === null || typeof found !== "object" || Array.isArray(found)) return null
  return found as Held
}

function asideOf(held: Held): boolean {
  return held[SIDECHAIN] === true
}

function textOf(content: unknown): string {
  if (!Array.isArray(content)) return ""
  const found: string[] = []
  for (const block of content) {
    if (block === null || typeof block !== "object" || Array.isArray(block)) continue
    const one = block as Held
    if (one[TYPE] !== TEXT_BLOCK) continue
    const said = one[TEXT_BLOCK]
    if (typeof said === "string" && said.trim() !== "") found.push(said)
  }
  return found.join("\n")
}

function fromPerson(held: Held): boolean {
  const found = held[ORIGIN]
  if (found === null || typeof found !== "object" || Array.isArray(found)) return false
  return (found as Held)[ORIGIN_KIND] === PERSON
}

function askedIn(held: Held): Asked | null {
  if (held[TYPE] !== ASKED_RECORD || asideOf(held) || !fromPerson(held)) return null
  const message = messageIn(held)
  if (message === null) return null
  const content = message[CONTENT]
  if (typeof content !== "string" || content.trim() === "") return null
  const uuid = held[UUID]
  return typeof uuid === "string" && uuid !== "" ? { uuid, said: content } : null
}

function answeredIn(held: Held): string | null {
  if (held[TYPE] !== ANSWER_RECORD || asideOf(held)) return null
  const message = messageIn(held)
  if (message === null) return null
  return textOf(message[CONTENT])
}

export function exchangesIn(text: string, cursor: string | null): readonly Exchange[] {
  const every: Exchange[] = []
  let asked: Asked | null = null
  let replies: string[] = []
  const closing = (): undefined => {
    const turn = asked
    const replied = replies.join("\n")
    asked = null
    replies = []
    if (turn === null) return
    every.push({ uuid: turn.uuid, said: turn.said, replied })
  }
  for (const line of text.split("\n")) {
    const held = heldIn(line)
    if (held === null) continue
    const next = askedIn(held)
    if (next !== null) {
      closing()
      asked = next
      continue
    }
    if (asked === null) continue
    const heard = answeredIn(held)
    if (heard !== null && heard !== "") replies.push(heard)
  }
  const at = cursor === null ? -1 : every.findIndex((exchange) => exchange.uuid === cursor)
  return at < 0 ? every : every.slice(at + 1)
}

function sizeOf(path: string): number | null {
  const found = statSync(path, { throwIfNoEntry: false })
  return found === undefined ? null : found.size
}

function wholeLinesFrom(path: string, from: number, upTo: number): Scanned | null {
  const length = upTo - from
  if (length <= 0) return null
  let opened: number | null = null
  try {
    opened = openSync(path, "r")
    const into = Buffer.alloc(length)
    const got = readSync(opened, into, 0, length, from)
    const ends = into.subarray(0, got).lastIndexOf(LINE_END)
    if (ends < 0) return null
    return { readTo: from + ends + 1, text: into.toString("utf8", 0, ends + 1) }
  } catch {
    return null
  } finally {
    if (opened !== null) closeSync(opened)
  }
}

export function scannedAfter(was: Scanned, size: number, reading: Reading): Scanned {
  const afresh = size < was.readTo
  const from = afresh ? 0 : was.readTo
  const before = afresh ? "" : was.text
  const found = size <= from ? null : reading(from, size)
  if (found === null) return { readTo: from, text: before }
  return { readTo: found.readTo, text: before + found.text }
}

export function scanning(where: Where): () => string {
  let scanned = NOTHING_SCANNED
  let last: string | null = null
  return () => {
    const path = where()
    if (path === null) return scanned.text
    if (path !== last) {
      scanned = NOTHING_SCANNED
      last = path
    }
    const size = sizeOf(path)
    if (size === null) return scanned.text
    scanned = scannedAfter(scanned, size, (from, upTo) => wholeLinesFrom(path, from, upTo))
    return scanned.text
  }
}

export async function followed(
  where: Where,
  cursor: string | null,
  waitMs: number,
  settleMs: number = SETTLE_MS
): Promise<readonly Exchange[]> {
  const scan = scanning(where)
  const first = exchangesIn(scan(), cursor)
  if (first.length > 0 || waitMs <= 0) return first
  return await new Promise<readonly Exchange[]>((answer) => {
    const watchers = new Map<string, FSWatcher>()
    let settling: ReturnType<typeof setTimeout> | null = null
    let done = false
    const ending = (found: readonly Exchange[]): undefined => {
      if (done) return
      done = true
      if (settling !== null) clearTimeout(settling)
      clearInterval(sweeping)
      clearTimeout(upTo)
      for (const watcher of watchers.values()) watcher.close()
      answer(found)
    }
    const waking = (): undefined => {
      if (settling !== null) clearTimeout(settling)
      settling = setTimeout(looking, settleMs)
    }
    const following = (): undefined => {
      const path = where()
      if (path === null) return
      const dir = dirname(path)
      if (watchers.has(dir)) return
      try {
        watchers.set(
          dir,
          watch(dir, () => waking())
        )
      } catch {
        watchers.delete(dir)
      }
    }
    const looking = (): undefined => {
      if (done) return
      const found = exchangesIn(scan(), cursor)
      following()
      if (found.length > 0) ending(found)
    }
    const sweeping = setInterval(looking, SWEEP_MS)
    const upTo = setTimeout(() => ending([]), waitMs)
    following()
  })
}

function pathFor(name: string): string | null {
  const id = akashaSeatIdForName(name)
  if (id === null) return null
  const held = akashaSeatRecordOf(id, TRANSCRIPT_KEY)
  return held === null || held.value === "" ? null : held.value
}

export function saidOf(exchanges: readonly Exchange[]): string {
  return JSON.stringify({ exchanges })
}

async function answered(taken: Taken): Promise<Answer> {
  const name = taken.seat
  if (akashaSeatIdForName(name) === null) {
    return refused(`\`${name}\` is no seat akasha files a page for`, INPUT)
  }
  if (pathFor(name) === null) {
    return refused(
      `the seat \`${name}\` has no transcript beside its page, so there is nothing to follow`,
      DATA
    )
  }
  const found = await followed(
    () => pathFor(name),
    taken.afterExchange ?? null,
    taken.waitSeconds * A_SECOND
  )
  return told([saidOf(found)])
}

export async function seatTranscriptFollow(argv: readonly string[], given: Given): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, answered)
}
