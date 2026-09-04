import { closeSync, openSync, readSync, statSync } from "node:fs"
import { akashaObservedOf } from "../../seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "../../seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "../../seat-presence-read/seat-presence-read.module.code.ts"

export const WORKING_KEY = "turn-working"

const TRANSCRIPT_KEY = "transcript-path"

const WINDOW_FROM = 64 * 1024

const WINDOW_CAP = 8 * 1024 * 1024

const WINDOW_GROWS_BY = 4

const ANSWER_ENDED = "end_turn"

const ANSWER_RECORD = "assistant"

export interface TurnWorking {
  readonly activeTurn?: boolean
  readonly scannedTo?: number
}

export interface Answer {
  readonly stopReason: string | null
}

export function anyWorking(working: TurnWorking): boolean {
  return working.activeTurn === true
}

export function anyWorkingRead(working: TurnWorking): boolean {
  return working.activeTurn !== undefined
}

export function keptWorkingIn(said: unknown): TurnWorking {
  if (said === null || typeof said !== "object" || Array.isArray(said)) return {}
  const record = said as { activeTurn?: unknown; scannedTo?: unknown }
  const found: { activeTurn?: boolean; scannedTo?: number } = {}
  if (typeof record.activeTurn === "boolean") found.activeTurn = record.activeTurn
  if (typeof record.scannedTo === "number" && Number.isFinite(record.scannedTo)) {
    found.scannedTo = record.scannedTo
  }
  return found
}

function bytesOf(path: string, from: number, upTo: number): string | null {
  const length = upTo - from
  if (length <= 0) return ""
  let held: number | null = null
  try {
    held = openSync(path, "r")
    const into = Buffer.alloc(length)
    const read = readSync(held, into, 0, length, from)
    return into.toString("utf8", 0, read)
  } catch {
    return null
  } finally {
    if (held !== null) closeSync(held)
  }
}

export function lastAnswerIn(text: string, fromFirstByte: boolean): Answer | null {
  const lines = text.split("\n")
  if (!fromFirstByte) lines.shift()
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    const line = (lines[at] ?? "").trim()
    if (line === "") continue
    let said: unknown
    try {
      said = JSON.parse(line)
    } catch {
      continue
    }
    if (said === null || typeof said !== "object") continue
    const record = said as { type?: unknown; message?: unknown }
    if (record.type !== ANSWER_RECORD) continue
    const message = record.message
    const reason =
      message !== null && typeof message === "object"
        ? (message as { stop_reason?: unknown }).stop_reason
        : null
    return { stopReason: typeof reason === "string" ? reason : null }
  }
  return null
}

function answerAtTail(path: string, size: number, fromFirstByte: boolean): Answer | null {
  let window = fromFirstByte ? size : WINDOW_FROM
  for (;;) {
    const from = Math.max(0, size - window)
    const text = bytesOf(path, from, size)
    if (text === null) return null
    const found = lastAnswerIn(text, from === 0)
    if (found !== null) return found
    if (from === 0 || window >= WINDOW_CAP) return null
    window *= WINDOW_GROWS_BY
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
  if (scannedTo === size && held.activeTurn !== undefined) return held
  const replaced = scannedTo !== undefined && size < scannedTo
  const found = answerAtTail(path, size, replaced)
  if (found === null) return held
  const activeTurn = found.stopReason !== ANSWER_ENDED
  if (held.activeTurn === activeTurn && scannedTo === size) return held
  const read: TurnWorking = { activeTurn, scannedTo: size }
  keepWorking(agent, read)
  return read
}

export function workingLines(working: TurnWorking): readonly string[] {
  const said =
    working.activeTurn === undefined
      ? "— unread"
      : `${working.activeTurn ? "on" : "off"} (read to byte ${working.scannedTo ?? 0})`
  return [`  ${"active-turn".padEnd(15)} ${said}`]
}
