import { describe, expect, test } from "bun:test"
import { parseErrorType } from "./parse-error-type.module.code.ts"

describe("parseErrorType", () => {
  test("an empty body text reads as no error type", () => {
    expect(parseErrorType("")).toBeNull()
  })

  test("a body text that is no JSON reads as no error type", () => {
    expect(parseErrorType("nope")).toBeNull()
    expect(parseErrorType("   ")).toBeNull()
    expect(parseErrorType('{"error":{"type":"x"')).toBeNull()
  })

  test("an error type is read at error.type and nowhere else", () => {
    const envelope = '{"type":"error","error":{"type":"overloaded_error","message":"m"}}'
    expect(parseErrorType(envelope)).toBe("overloaded_error")
    expect(parseErrorType('{"type":"rate_limit_error"}')).toBeNull()
    expect(parseErrorType('{"error":{}}')).toBeNull()
    expect(parseErrorType('{"error":null}')).toBeNull()
    expect(parseErrorType('{"error":"boom"}')).toBeNull()
    expect(parseErrorType('{"error":[{"type":"x"}]}')).toBeNull()
    expect(parseErrorType('{"a":{"error":{"type":"x"}}}')).toBeNull()
    expect(parseErrorType("{}")).toBeNull()
    expect(parseErrorType("null")).toBeNull()
    expect(parseErrorType("[]")).toBeNull()
  })

  test("a non-string value at error.type reads as no error type", () => {
    expect(parseErrorType('{"error":{"type":5}}')).toBeNull()
    expect(parseErrorType('{"error":{"type":null}}')).toBeNull()
    expect(parseErrorType('{"error":{"type":true}}')).toBeNull()
    expect(parseErrorType('{"error":{"type":{}}}')).toBeNull()
  })

  test("an empty string at error.type is returned as an empty string", () => {
    expect(parseErrorType('{"error":{"type":""}}')).toBe("")
  })

  test("a body key beside error never refuses the parse", () => {
    const rich = '{"error":{"type":"rate_limit_error","message":"m"},"request_id":"req_1"}'
    expect(parseErrorType(rich)).toBe("rate_limit_error")
  })

  test("nothing here throws", () => {
    const bodies = ["", "   ", "nope", "null", "[]", '"x"', "7", "{", '{"error":{"type":5}}', "{}"]
    for (const text of bodies) {
      expect(() => parseErrorType(text)).not.toThrow()
    }
  })

  test("nothing here tells an unparseable body from a body naming no error type", () => {
    const unparseable = parseErrorType("nope")
    const namingNone = parseErrorType("{}")
    const empty = parseErrorType("")
    expect(unparseable).toBe(namingNone)
    expect(namingNone).toBe(empty)
    expect(unparseable).toBeNull()
  })

  test("open gap: an error key present only on Object.prototype does not read as absent", () => {
    Object.defineProperty(Object.prototype, "error", {
      value: { type: "polluted_type" },
      configurable: true,
      enumerable: false,
      writable: true,
    })
    try {
      expect(parseErrorType("{}")).toBe("polluted_type")
    } finally {
      Reflect.deleteProperty(Object.prototype, "error")
    }
    expect(parseErrorType("{}")).toBeNull()
  })
})
