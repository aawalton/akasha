
import { readFileSync, statSync } from "node:fs"
import { difference } from "../repo/difference.ts"
import { blobId, readBlob } from "../repo/git.ts"
import { countLines, type Reading, type Span } from "./read-log.ts"
import { isGeneratedFile } from "../generated-file/generated-file.ts"
import { decodeUtf8, leadingBytes } from "./command/read/utf8-body.ts"

function whenText(at: number): string {
  return new Date(at).toISOString().replace("T", " ").slice(0, 19)
}

function numbered(body: string): string {
  const lines = body.split("\n")
  if (lines[lines.length - 1] === "") lines.pop()
  return lines.map((line, at) => `${String(at + 1).padStart(6)}\t${line}`).join("\n")
}

function notText(bytes: Uint8Array): string {
  return (
    `${bytes.length} bytes that are not UTF-8 text, beginning \`${leadingBytes(bytes)}\`, so a body printed ` +
    `here would be U+FFFD wherever this file is not text rather than the file itself`
  )
}

function madeWhole(bytes: Uint8Array): string {
  return (
    `${bytes.length} bytes a command wrote whole from something else, so what a body printed here would cost ` +
    `you is what its generator emitted rather than anything an author chose`
  )
}

function firstGap(spans: readonly Span[], lines: number): number | null {
  if (lines === 0) return null
  let covered = 0
  for (const [start, end] of spans) {
    if (start > covered + 1) break
    covered = Math.max(covered, end)
  }
  return covered >= lines ? null : covered + 1
}

interface Snapshot {
  readonly at: number
  readonly bytes: Uint8Array
}

function snapshot(absolute: string): Snapshot | null {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const at = statSync(absolute).mtimeMs
    const bytes = readFileSync(absolute)
    if (statSync(absolute).mtimeMs === at) return { at, bytes }
  }
  return null
}

export interface Emission {
  readonly headline: string
  readonly body: string | null
  readonly record: { readonly at: number; readonly span: Span; readonly blob: string } | null
}

export interface Request {
  readonly named: string
  readonly absolute: string
  readonly reading: Reading | null
  readonly forced: boolean
  readonly root: string
  readonly workspace: string
}

function relativeTo(root: string, absolute: string): string {
  return absolute.startsWith(`${root}/`) ? absolute.slice(root.length + 1) : absolute
}

export function readOne(request: Request): Emission {
  const { named, absolute, reading } = request
  const shot = snapshot(absolute)
  if (shot === null) {
    const moved = readFileSync(absolute)
    const text = decodeUtf8(moved)
    const said = `${named} — it moved while it was being read, so nothing was recorded of it`
    if (text === null) {
      return { headline: `${said}, and it is ${notText(moved)}; nothing follows`, body: null, record: null }
    }
    return { headline: `${said}; the whole file follows`, body: numbered(text), record: null }
  }
  const body = new TextDecoder().decode(shot.bytes)
  const lines = countLines(body)
  const record = { at: shot.at, span: [1, Math.max(1, lines)] as Span, blob: blobId(shot.bytes) }
  const whole = (why: string): Emission => ({
    headline: `${named} — ${why}; the whole file follows, ${lines} lines`,
    body: lines === 0 ? null : numbered(body),
    record,
  })
  const nothing = (why: string): Emission => ({
    headline: `${named} — ${why}; nothing follows`,
    body: null,
    record,
  })

  if (decodeUtf8(shot.bytes) === null) return nothing(`${notText(shot.bytes)}, and it is recorded as read whole`)
  if (isGeneratedFile(relativeTo(request.root, absolute), body)) {
    return nothing(`${madeWhole(shot.bytes)}, and it is recorded as read whole`)
  }
  if (request.forced) return whole("the whole file, as `--full` asks")
  if (reading === null) return whole("nothing on record says you have read it")
  const since = whenText(reading.at)
  if (reading.at === shot.at) {
    const gap = firstGap(reading.spans, lines)
    if (gap === null) return nothing(`unchanged since you read it at ${since}, and you have read all ${lines} lines`)
    return whole(`unchanged since you read it at ${since}, but line ${gap} of ${lines} onward was never in front of you`)
  }
  const changed = `changed since you read it at ${since}`
  if (reading.blob === null) return whole(`${changed}, and nothing recorded which body you saw then`)
  const prior = readBlob(request.root, reading.blob)
  if (prior === null) {
    return whole(`${changed}, and the body you read reached no commit, so it cannot be recovered`)
  }
  const was = new TextDecoder().decode(prior)
  const priorLines = countLines(was)
  const gap = firstGap(reading.spans, priorLines)
  if (gap !== null) {
    return whole(
      `${changed}, and of that body you had seen only to line ${gap - 1} of ${priorLines}, so a difference would describe lines you never read`
    )
  }
  if (reading.blob === record.blob) {
    return nothing(`its timestamp moved, but its ${lines} lines are exactly what you read at ${since}`)
  }
  const diff = difference(was, body, request.workspace)
  if (diff === null) return whole(`${changed}, and git would not produce a difference for it`)
  if (diff.length >= numbered(body).length) {
    return whole(`${changed}, and what moved is no smaller than the file it moved in`)
  }
  return {
    headline: `${named} — ${changed}; ${lines} lines now, and the difference from what you last read follows`,
    body: diff,
    record,
  }
}
