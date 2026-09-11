import { closeSync, openSync, readSync, statSync } from "node:fs"
import { akashaObservedOf } from "akasha/seat-system/seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "akasha/seat-system/seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"

export const WORKING_KEY = "turn-working"

const TRANSCRIPT_KEY = "transcript-path"

const ANSWER_ENDED = "end_turn"

const ANSWER_RECORD = "assistant"

const ASKED_RECORD = "user"

const INTERRUPTED_BY_USER = "[Request interrupted by user]"

const TASK_ID_FROM = "<task-id>"

const TASK_ID_TO = "</task-id>"

const LINE_END = 10

export interface TurnWorking {
  readonly activeTurn?: boolean
  readonly scannedTo?: number
  readonly openShells?: readonly string[]
}

export interface Answer {
  readonly kind: string
  readonly stopReason: string | null
  readonly interrupted?: boolean
}

export interface TurnScan {
  readonly answer: Answer | null
  readonly openShells: readonly string[]
}

export function turnEnded(answer: Answer): boolean {
  if (answer.interrupted === true) return true
  return answer.kind === ANSWER_RECORD && answer.stopReason === ANSWER_ENDED
}

export function anyWorking(working: TurnWorking): boolean {
  return working.activeTurn === true
}

export function anyWorkingRead(working: TurnWorking): boolean {
  return working.activeTurn !== undefined
}

export function anyLiveShell(working: TurnWorking): boolean {
  return (working.openShells ?? []).length > 0
}

export function withNothingOpen(working: TurnWorking): TurnWorking {
  return { ...working, openShells: [] }
}

export function takeOpenShells(agent: string): boolean {
  const observed = akashaObservedOf(agent)
  if (observed === null) return false
  const held = keptWorkingIn(observed[WORKING_KEY])
  if (!anyLiveShell(held)) return false
  return keepWorking(agent, withNothingOpen(held))
}

function idsIn(said: unknown): readonly string[] | null {
  if (!Array.isArray(said)) return null
  return said.filter((one): one is string => typeof one === "string" && one !== "")
}

export function keptWorkingIn(said: unknown): TurnWorking {
  if (said === null || typeof said !== "object" || Array.isArray(said)) return {}
  const record = said as {
    activeTurn?: unknown
    scannedTo?: unknown
    openShells?: unknown
  }
  const found: {
    activeTurn?: boolean
    scannedTo?: number
    openShells?: readonly string[]
  } = {}
  if (typeof record.activeTurn === "boolean") found.activeTurn = record.activeTurn
  if (typeof record.scannedTo === "number" && Number.isFinite(record.scannedTo)) {
    found.scannedTo = record.scannedTo
  }
  const shells = idsIn(record.openShells)
  if (shells !== null) found.openShells = shells
  return found
}

export function shellStartedIn(said: unknown): string | null {
  if (said === null || typeof said !== "object") return null
  const record = said as { backgroundTaskId?: unknown }
  if (typeof record.backgroundTaskId !== "string" || record.backgroundTaskId === "") return null
  return record.backgroundTaskId
}

export function taskEndedIn(body: string): string | null {
  const from = body.indexOf(TASK_ID_FROM)
  if (from < 0) return null
  const upTo = body.indexOf(TASK_ID_TO, from)
  if (upTo < 0) return null
  const id = body.slice(from + TASK_ID_FROM.length, upTo)
  return id === "" ? null : id
}

export function taskStoppedIn(said: unknown): string | null {
  if (said === null || typeof said !== "object") return null
  const record = said as { task_id?: unknown; task_type?: unknown }
  if (typeof record.task_id !== "string" || record.task_id === "") return null
  return typeof record.task_type === "string" ? record.task_id : null
}

function bodyOf(record: { message?: unknown; content?: unknown }): string {
  if (typeof record.content === "string") return record.content
  const message = record.message
  if (message === null || typeof message !== "object") return ""
  const inner = (message as { content?: unknown }).content
  return typeof inner === "string" ? inner : ""
}

