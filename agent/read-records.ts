
import { existsSync, readFileSync } from "node:fs"

export type Span = readonly [number, number]

export type Entry = {
  at: number
  spans: Span[]
  blob?: string
  seen?: number
  mechanical?: string
}
export type Records = Record<string, Entry>

function spanOf(value: unknown): Span | null {
  if (!Array.isArray(value)) return null
  const [start, end] = value as readonly unknown[]
  return typeof start === "number" && typeof end === "number" ? [start, end] : null
}

function entryOf(value: unknown): Entry | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { at, spans, blob, seen, via, mechanical } = value as {
    at?: unknown
    spans?: unknown
    blob?: unknown
    seen?: unknown
    via?: unknown
    mechanical?: unknown
  }
  if (typeof at !== "number" || !Number.isFinite(at) || !Array.isArray(spans)) return null
  const kept: Span[] = []
  for (const raw of spans) {
    const span = spanOf(raw)
    if (span === null) return null
    kept.push(span)
  }
  const entry: Entry = { at, spans: kept }
  if (typeof blob === "string" && blob !== "") entry.blob = blob
  if (typeof seen === "number" && Number.isFinite(seen)) entry.seen = seen
  if (typeof mechanical === "string" && mechanical !== "") entry.mechanical = mechanical
  if (via === "notify") return null
  return entry
}

export function recordsOf(parsed: unknown): Records {
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return {}
  const records: Records = {}
  for (const [file, value] of Object.entries(parsed as Record<string, unknown>)) {
    const entry = entryOf(value)
    if (entry !== null) records[file] = entry
  }
  return records
}

export function merge(spans: readonly Span[]): Span[] {
  const sorted = [...spans].sort((a, b) => a[0] - b[0])
  const out: Span[] = []
  for (const span of sorted) {
    const last = out[out.length - 1]
    if (last !== undefined && span[0] <= last[1] + 1) {
      out[out.length - 1] = [last[0], Math.max(last[1], span[1])]
      continue
    }
    out.push(span)
  }
  return out
}

export function coveredTo(spans: readonly Span[]): number {
  let covered = 0
  for (const [start, end] of merge(spans)) {
    if (start > covered + 1) break
    covered = Math.max(covered, end)
  }
  return covered
}

export function loadPath(path: string): Records {
  if (!existsSync(path)) return {}
  try {
    return recordsOf(JSON.parse(readFileSync(path, "utf8")) as unknown)
  } catch {
    return {}
  }
}
