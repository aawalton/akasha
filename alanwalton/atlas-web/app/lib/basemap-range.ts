import { z } from "zod"

export const MAX_RANGE_BYTES = 4 * 1024 * 1024

export type RangeVerdict =
  | { ok: true; range: string }
  | { ok: false; status: 400 | 416; message: string }

const BYTES_PREFIX = "bytes="

const DIGITS = z
  .string()
  .regex(/^\d+$/)
  .transform((s) => Number(s))
const BYTE_PAIR = z.tuple([DIGITS, DIGITS])
const BYTE_SUFFIX = z.tuple([z.literal(""), DIGITS])

export function checkBasemapRange(header: string | null, maxBytes = MAX_RANGE_BYTES): RangeVerdict {
  if (header === null) {
    return { ok: false, status: 400, message: "Range header required for this resource" }
  }
  const trimmed = header.trim()
  if (!trimmed.startsWith(BYTES_PREFIX)) return unsupported(maxBytes)
  const halves = trimmed.slice(BYTES_PREFIX.length).split("-")

  const suffix = BYTE_SUFFIX.safeParse(halves)
  if (suffix.success) {
    const span = suffix.data[1]
    if (span === 0) return { ok: false, status: 416, message: "empty Range" }
    return span > maxBytes ? tooLarge(span, maxBytes) : { ok: true, range: `bytes=-${span}` }
  }

  const pair = BYTE_PAIR.safeParse(halves)
  if (!pair.success) return unsupported(maxBytes)
  const [start, end] = pair.data
  if (end < start) return { ok: false, status: 416, message: "Range end precedes start" }
  const span = end - start + 1
  return span > maxBytes ? tooLarge(span, maxBytes) : { ok: true, range: `bytes=${start}-${end}` }
}

function unsupported(maxBytes: number): RangeVerdict {
  return {
    ok: false,
    status: 416,
    message: `unsupported Range: send one bounded range of at most ${maxBytes} bytes`,
  }
}

function tooLarge(span: number, maxBytes: number): RangeVerdict {
  return {
    ok: false,
    status: 416,
    message: `Range spans ${span} bytes; this resource serves at most ${maxBytes} per request`,
  }
}