function textIn(said: unknown): string {
  if (typeof said === "string") return said
  if (!Array.isArray(said)) return ""
  let text = ""
  for (const block of said) {
    if (block === null || typeof block !== "object") continue
    const one = (block as { text?: unknown }).text
    if (typeof one === "string") text += one
  }
  return text
}

export function interruptedIn(record: { message?: unknown; content?: unknown }): boolean {
  const message = record.message
  const held =
    message !== null && typeof message === "object"
      ? (message as { content?: unknown }).content
      : record.content
  return textIn(held).includes(INTERRUPTED_BY_USER)
}

function answerOf(record: { type?: unknown; message?: unknown; content?: unknown }): Answer | null {
  const kind = record.type
  if (kind !== ANSWER_RECORD && kind !== ASKED_RECORD) return null
  const message = record.message
  const reason =
    message !== null && typeof message === "object"
      ? (message as { stop_reason?: unknown }).stop_reason
      : null
  return {
    kind,
    stopReason: typeof reason === "string" ? reason : null,
    interrupted: kind === ASKED_RECORD && interruptedIn(record),
  }
}

interface TranscriptRecord {
  readonly type?: unknown
  readonly message?: unknown
  readonly content?: unknown
  readonly toolUseResult?: unknown
}

function parseTranscriptRecord(held: unknown): TranscriptRecord | null {
  if (held === null || typeof held !== "object") return null
  return held as TranscriptRecord
}

export function scanRecords(text: string, was: TurnWorking): TurnScan {
  const shells = new Set(was.openShells ?? [])
  let answer: Answer | null = null
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    let record: TranscriptRecord | null = null
    try {
      const said: unknown = JSON.parse(line)
      record = parseTranscriptRecord(said)
    } catch {
      continue
    }
    if (record === null) continue
    const began = shellStartedIn(record.toolUseResult)
    if (began !== null) shells.add(began)
    const done = taskEndedIn(bodyOf(record)) ?? taskStoppedIn(record.toolUseResult)
    if (done !== null) shells.delete(done)
    const heard = answerOf(record)
    if (heard !== null) answer = heard
  }
  return { answer, openShells: [...shells] }
}

function bytesOf(path: string, from: number, upTo: number): Buffer | null {
  const length = upTo - from
  if (length <= 0) return Buffer.alloc(0)
  let held: number | null = null
  try {
    held = openSync(path, "r")
    const into = Buffer.alloc(length)
    const read = readSync(held, into, 0, length, from)
    return into.subarray(0, read)
  } catch {
    return null
  } finally {
    if (held !== null) closeSync(held)
  }
}

function keepWorking(agent: string, working: TurnWorking): boolean {
  const seat = seatNameForAgent(agent)
  if (seat === null) return false
  try {
    keepBesideUnder(seat, WORKING_KEY, { ...working })
    return true
  } catch {
    return false
  }
}

export function workingOf(agent: string): TurnWorking {
  if (agent === "") return {}
  const observed = akashaObservedOf(agent)
  if (observed === null) return {}
  const held = keptWorkingIn(observed[WORKING_KEY])
  const path = observed[TRANSCRIPT_KEY]
  if (typeof path !== "string" || path === "") return held
  let size: number
  try {
    size = statSync(path).size
  } catch {
    return held
  }
  const { scannedTo } = held
  if (scannedTo === size && held.activeTurn !== undefined && held.openShells !== undefined) {
    return held
  }
  const fresh = scannedTo === undefined || size < scannedTo || held.openShells === undefined
  const from = fresh ? 0 : (scannedTo ?? 0)
  const bytes = bytesOf(path, from, size)
  if (bytes === null) return held
  const ends = bytes.lastIndexOf(LINE_END)
  if (ends < 0) return held
  const whole = bytes.subarray(0, ends + 1)
  const was = fresh ? {} : held
  const found = scanRecords(whole.toString("utf8"), was)
  const activeTurn = found.answer === null ? was.activeTurn : !turnEnded(found.answer)
  const read: TurnWorking = {
    ...(activeTurn === undefined ? {} : { activeTurn }),
    scannedTo: from + whole.length,
    openShells: found.openShells,
  }
  keepWorking(agent, read)
  return read
}
