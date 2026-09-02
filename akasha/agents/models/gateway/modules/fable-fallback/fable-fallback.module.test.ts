import { describe, expect, test } from "bun:test"
import { FABLE_MODEL_PREFIX, isFableRequest } from "./fable-fallback.module.code.ts"

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

describe("isFableRequest", () => {
  test("a fable model name opens with claude-fable-", () => {
    expect(FABLE_MODEL_PREFIX).toBe("claude-fable-")
    expect(isFableRequest(bodyOf('{"model":"claude-fable-1"}'))).toBe(true)
    expect(isFableRequest(bodyOf('{"model":"claude-opus-4"}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"model":"claude-fable"}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"model":"a-claude-fable-1"}'))).toBe(false)
  })

  test("a request body that is no JSON names no fable model", () => {
    expect(isFableRequest(bodyOf("claude-fable-1"))).toBe(false)
    expect(isFableRequest(bodyOf("{"))).toBe(false)
    expect(isFableRequest(bodyOf(""))).toBe(false)
    expect(isFableRequest(new ArrayBuffer(0))).toBe(false)
    expect(isFableRequest(bufferOf([0xff, 0xfe]))).toBe(false)
  })

  test("a missing request body names no fable model", () => {
    expect(isFableRequest(null)).toBe(false)
  })

  test("the model name claude-fable- with nothing after names a fable model", () => {
    expect(isFableRequest(bodyOf('{"model":"claude-fable-"}'))).toBe(true)
  })

  test("the prefix match is case sensitive", () => {
    expect(isFableRequest(bodyOf('{"model":"CLAUDE-FABLE-1"}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"model":"Claude-Fable-1"}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"MODEL":"claude-fable-1"}'))).toBe(false)
  })

  test("a non-string model value names no fable model", () => {
    expect(isFableRequest(bodyOf('{"model":null}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"model":5}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"model":true}'))).toBe(false)
    expect(isFableRequest(bodyOf('{"model":["claude-fable-1"]}'))).toBe(false)
    expect(isFableRequest(bodyOf("{}"))).toBe(false)
    expect(isFableRequest(bodyOf("null"))).toBe(false)
    expect(isFableRequest(bodyOf("[]"))).toBe(false)
    expect(isFableRequest(bodyOf('{"a":{"model":"claude-fable-1"}}'))).toBe(false)
  })

  test("a body key beside model never refuses the parse", () => {
    const rich = '{"model":"claude-fable-1","max_tokens":8,"stream":true,"messages":[]}'
    expect(isFableRequest(bodyOf(rich))).toBe(true)
    const other = '{"model":"claude-opus-4","max_tokens":8,"stream":true,"messages":[]}'
    expect(isFableRequest(bodyOf(other))).toBe(false)
  })

  test("nothing here rewrites a request body", () => {
    const text = '{"model":"claude-fable-1","max_tokens":8}'
    const buffer = bodyOf(text)
    const before = new Uint8Array(buffer).slice()
    expect(isFableRequest(buffer)).toBe(true)
    expect(new Uint8Array(buffer)).toEqual(before)
    expect(new TextDecoder().decode(buffer)).toBe(text)
    expect(buffer.byteLength).toBe(before.byteLength)
  })

  test("nothing here throws", () => {
    const bodies = ["null", "[]", '"x"', "7", "{", "nope", '{"model":5}', "{}", '{"model":{}}']
    for (const text of bodies) {
      expect(() => isFableRequest(bodyOf(text))).not.toThrow()
    }
    expect(() => isFableRequest(null)).not.toThrow()
    expect(() => isFableRequest(bufferOf([0xc3, 0x28, 0x00]))).not.toThrow()
  })

  test("nothing here throws when Object.prototype names a non-string model", () => {
    Object.defineProperty(Object.prototype, "model", {
      value: 5,
      configurable: true,
      enumerable: false,
      writable: true,
    })
    try {
      expect(() => isFableRequest(bodyOf("{}"))).not.toThrow()
      expect(isFableRequest(bodyOf("{}"))).toBe(false)
      expect(isFableRequest(bodyOf('{"model":"claude-fable-1"}'))).toBe(true)
    } finally {
      Reflect.deleteProperty(Object.prototype, "model")
    }
    expect(isFableRequest(bodyOf("{}"))).toBe(false)
  })
})
