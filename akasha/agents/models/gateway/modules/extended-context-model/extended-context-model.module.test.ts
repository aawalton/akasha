import { expect, test } from "bun:test"
import {
  asksExtendedContext,
  baseSiblingOf,
  EXTENDED_CONTEXT_MARKER,
  marksExtendedContext,
  rewrittenToBaseSibling,
} from "./extended-context-model.module.code.ts"

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
  const parsed: unknown = JSON.parse(new TextDecoder().decode(buffer))
  if (parsed === null || typeof parsed !== "object") throw new Error("the rewrite was no object")
  return parsed as Record<string, unknown>
}

test("the marker is the four characters `[1m]`", () => {
  expect(EXTENDED_CONTEXT_MARKER).toBe("[1m]")
})

test("a wire id ending in the marker is marked", () => {
  expect(marksExtendedContext("claude-opus-5[1m]")).toBe(true)
})

test("a wire id without the marker is unmarked", () => {
  expect(marksExtendedContext("claude-opus-5")).toBe(false)
})

test("a wire id carrying the marker anywhere but the end is unmarked", () => {
  expect(marksExtendedContext("claude[1m]-opus-5")).toBe(false)
})

test("the base sibling of a marked wire id is that id without the marker", () => {
  expect(baseSiblingOf("claude-opus-5[1m]")).toBe("claude-opus-5")
})

test("the base sibling of an unmarked wire id is that id", () => {
  expect(baseSiblingOf("claude-opus-5")).toBe("claude-opus-5")
})

test("a body naming a marked model asks for extended context", () => {
  expect(asksExtendedContext(bodyOf({ model: "claude-opus-5[1m]" }))).toBe(true)
})

test("a body naming an unmarked model asks for no extended context", () => {
  expect(asksExtendedContext(bodyOf({ model: "claude-opus-5" }))).toBe(false)
})

test("a body naming no model asks for no extended context", () => {
  expect(asksExtendedContext(bodyOf({ messages: [] }))).toBe(false)
})

test("an absent body asks for no extended context", () => {
  expect(asksExtendedContext(null)).toBe(false)
})

test("a body that is no json asks for no extended context", () => {
  expect(asksExtendedContext(bytesOf("{not json"))).toBe(false)
})

test("a body whose model is a number asks for no extended context", () => {
  expect(asksExtendedContext(bodyOf({ model: 7 }))).toBe(false)
})

test("a body whose model is null asks for no extended context", () => {
  expect(asksExtendedContext(bodyOf({ model: null }))).toBe(false)
})

test("a marked body is rewritten onto the base sibling", () => {
  const rewritten = rewrittenToBaseSibling(bodyOf({ model: "claude-sonnet-5[1m]" }))
  if (rewritten === null) throw new Error("the marked body was rewritten nowhere")
  expect(readBack(rewritten).model).toBe("claude-sonnet-5")
})

test("a rewrite carries every other key of the body through", () => {
  const rewritten = rewrittenToBaseSibling(
    bodyOf({ model: "claude-sonnet-5[1m]", max_tokens: 64, stream: true })
  )
  if (rewritten === null) throw new Error("the marked body was rewritten nowhere")
  const back = readBack(rewritten)
  expect(back.max_tokens).toBe(64)
  expect(back.stream).toBe(true)
})

test("an unmarked body is rewritten nowhere", () => {
  expect(rewrittenToBaseSibling(bodyOf({ model: "claude-sonnet-5" }))).toBe(null)
})

test("a body naming no model is rewritten nowhere", () => {
  expect(rewrittenToBaseSibling(bodyOf({ messages: [] }))).toBe(null)
})

test("a body that is no json is rewritten nowhere", () => {
  expect(rewrittenToBaseSibling(bytesOf("{not json"))).toBe(null)
})

test("a model that is the marker alone is rewritten onto an empty model", () => {
  const rewritten = rewrittenToBaseSibling(bodyOf({ model: "[1m]" }))
  if (rewritten === null) throw new Error("the marker-alone body was rewritten nowhere")
  expect(readBack(rewritten).model).toBe("")
})
