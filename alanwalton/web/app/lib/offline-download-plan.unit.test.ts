import { describe, expect, test } from "bun:test"
import {
  type ChunkObservation,
  type DownloadProgress,
  integrateChunk,
  MEDIA_RANGE_CAP_BYTES,
  parseContentRange,
  planNextStep,
  resolveProgressFraction,
  shouldResetPartial,
  verifyComplete,
} from "./offline-download-plan"

const CAP = MEDIA_RANGE_CAP_BYTES
const TOTAL = CAP * 2 + 1234

function progress(over: Partial<DownloadProgress> = {}): DownloadProgress {
  return { bytesOnDisk: 0, total: null, token: null, ...over }
}

function obs(over: Partial<ChunkObservation> = {}): ChunkObservation {
  return { status: 206, etag: '"abc-3"', contentRange: null, bytesReceived: 0, ...over }
}

describe("parseContentRange", () => {
  test("parses a resolved bytes start-end/total header", () => {
    expect(parseContentRange("bytes 0-8388607/20000000")).toEqual({
      start: 0,
      end: 8388607,
      total: 20000000,
    })
  })

  test("tolerates surrounding whitespace", () => {
    expect(parseContentRange("  bytes 100-199/500  ")).toEqual({ start: 100, end: 199, total: 500 })
  })

  test("returns null for the unsatisfied bytes */total form", () => {
    expect(parseContentRange("bytes */20000000")).toBeNull()
  })

  test("returns null for a missing or malformed header", () => {
    expect(parseContentRange(null)).toBeNull()
    expect(parseContentRange("")).toBeNull()
    expect(parseContentRange("20-10/500")).toBeNull()
  })

  test("returns null when end precedes start or total is zero", () => {
    expect(parseContentRange("bytes 200-100/500")).toBeNull()
    expect(parseContentRange("bytes 0-0/0")).toBeNull()
  })
})

describe("shouldResetPartial", () => {
  test("resets when bytes on disk have no verifying token", () => {
    expect(shouldResetPartial(1024, null)).toBe(true)
  })

  test("does not reset a zero-length partial", () => {
    expect(shouldResetPartial(0, null)).toBe(false)
  })

  test("does not reset when a token is present", () => {
    expect(shouldResetPartial(1024, '"abc-3"')).toBe(false)
  })
})

describe("planNextStep", () => {
  test("first request asks for bytes=0-(cap-1)", () => {
    expect(planNextStep(progress())).toEqual({ kind: "fetch", range: `bytes=0-${CAP - 1}` })
  })

  test("mid-download request continues from the disk offset, clamped to total-1", () => {
    expect(planNextStep(progress({ bytesOnDisk: CAP, total: TOTAL }))).toEqual({
      kind: "fetch",
      range: `bytes=${CAP}-${2 * CAP - 1}`,
    })
  })

  test("final short chunk clamps end to total-1", () => {
    expect(planNextStep(progress({ bytesOnDisk: 2 * CAP, total: TOTAL }))).toEqual({
      kind: "fetch",
      range: `bytes=${2 * CAP}-${TOTAL - 1}`,
    })
  })

  test("complete when disk bytes equal total", () => {
    expect(planNextStep(progress({ bytesOnDisk: TOTAL, total: TOTAL }))).toEqual({
      kind: "complete",
    })
  })

  test("error when disk bytes exceed total", () => {
    const step = planNextStep(progress({ bytesOnDisk: TOTAL + 1, total: TOTAL }))
    expect(step.kind).toBe("error")
  })
})

