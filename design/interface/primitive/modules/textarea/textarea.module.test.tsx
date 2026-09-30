import { expect, test } from "bun:test"
import {
  breaksLine,
  returnPressed,
  sendsNow,
} from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"

const ENTER_KEY_CODE = 13

const COMPOSING_KEY_CODE = 229

function pressed(key: string, shiftKey: boolean, isComposing: boolean, keyCode = ENTER_KEY_CODE) {
  return { key, shiftKey, nativeEvent: { isComposing, keyCode } }
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

test("Enter that ends a composition, flagged by its key code alone, sends nothing", () => {
  expect(sendsNow(pressed("Enter", false, false, COMPOSING_KEY_CODE))).toBe(false)
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

test("a line break asked for with no composition open is return pressed", () => {
  expect(returnPressed({ inputType: "insertLineBreak", data: null, isComposing: false })).toBe(true)
  expect(returnPressed({ inputType: "insertText", data: "\n", isComposing: false })).toBe(true)
})

test("a line break asked for while a composition is open is no return pressed", () => {
  expect(returnPressed({ inputType: "insertLineBreak", data: null, isComposing: true })).toBe(false)
  expect(returnPressed({ inputType: "insertParagraph", data: null, isComposing: true })).toBe(false)
  expect(returnPressed({ inputType: "insertText", data: "\n", isComposing: true })).toBe(false)
})
