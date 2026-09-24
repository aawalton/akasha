import { expect, test } from "bun:test"
import {
  encoded,
  modelAsked,
  rewrittenToModel,
} from "akasha/agent/model/gateway/modules/model-body/model-body.module.code.ts"
import { z } from "zod"

const WRITTEN = z.looseObject({ model: z.string(), max_tokens: z.number() })

function bodyOf(said: unknown): ArrayBuffer {
  return encoded(JSON.stringify(said))
}

function readBack(bodyBuffer: ArrayBuffer | null): z.infer<typeof WRITTEN> {
  return WRITTEN.parse(JSON.parse(new TextDecoder().decode(bodyBuffer as ArrayBuffer)))
}

test("the model a body names is read off the `model` key alone", () => {
  expect(modelAsked(bodyOf({ model: "claude-opus-5[1m]", max_tokens: 8 }))).toBe(
    "claude-opus-5[1m]"
  )
})

test("a body naming no model, or naming one that is no string, names none", () => {
  expect(modelAsked(bodyOf({ max_tokens: 8 }))).toBe(null)
  expect(modelAsked(bodyOf({ model: 7 }))).toBe(null)
})

test("an absent body, and one that will not parse as json, names no model", () => {
  expect(modelAsked(null)).toBe(null)
  expect(modelAsked(encoded("not json at all"))).toBe(null)
})

test("a rewrite has every key the body has beside the model", () => {
  const written = readBack(rewrittenToModel(bodyOf({ model: "one", max_tokens: 8 }), "two"))
  expect(written["model"]).toBe("two")
  expect(written["max_tokens"]).toBe(8)
})

test("a body naming no model, or already naming the model asked for, is rewritten nowhere", () => {
  expect(rewrittenToModel(bodyOf({ max_tokens: 8 }), "two")).toBe(null)
  expect(rewrittenToModel(bodyOf({ model: "two" }), "two")).toBe(null)
  expect(rewrittenToModel(encoded("not json at all"), "two")).toBe(null)
})
