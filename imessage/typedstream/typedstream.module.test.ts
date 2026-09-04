import { describe, expect, test } from "bun:test"
import { decodeAttributedBody } from "./typedstream.module.code.ts"
import {
  ASCII_TEXT,
  LONG_TEXT,
  longBody,
  mediumBody,
  READABLE,
  shortBody,
  UNICODE_TEXT,
  UNREADABLE,
} from "./typedstream.module.test-fixtures.ts"

describe("a body the reader can read", () => {
  for (const [name, body, expected] of READABLE) {
    test(name, () => {
      expect(decodeAttributedBody(body)).toBe(expected)
    })
  }
})

describe("a body the reader cannot read", () => {
  for (const [name, body] of UNREADABLE) {
    test(name, () => {
      expect(decodeAttributedBody(body)).toBeUndefined()
    })
  }
})

describe("what the three length forms agree on", () => {
  test("all three carry the same short text", () => {
    expect(decodeAttributedBody(shortBody(ASCII_TEXT))).toBe(ASCII_TEXT)
    expect(decodeAttributedBody(mediumBody(ASCII_TEXT))).toBe(ASCII_TEXT)
    expect(decodeAttributedBody(longBody(ASCII_TEXT))).toBe(ASCII_TEXT)
  })

  test("text past the one-byte ceiling needs a wider form", () => {
    expect(decodeAttributedBody(mediumBody(LONG_TEXT))).toBe(LONG_TEXT)
    expect(decodeAttributedBody(longBody(LONG_TEXT))).toBe(LONG_TEXT)
  })

  test("utf8 is measured in bytes rather than in characters", () => {
    expect(decodeAttributedBody(shortBody(UNICODE_TEXT))).toBe(UNICODE_TEXT)
    expect(UNICODE_TEXT.length).toBeLessThan(Buffer.byteLength(UNICODE_TEXT, "utf8"))
  })
})

describe("only the first string a body carries is read out", () => {
  test("a second string standing after the first is left", () => {
    const first = shortBody("first")
    const second = shortBody("second")
    expect(decodeAttributedBody(first + second)).toBe("first")
  })
})

describe("a body this cannot read answers with nothing rather than failing", () => {
  test("no input throws", () => {
    for (const [, body] of [...READABLE.map(([n, b]) => [n, b] as const), ...UNREADABLE]) {
      expect(() => decodeAttributedBody(body)).not.toThrow()
    }
  })

  test("hex that is no hex answers with nothing rather than failing", () => {
    expect(() => decodeAttributedBody("zzzz")).not.toThrow()
    expect(decodeAttributedBody("zzzz")).toBeUndefined()
  })

  test("hex of an odd length answers with nothing rather than failing", () => {
    expect(() => decodeAttributedBody("abc")).not.toThrow()
    expect(decodeAttributedBody("abc")).toBeUndefined()
  })

  test("a body cut anywhere along its length never throws", () => {
    const whole = shortBody(UNICODE_TEXT, "0011")
    for (let cut = 0; cut <= whole.length; cut += 2) {
      expect(() => decodeAttributedBody(whole.slice(0, cut))).not.toThrow()
    }
  })
})
