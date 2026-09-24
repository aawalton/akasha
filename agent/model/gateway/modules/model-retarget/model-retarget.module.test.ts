import { expect, test } from "bun:test"
import {
  retargetedModel,
  rewrittenToCurrentModel,
} from "akasha/agent/model/gateway/modules/model-retarget/model-retarget.module.code.ts"
import { toWireId } from "akasha/agent/model/modules/vocab/model-vocab.module.code.ts"
import { z } from "zod"

const REWRITTEN_BODY = z.record(z.string(), z.unknown())

function bodyOf(value: unknown): ArrayBuffer {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

function bytesOf(text: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(text)
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

function readBack(buffer: ArrayBuffer): Record<string, unknown> {
  return REWRITTEN_BODY.parse(JSON.parse(new TextDecoder().decode(buffer)))
}

test("a wire id no longer served is retargeted onto the one the vocabulary has", () => {
  expect(retargetedModel("claude-opus-4-8")).toBe(toWireId("opus"))
})

test("the wire id the vocabulary has is retargeted nowhere", () => {
  expect(retargetedModel(toWireId("opus"))).toBe(null)
})

test("a logical name is retargeted onto the wire id that name has", () => {
  expect(retargetedModel("opus")).toBe(toWireId("opus"))
})

test("a name this system knows nothing of is retargeted nowhere", () => {
  expect(retargetedModel("claude-nonexistent-9")).toBe(null)
})

test("the extended-context marker is carried onto the model retargeted to", () => {
  expect(retargetedModel("claude-opus-4-8[1m]")).toBe(`${toWireId("opus")}[1m]`)
})

test("a body naming a wire id no longer served is rewritten onto the current one", () => {
  const rewritten = rewrittenToCurrentModel(bodyOf({ model: "claude-opus-4-8" }))
  if (rewritten === null) throw new Error("the body was rewritten nowhere")
  expect(readBack(rewritten).model).toBe(toWireId("opus"))
})

test("a rewrite carries every other key of the body through", () => {
  const rewritten = rewrittenToCurrentModel(
    bodyOf({ model: "claude-opus-4-8", max_tokens: 64, stream: true })
  )
  if (rewritten === null) throw new Error("the body was rewritten nowhere")
  const back = readBack(rewritten)
  expect(back.max_tokens).toBe(64)
  expect(back.stream).toBe(true)
})

test("a body already naming the current wire id is rewritten nowhere", () => {
  expect(rewrittenToCurrentModel(bodyOf({ model: toWireId("opus") }))).toBe(null)
})

test("a body naming a model this system knows nothing of is rewritten nowhere", () => {
  expect(rewrittenToCurrentModel(bodyOf({ model: "claude-nonexistent-9" }))).toBe(null)
})

test("a body naming no model is rewritten nowhere", () => {
  expect(rewrittenToCurrentModel(bodyOf({ messages: [] }))).toBe(null)
})

test("an absent body is rewritten nowhere", () => {
  expect(rewrittenToCurrentModel(null)).toBe(null)
})

test("a body that is no json is rewritten nowhere", () => {
  expect(rewrittenToCurrentModel(bytesOf("{not json"))).toBe(null)
})
