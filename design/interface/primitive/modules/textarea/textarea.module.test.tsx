import { expect, test } from "bun:test"
import {
  breaksLine,
  sendsNow,
} from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"

function pressed(key: string, shiftKey: boolean, isComposing: boolean) {
  return { key, shiftKey, nativeEvent: { isComposing } }
}

test("Enter alone sends", () => {
  expect(sendsNow(pressed("Enter", false, false))).toBe(true)
})

test("Shift with Enter starts a new line rather than sending", () => {
  expect(sendsNow(pressed("Enter", true, false))).toBe(false)
})

test("Enter while a word is being composed sends nothing", () => {
  expect(sendsNow(pressed("Enter", false, true))).toBe(false)
})

test("a key other than Enter sends nothing", () => {
  expect(sendsNow(pressed("a", false, false))).toBe(false)
})

test("a line break asked for by a phone's return key breaks a line", () => {
  expect(breaksLine({ inputType: "insertLineBreak", data: null })).toBe(true)
  expect(breaksLine({ inputType: "insertParagraph", data: null })).toBe(true)
  expect(breaksLine({ inputType: "insertText", data: "\n" })).toBe(true)
})

test("text and a composed word break no line", () => {
  expect(breaksLine({ inputType: "insertText", data: "a" })).toBe(false)
  expect(breaksLine({ inputType: "insertCompositionText", data: "に" })).toBe(false)
  expect(breaksLine({ inputType: "insertReplacementText", data: null })).toBe(false)
})
