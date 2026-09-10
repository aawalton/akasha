import { closeSync, openSync, readdirSync, readSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { akashaSeatsThatExist } from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import {
  TRANSCRIPT_KEY,
  transcriptOf,
} from "../seat-transcript-path/seat-transcript-path.module.code.ts"

export const SETTLED_MS = 60_000

export const HEAD_LINES = 16

export const HEAD_BYTES = 262_144

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

function headLinesOf(path: string): readonly string[] {
  const file = openSync(path, "r")
  try {
    const held = new Uint8Array(HEAD_BYTES)
    const got = readSync(file, held, 0, HEAD_BYTES, 0)
    const lines = new TextDecoder().decode(held.subarray(0, got)).split("\n")
    if (got === HEAD_BYTES) lines.pop()
    return lines.slice(0, HEAD_LINES)
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

export function firstTimestampOf(path: string): number | null {
  for (const line of headLinesOf(path)) {
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
  return rotationFrom({
    statedPath: stated.value,
    statedMtimeMs: at.mtimeMs,
    nowMs: Date.now(),
    candidates: candidatesBeside(stated.value, at.mtimeMs),
    takenPaths: pathsSeatsName(),
  })
}