describe("integrateChunk", () => {
  test("first 206 adopts the ETag and advances, reporting append when more remains", () => {
    const result = integrateChunk(
      progress(),
      obs({
        status: 206,
        etag: '"v1-3"',
        contentRange: { start: 0, end: CAP - 1, total: TOTAL },
        bytesReceived: CAP,
      })
    )
    expect(result).toEqual({
      kind: "append",
      next: { bytesOnDisk: CAP, total: TOTAL, token: '"v1-3"' },
    })
  })

  test("keeps the originally-adopted token across later chunks", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: CAP, total: TOTAL, token: '"v1-3"' }),
      obs({
        status: 206,
        etag: '"v1-3"',
        contentRange: { start: CAP, end: 2 * CAP - 1, total: TOTAL },
        bytesReceived: CAP,
      })
    )
    expect(result.kind).toBe("append")
    if (result.kind === "append") expect(result.next.bytesOnDisk).toBe(2 * CAP)
  })

  test("reports complete when the final chunk reaches total exactly", () => {
    const start = 2 * CAP
    const result = integrateChunk(
      progress({ bytesOnDisk: start, total: TOTAL, token: '"v1-3"' }),
      obs({
        status: 206,
        etag: '"v1-3"',
        contentRange: { start, end: TOTAL - 1, total: TOTAL },
        bytesReceived: TOTAL - start,
      })
    )
    expect(result).toEqual({
      kind: "complete",
      next: { bytesOnDisk: TOTAL, total: TOTAL, token: '"v1-3"' },
    })
  })

  test("whole-object 200 from a zero offset completes in one shot", () => {
    const small = 4096
    const result = integrateChunk(
      progress(),
      obs({ status: 200, etag: '"w-1"', contentRange: null, bytesReceived: small })
    )
    expect(result).toEqual({
      kind: "complete",
      next: { bytesOnDisk: small, total: small, token: '"w-1"' },
    })
  })

  test("restarts on an ETag mismatch (object re-rendered mid-download)", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: CAP, total: TOTAL, token: '"v1-3"' }),
      obs({
        status: 206,
        etag: '"v2-3"',
        contentRange: { start: CAP, end: 2 * CAP - 1, total: TOTAL },
        bytesReceived: CAP,
      })
    )
    expect(result).toEqual({ kind: "restart" })
  })

  test("restarts on a 416 (resume offset past EOF after a shrink)", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: TOTAL, total: TOTAL, token: '"v1-3"' }),
      obs({ status: 416, etag: '"v2-1"', contentRange: null, bytesReceived: 0 })
    )
    expect(result).toEqual({ kind: "restart" })
  })

  test("restarts when a whole-body 200 arrives on a non-zero resume offset", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: CAP, total: TOTAL, token: '"v1-3"' }),
      obs({ status: 200, etag: '"v1-3"', contentRange: null, bytesReceived: TOTAL })
    )
    expect(result).toEqual({ kind: "restart" })
  })

  test("errors on an unexpected status (401/404/503)", () => {
    for (const status of [401, 404, 503]) {
      const result = integrateChunk(progress(), obs({ status, contentRange: null }))
      expect(result.kind).toBe("error")
    }
  })

  test("errors on an overrun (chunk pushes bytes past total)", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: 2 * CAP, total: TOTAL, token: '"v1-3"' }),
      obs({
        status: 206,
        etag: '"v1-3"',
        contentRange: { start: 2 * CAP, end: TOTAL - 1, total: TOTAL },
        bytesReceived: TOTAL - 2 * CAP + 500,
      })
    )
    expect(result.kind).toBe("error")
  })

  test("errors when no total can be resolved", () => {
    const result = integrateChunk(
      progress(),
      obs({ status: 206, contentRange: null, bytesReceived: CAP })
    )
    expect(result.kind).toBe("error")
  })

  test("errors on a zero-byte body (no forward progress)", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: CAP, total: TOTAL, token: '"v1-3"' }),
      obs({
        status: 206,
        etag: '"v1-3"',
        contentRange: { start: CAP, end: CAP - 1, total: TOTAL },
        bytesReceived: 0,
      })
    )
    expect(result.kind).toBe("error")
  })

  test("a missing ETag on a later chunk does not force a restart (degraded server)", () => {
    const result = integrateChunk(
      progress({ bytesOnDisk: CAP, total: TOTAL, token: '"v1-3"' }),
      obs({
        status: 206,
        etag: null,
        contentRange: { start: CAP, end: 2 * CAP - 1, total: TOTAL },
        bytesReceived: CAP,
      })
    )
    expect(result.kind).toBe("append")
  })
})

describe("verifyComplete", () => {
  test("true only when disk size equals a known total", () => {
    expect(verifyComplete(TOTAL, TOTAL)).toBe(true)
  })

  test("false on a short, long, or unknown-total file", () => {
    expect(verifyComplete(TOTAL - 1, TOTAL)).toBe(false)
    expect(verifyComplete(TOTAL + 1, TOTAL)).toBe(false)
    expect(verifyComplete(TOTAL, null)).toBe(false)
  })
})

describe("resolveProgressFraction", () => {
  test("null before total is known", () => {
    expect(resolveProgressFraction(0, null)).toBeNull()
    expect(resolveProgressFraction(1024, 0)).toBeNull()
  })

  test("fraction in [0,1], clamped at 1", () => {
    expect(resolveProgressFraction(0, TOTAL)).toBe(0)
    expect(resolveProgressFraction(CAP, TOTAL)).toBeCloseTo(CAP / TOTAL, 6)
    expect(resolveProgressFraction(TOTAL + 100, TOTAL)).toBe(1)
  })
})
