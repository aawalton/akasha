import { describe, expect, test } from "bun:test"
import { formatArrival, formatCompletion, sanitizeLogValue } from "./request-log"

const ARRIVAL = {
  seq: 41,
  method: "GET",
  path: "/basemap/na-eu.pmtiles",
  range: "bytes=0-16383",
  contentLength: null,
  userAgent: "Mozilla/5.0",
  rssBytes: 143 * 1024 * 1024,
}

describe("request log", () => {
  test("no caller-supplied value can forge a second line", () => {
    const forgery = 'x\n[atlas/web] req seq=1 GET /innocent range=- clen=- rss=1.0MiB ua="-"'
    const lines = [
      formatArrival({ ...ARRIVAL, path: forgery }),
      formatArrival({ ...ARRIVAL, userAgent: forgery }),
      formatArrival({ ...ARRIVAL, method: forgery, range: forgery, contentLength: forgery }),
      formatCompletion({
        seq: 1,
        method: forgery,
        path: forgery,
        status: 200,
        durationMs: 1,
        rssBytes: 1,
      }),
    ]
    for (const line of lines) {
      expect(line.split("\n")).toHaveLength(1)
      expect(line).not.toContain("\r")
    }
  })

  test("sanitizing removes every control character and keeps the length", () => {
    const raw = "a\u0000b\u001fc\u007fd\ne"
    const clean = sanitizeLogValue(raw)
    expect(clean).toHaveLength(raw.length)
    // biome-ignore lint/suspicious/noControlCharactersInRegex: asserting none remain
    expect(/[\u0000-\u001f\u007f]/.test(clean)).toBe(false)
  })

  test("leaves ordinary text alone", () => {
    expect(sanitizeLogValue("/basemap/na-eu.pmtiles")).toBe("/basemap/na-eu.pmtiles")
  })

  test("an arrival line carries what a request asked for", () => {
    const line = formatArrival(ARRIVAL)
    expect(line).toContain("seq=41")
    expect(line).toContain("GET")
    expect(line).toContain("/basemap/na-eu.pmtiles")
    expect(line).toContain("bytes=0-16383")
    expect(line).toContain("rss=")
  })

  test("an absent header reads as absent rather than as the string null", () => {
    const line = formatArrival({ ...ARRIVAL, range: null, contentLength: null, userAgent: null })
    expect(line).toContain("range=-")
    expect(line).toContain("clen=-")
    expect(line).not.toContain("null")
  })

  test("a completion line is joinable to its arrival and stands alone", () => {
    const line = formatCompletion({
      seq: 41,
      method: "GET",
      path: "/basemap/na-eu.pmtiles",
      status: 206,
      durationMs: 12.4,
      rssBytes: 146 * 1024 * 1024,
    })
    expect(line).toContain("seq=41")
    expect(line).toContain("206")
    expect(line).toContain("/basemap/na-eu.pmtiles")
  })

  test("a long user-agent is truncated rather than allowed to dominate the line", () => {
    const line = formatArrival({ ...ARRIVAL, userAgent: "u".repeat(500) })
    expect(line.length).toBeLessThan(400)
  })
})
