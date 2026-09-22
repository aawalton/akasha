import { closeSync, openSync, readdirSync, readSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { readTranscriptSessionId } from "akasha/agent/claude-code/session/modules/session-jsonl/session-jsonl.module.code.ts"
import { akashaSeatsThatExist } from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "akasha/agent/seat/page/modules/seat-akasha-read/seat-akasha-read.module.code.ts"
import {
  TRANSCRIPT_KEY,
  transcriptOf,
} from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import { sessionOf } from "akasha/agent/seat/session/seat-session.module.code.ts"

export const SETTLED_MS = 60_000

const HEAD_LINES = 16

const HEAD_BYTES = 262_144

const SUFFIX = ".jsonl"

export interface TranscriptCandidate {
  readonly path: string
  readonly mtimeMs: number
  readonly firstTimestampMs: number | null
}

export interface RotationReading {
  readonly statedPath: string | null
  readonly statedMtimeMs: number | null
  readonly nowMs: number
  readonly candidates: readonly TranscriptCandidate[]
  readonly takenPaths: readonly string[]
}

export interface MisnamedReading {
  readonly statedPath: string | null
  readonly statedSession: string | null
  readonly ownSession: string | null
  readonly ownPath: string | null
  readonly otherSessions: readonly string[]
}

export function misnamedFrom(reading: MisnamedReading): string | null {
  const { statedPath, statedSession, ownSession, ownPath, otherSessions } = reading
  if (statedPath === null || statedSession === null || ownSession === null) return null
  if (statedSession === ownSession) return null
  if (!otherSessions.includes(statedSession)) return null
  return ownPath === null || ownPath === statedPath ? null : ownPath
}

export function rotationFrom(reading: RotationReading): string | null {
  const { statedPath, statedMtimeMs, nowMs, candidates, takenPaths } = reading
  if (statedPath === null || statedMtimeMs === null) return null
  if (nowMs - statedMtimeMs < SETTLED_MS) return null
  const taken = new Set(takenPaths)
  const left = candidates.filter(
    (one) =>
      one.mtimeMs > statedMtimeMs &&
      !taken.has(one.path) &&
      one.firstTimestampMs !== null &&
      one.firstTimestampMs >= statedMtimeMs
  )
  const only = left[0]
  return left.length === 1 && only !== undefined ? only.path : null
}

function headTextOf(path: string): string {
  const file = openSync(path, "r")
  try {
    const held = new Uint8Array(HEAD_BYTES)
    const got = readSync(file, held, 0, HEAD_BYTES, 0)
    const lines = new TextDecoder().decode(held.subarray(0, got)).split("\n")
    if (got === HEAD_BYTES) lines.pop()
    return lines.slice(0, HEAD_LINES).join("\n")
  } finally {
    closeSync(file)
  }
}

function parseRecordTimestamp(held: unknown): number | null {
  if (held === null || typeof held !== "object") return null
  const said = (held as Record<string, unknown>).timestamp
  if (typeof said !== "string") return null
  const ms = Date.parse(said)
  return Number.isFinite(ms) ? ms : null
}

function firstTimestampIn(text: string): number | null {
  for (const line of text.split("\n")) {
    if (line === "") continue
    let ms: number | null = null
    try {
      const held: unknown = JSON.parse(line)
      ms = parseRecordTimestamp(held)
    } catch {
      continue
    }
    if (ms !== null) return ms
  }
  return null
}

export function firstTimestampOf(path: string): number | null {
  return firstTimestampIn(headTextOf(path))
}

function sessionStatedIn(path: string): string | null {
  try {
    return readTranscriptSessionId(headTextOf(path))
  } catch {
    return null
  }
}

function pathsSeatsName(): readonly string[] {
  const named: string[] = []
  for (const [id] of akashaSeatsThatExist()) {
    const observed = akashaObservedOf(id)
    if (observed === null) continue
    const said = observed[TRANSCRIPT_KEY]
    if (typeof said === "string" && said !== "") named.push(said)
  }
  return named
}

function sessionsOtherSeatsState(agent: string): readonly string[] {
  const held: string[] = []
  for (const [id] of akashaSeatsThatExist()) {
    if (id === agent) continue
    const session = sessionOf(id)
    if (session !== null) held.push(session.value)
  }
  return held
}

function besideNamed(statedPath: string, session: string): string | null {
  const path = join(dirname(statedPath), `${session}${SUFFIX}`)
  return statSync(path, { throwIfNoEntry: false }) === undefined ? null : path
}

function candidatesBeside(
  statedPath: string,
  statedMtimeMs: number
): readonly TranscriptCandidate[] {
  const found: TranscriptCandidate[] = []
  for (const entry of readdirSync(dirname(statedPath), { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(SUFFIX)) continue
    const path = join(dirname(statedPath), entry.name)
    if (path === statedPath) continue
    const at = statSync(path, { throwIfNoEntry: false })
    if (at === undefined || at.mtimeMs <= statedMtimeMs) continue
    found.push({ path, mtimeMs: at.mtimeMs, firstTimestampMs: firstTimestampOf(path) })
  }
  return found
}

export function rotatedTranscriptFor(agent: string): string | null {
  const stated = transcriptOf(agent)
  if (stated === null) return null
  const at = statSync(stated.value, { throwIfNoEntry: false })
  if (at === undefined) return null
  const ownSession = sessionOf(agent)?.value ?? null
  const back = misnamedFrom({
    statedPath: stated.value,
    statedSession: sessionStatedIn(stated.value),
    ownSession,
    ownPath: ownSession === null ? null : besideNamed(stated.value, ownSession),
    otherSessions: sessionsOtherSeatsState(agent),
  })
  if (back !== null) return back
  return rotationFrom({
    statedPath: stated.value,
    statedMtimeMs: at.mtimeMs,
    nowMs: Date.now(),
    candidates: candidatesBeside(stated.value, at.mtimeMs),
    takenPaths: pathsSeatsName(),
  })
}
