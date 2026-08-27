import { describe, expect, test } from "bun:test"
import { checkBasemapRange, MAX_RANGE_BYTES } from "./basemap-range"

function spanOf(range: string): number {
  const halves = range.slice("bytes=".length).split("-")
  const [first, second] = halves
  if (halves.length !== 2 || first === undefined || second === undefined) {
    throw new Error(`unparseable: ${range}`)
  }
  if (first === "") return Number(second)
  return Number(second) - Number(first) + 1
}

describe("checkBasemapRange", () => {
  test("nothing it accepts can span more than the cap", () => {
    const headers = [
      null,
      "",
      "bytes=",
      "bytes=0-0",
      "bytes=0-126",
      "bytes=0-16383",
      "bytes=0-",
      "bytes=1024-",
      "bytes=-500",
      `bytes=-${MAX_RANGE_BYTES}`,
      `bytes=-${MAX_RANGE_BYTES + 1}`,
      "bytes=0-99,200-299",
      "bytes=500-100",
      "bytes=abc-def",
      "items=0-10",
      "bytes=0-99999999999",
      `bytes=0-${MAX_RANGE_BYTES - 1}`,
      `bytes=0-${MAX_RANGE_BYTES}`,
    ]
    for (const header of headers) {
      const verdict = checkBasemapRange(header)
      if (verdict.ok) expect(spanOf(verdict.range)).toBeLessThanOrEqual(MAX_RANGE_BYTES)
    }
  })

  test("refuses a request carrying no Range at all", () => {
    const verdict = checkBasemapRange(null)
    expect(verdict.ok).toBe(false)
    if (!verdict.ok) expect(verdict.status).toBe(400)
  })

  test("refuses an open-ended range, whose span is the rest of the object", () => {
    for (const header of ["bytes=0-", "bytes=1024-"]) {
      expect(checkBasemapRange(header).ok).toBe(false)
    }
  })

  test("admits the client's opening 16 KiB read, whatever the cap is set to", () => {
    expect(MAX_RANGE_BYTES).toBeGreaterThanOrEqual(16384)
    expect(checkBasemapRange("bytes=0-16383").ok).toBe(true)
  })

  test("admits the reads a correct pmtiles client makes", () => {
    for (const header of ["bytes=0-126", "bytes=0-16383", "bytes=10758097-10758596"]) {
      const verdict = checkBasemapRange(header)
      expect(verdict.ok).toBe(true)
      if (verdict.ok) expect(verdict.range).toBe(header)
    }
  })

  test("takes a span of exactly the cap and refuses one byte more", () => {
    expect(checkBasemapRange(`bytes=0-${MAX_RANGE_BYTES - 1}`).ok).toBe(true)
    expect(checkBasemapRange(`bytes=0-${MAX_RANGE_BYTES}`).ok).toBe(false)
    expect(checkBasemapRange("bytes=0-99", 100).ok).toBe(true)
    expect(checkBasemapRange("bytes=0-100", 100).ok).toBe(false)
  })

  test("refuses multi-range, which the gateway answers with multipart", () => {
    expect(checkBasemapRange("bytes=0-99,200-299").ok).toBe(false)
  })

  test("refuses a malformed, inverted, empty or non-byte range", () => {
    const bad = [
      "",
      "bytes=",
      "items=0-10",
      "bytes=abc-def",
      "bytes=-",
      "bytes=-0",
      "bytes=500-100",
    ]
    for (const header of bad) expect(checkBasemapRange(header).ok).toBe(false)
  })

  test("tolerates surrounding whitespace", () => {
    expect(checkBasemapRange("  bytes=0-99  ").ok).toBe(true)
  })
})
