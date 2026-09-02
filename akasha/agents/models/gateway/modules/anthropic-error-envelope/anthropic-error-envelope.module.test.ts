import { expect, test } from "bun:test"
import {
  ANTHROPIC_ERROR_ENVELOPE_SCHEMA,
  parseAnthropicErrorEnvelope,
} from "./anthropic-error-envelope.module.code.ts"

const ENVELOPE = '{"type":"error","error":{"type":"permission_error","message":"nope"}}'

test("an envelope names the error type upstream gave the failure", () => {
  expect(parseAnthropicErrorEnvelope(ENVELOPE)?.type).toBe("permission_error")
})

test("an envelope carries a message as an optional field", () => {
  expect(parseAnthropicErrorEnvelope(ENVELOPE)?.message).toBe("nope")
  const bare = '{"type":"error","error":{"type":"not_found_error"}}'
  expect(parseAnthropicErrorEnvelope(bare)?.type).toBe("not_found_error")
  expect(parseAnthropicErrorEnvelope(bare)?.message).toBeUndefined()
})

test("a body carrying keys the envelope does not name still parses", () => {
  const extra = '{"type":"error","request_id":"r1","error":{"type":"x","detail":9}}'
  expect(parseAnthropicErrorEnvelope(extra)?.type).toBe("x")
})

test("a body the JSON parser refuses parses to nothing", () => {
  for (const bad of ["", "{", "not json", "[[["]) {
    expect(parseAnthropicErrorEnvelope(bad)).toBeNull()
  }
})

test("a body carrying no envelope parses to nothing", () => {
  for (const bad of ["{}", '{"error":{}}', '{"type":"error"}', "null", "42", '"s"']) {
    expect(parseAnthropicErrorEnvelope(bad)).toBeNull()
  }
})

test("a payload naming a type other than `error` parses to nothing", () => {
  expect(parseAnthropicErrorEnvelope('{"type":"message","error":{"type":"x"}}')).toBeNull()
})

test("a `__proto__` key in the parsed body reaches no prototype", () => {
  const hostile = '{"type":"error","__proto__":{"polluted":1},"error":{"type":"x"}}'
  const got = parseAnthropicErrorEnvelope(hostile)
  expect(got?.type).toBe("x")
  expect(Object.hasOwn({}, "polluted")).toBe(false)
  const parsed = ANTHROPIC_ERROR_ENVELOPE_SCHEMA.safeParse(JSON.parse(hostile))
  expect(parsed.success).toBe(true)
})
