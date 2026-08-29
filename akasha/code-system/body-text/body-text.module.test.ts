import { expect, test } from "bun:test"
import { textIn, textOf } from "./body-text.module.code.ts"

const HELD = new TextEncoder().encode("held\n")

test("a body is said as the text it holds", () => {
  expect(textIn(HELD)).toBe("held\n")
})

test("a body holding nothing is empty text, which is not nothing", () => {
  expect(textIn(new Uint8Array([]))).toBe("")
  expect(textOf(new Uint8Array([]))).toBe("")
})

test("a path standing at nothing says nothing", () => {
  expect(textOf(null)).toBeNull()
})

test("a body that is there is said the same whether it was asked for either way", () => {
  expect(textOf(HELD)).toBe(textIn(HELD))
})

test("bytes that are not text read as the replacement character rather than refusing", () => {
  expect(textIn(new Uint8Array([0xff, 0xfe]))).toBe("��")
})

test("text beyond one byte survives being said", () => {
  const said = "é一\u{1F300}"
  expect(textIn(new TextEncoder().encode(said))).toBe(said)
})
