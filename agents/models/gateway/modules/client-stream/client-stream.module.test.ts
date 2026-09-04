import { describe, expect, test } from "bun:test"
import { parseClientStreamFlag } from "./client-stream.module.code.ts"

function bodyOf(text: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(text)
  const buffer = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(buffer).set(bytes)
  return buffer
}

function bufferOf(bytes: readonly number[]): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.length)
  new Uint8Array(buffer).set(bytes)
  return buffer
}

describe("parseClientStreamFlag", () => {
  test("a request body that is no JSON reads as no stream", () => {
    expect(parseClientStreamFlag(bodyOf("not json"))).toBe(false)
    expect(parseClientStreamFlag(bodyOf("{"))).toBe(false)
    expect(parseClientStreamFlag(bodyOf(""))).toBe(false)
    expect(parseClientStreamFlag(new ArrayBuffer(0))).toBe(false)
    expect(parseClientStreamFlag(bufferOf([0xff, 0xfe]))).toBe(false)
  })

  test("a missing request body reads as no stream", () => {
    expect(parseClientStreamFlag(null)).toBe(false)
  })

  test("only the JSON boolean true under the body's stream key reads as a stream", () => {
    expect(parseClientStreamFlag(bodyOf('{"stream":true}'))).toBe(true)
    expect(parseClientStreamFlag(bodyOf('{"stream":false}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('{"stream":"true"}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('{"stream":1}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('{"stream":null}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('{"stream":{}}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf("{}"))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('{"STREAM":true}'))).toBe(false)
  })

  test("a stream key below the body's top level reads as no stream", () => {
    expect(parseClientStreamFlag(bodyOf('{"a":{"stream":true}}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('{"__proto__":{"stream":true}}'))).toBe(false)
    expect(parseClientStreamFlag(bodyOf('[{"stream":true}]'))).toBe(false)
  })

  test("a body key beside stream never refuses the parse", () => {
    const rich = '{"model":"claude-opus-4","max_tokens":8,"stream":true,"metadata":{"a":1}}'
    expect(parseClientStreamFlag(bodyOf(rich))).toBe(true)
    const quiet = '{"model":"claude-opus-4","max_tokens":8}'
    expect(parseClientStreamFlag(bodyOf(quiet))).toBe(false)
  })

  test("nothing here throws", () => {
    const bodies = ["null", "[]", '"x"', "7", "true", "{", "nope", '{"stream":[]}', "{}"]
    for (const text of bodies) {
      expect(() => parseClientStreamFlag(bodyOf(text))).not.toThrow()
    }
    expect(() => parseClientStreamFlag(null)).not.toThrow()
    expect(() => parseClientStreamFlag(bufferOf([0xc3, 0x28, 0x00]))).not.toThrow()
  })

  test("nothing here tells a body naming no stream from a body that is no JSON", () => {
    const namingNone = parseClientStreamFlag(bodyOf("{}"))
    const unparseable = parseClientStreamFlag(bodyOf("nope"))
    const missing = parseClientStreamFlag(null)
    expect(namingNone).toBe(unparseable)
    expect(unparseable).toBe(missing)
    expect(namingNone).toBe(false)
  })
})
