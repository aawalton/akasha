import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

export const MEDIA_RANGE_CAP_BYTES = 8 * 1024 * 1024

const CONTENT_RANGE_PATTERN = /^bytes (\d+)-(\d+)\/(\d+)$/
const CONTENT_RANGE_CAPTURES = z.tuple([
  z.coerce.number().int().nonnegative(),
  z.coerce.number().int().nonnegative(),
  z.coerce.number().int().positive(),
])

export type ContentRange = { start: number; end: number; total: number }

export type DownloadProgress = {
  bytesOnDisk: number
  total: number | null
  token: string | null
}

export type DownloadStep =
  | { kind: "fetch"; range: string }
  | { kind: "complete" }
  | { kind: "error"; reason: string }

export type ChunkObservation = {
  status: number
  etag: string | null
  contentRange: ContentRange | null
  bytesReceived: number
}

export type IntegrateResult =
  | { kind: "append"; next: DownloadProgress }
  | { kind: "complete"; next: DownloadProgress }
  | { kind: "restart" }
  | { kind: "error"; reason: string }

export function parseContentRange(header: string | null): ContentRange | null {
  if (header == null) return null
  try {
    const [start, end, total] = requireMatchPositional(
      CONTENT_RANGE_PATTERN,
      CONTENT_RANGE_CAPTURES,
      header.trim()
    )
    if (end < start) return null
    return { start, end, total }
  } catch {
    return null
  }
}

export function shouldResetPartial(bytesOnDisk: number, token: string | null): boolean {
  return bytesOnDisk > 0 && token == null
}

export function planNextStep(
  progress: DownloadProgress,
  cap: number = MEDIA_RANGE_CAP_BYTES
): DownloadStep {
  const { bytesOnDisk, total } = progress
  if (total != null) {
    if (bytesOnDisk === total) return { kind: "complete" }
    if (bytesOnDisk > total) return { kind: "error", reason: "bytes on disk exceed total" }
  }
  const start = bytesOnDisk
  let end = start + cap - 1
  if (total != null) end = Math.min(end, total - 1)
  return { kind: "fetch", range: `bytes=${start}-${end}` }
}

export function integrateChunk(
  progress: DownloadProgress,
  obs: ChunkObservation,
  _cap: number = MEDIA_RANGE_CAP_BYTES
): IntegrateResult {
  if (obs.status === 416) return { kind: "restart" }
  if (obs.status !== 200 && obs.status !== 206) {
    return { kind: "error", reason: `unexpected status ${obs.status}` }
  }
  if (progress.token != null && obs.etag != null && obs.etag !== progress.token) {
    return { kind: "restart" }
  }
  if (obs.contentRange == null && obs.status === 200 && progress.bytesOnDisk > 0) {
    return { kind: "restart" }
  }
  if (obs.bytesReceived <= 0) return { kind: "error", reason: "empty chunk body" }
  const total = obs.contentRange?.total ?? (obs.status === 200 ? obs.bytesReceived : progress.total)
  if (total == null || total <= 0) return { kind: "error", reason: "missing total size" }

  const newBytes = progress.bytesOnDisk + obs.bytesReceived
  if (newBytes > total) return { kind: "error", reason: "chunk overruns total size" }

  const next: DownloadProgress = {
    bytesOnDisk: newBytes,
    total,
    token: progress.token ?? obs.etag,
  }
  return newBytes === total ? { kind: "complete", next } : { kind: "append", next }
}

export function verifyComplete(diskSize: number, total: number | null): boolean {
  return total != null && diskSize === total
}

export function resolveProgressFraction(bytesOnDisk: number, total: number | null): number | null {
  if (total == null || total <= 0) return null
  return Math.min(1, bytesOnDisk / total)
}
