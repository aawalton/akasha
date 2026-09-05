import { closeSync, openSync, readdirSync, readSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { akashaSeatsThatExist } from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import {
  TRANSCRIPT_KEY,
  transcriptOf,
} from "../seat-transcript-path/seat-transcript-path.module.code.ts"

// A seat's session rotates when the agent clears it. Claude Code opens a brand new transcript
// under a new session id and goes on writing there, and the supervisor holding the seat is not
// restarted for it, so nothing notices. The seat keeps naming the file the clear left behind,
// which holds its full size forever, so the reader that rescans on a file shrinking never fires
// and the seat is never read again. What is here answers the file the seat should be naming.
//
// THIS REPAIRS THE READING AND KEEPS NO ROTATED SESSION. Keeping one arms the clear rebind, which
// takes the seat's page and gives the seat a new agent id while the running child keeps the id it
// inherited at exec.

// A transcript nothing has written for this long is finished. Under it the file is as likely to
// be between two records of a turn still being written.
export const SETTLED_MS = 60_000

// The opening records of a transcript carry no timestamp of their own: the session's mode, its
// permission mode, its bridge and its file-history snapshot come first, and how many of them
// there are differs from session to session. The file the alan seat rotated away from carries
// five such records and the file it rotated onto carries three, so a reader taking the first line
// alone answers nothing for either. Reading a handful covers both.
export const HEAD_LINES = 16

// Enough for those records and the turn that follows them, and bounded so a transcript that has
// reached tens of megabytes costs one read of this size.
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

// WHICH FILE A SEAT SHOULD BE NAMING, decided from the reading alone so the rule is provable with
// no disk under it. Nothing is answered wherever the reading leaves a doubt: two seats clearing
// together, or one seat starting up beside another, must move nothing rather than guess which of
// them the new file belongs to.
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

// The opening bytes of a file as whole lines. The final piece is broken off mid-record wherever
// the file runs past what was read, so it is dropped rather than parsed.
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

// WHEN A TRANSCRIPT'S FIRST STAMPED RECORD WAS WRITTEN. The timestamp is read off the top of a
// record and never out of anything nested in it, because the file-history snapshot that precedes
// the first turn carries one of its own that is not the record's.
export function firstTimestampOf(path: string): number | null {
  for (const line of headLinesOf(path)) {
    if (line === "") continue
    let held: unknown
    try {
      held = JSON.parse(line)
    } catch {
      continue
    }
    if (held === null || typeof held !== "object") continue
    const said = (held as Record<string, unknown>).timestamp
    if (typeof said !== "string") continue
    const ms = Date.parse(said)
    if (Number.isFinite(ms)) return ms
  }
  return null
}

// Every transcript path a seat in akasha names. A file one of them names is that seat's own, so
// it is never the file this seat rotated onto.
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

// The `.jsonl` files directly beside the one a seat names, newer than it, each with the moment
// its first stamped record was written.
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

// THE TRANSCRIPT A SEAT SHOULD BE READ FROM WHERE THE ONE IT NAMES HAS BEEN SUPERSEDED, and
// nothing where it has not been or where more than one file could be it.
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
