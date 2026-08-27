import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { decodeCursor, encodeCursor } from "./cursor"

describe("encodeCursor / decodeCursor", () => {
  test("round-trip preserves values and id", () => {
    const payload = {
      values: [1, "two", null, true, { a: 1 }],
      id: "019db533-0000-7000-8000-000000000000",
    }
    expect(decodeCursor(encodeCursor(payload))).toEqual(payload)
  })

  test("round-trip with empty values array", () => {
    const payload = { values: [], id: "abc" }
    expect(decodeCursor(encodeCursor(payload))).toEqual(payload)
  })

  test("encoded cursor is URL-safe (RFC 4648 §5 alphabet)", () => {
    const payload = { values: ["????>>>>", "\x00\x01\x02\x03\xfe\xff"], id: "x" }
    const encoded = encodeCursor(payload)
    expect(encoded).toMatch(/^[A-Za-z0-9_-]*$/)
  })

  test("round-trip preserves multi-byte UTF-8 (emoji, CJK)", () => {
    const payload = {
      values: ["🚀 deploy", "中文", "café"],
      id: "019db533-0000-7000-8000-000000000001",
    }
    expect(decodeCursor(encodeCursor(payload))).toEqual(payload)
  })

  test("decodeCursor rejects malformed input", () => {
    expect(() => decodeCursor("not-valid-json-base64")).toThrow("malformed cursor")
  })

  test("decodeCursor rejects well-formed base64 that is not the expected shape", () => {
    const bytes = new TextEncoder().encode(JSON.stringify({ notValues: 1 }))
    let binary = ""
    for (const byte of bytes) binary += String.fromCharCode(byte)
    const badShape = btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "")
    expect(() => decodeCursor(badShape)).toThrow("malformed cursor")
  })
})

describe("encodeCursor / decodeCursor without Buffer in scope", () => {
  let originalBuffer: unknown
  beforeEach(() => {
    originalBuffer = Reflect.get(globalThis, "Buffer")
    Reflect.set(globalThis, "Buffer", undefined)
  })
  afterEach(() => {
    Reflect.set(globalThis, "Buffer", originalBuffer)
  })

  test("round-trip works without Buffer", () => {
    const payload = {
      values: [1, "two", null, true, { a: 1 }],
      id: "019db533-0000-7000-8000-000000000002",
    }
    expect(decodeCursor(encodeCursor(payload))).toEqual(payload)
  })

  test("multi-byte UTF-8 round-trip works without Buffer", () => {
    const payload = { values: ["🚀", "中"], id: "x" }
    expect(decodeCursor(encodeCursor(payload))).toEqual(payload)
  })
})
