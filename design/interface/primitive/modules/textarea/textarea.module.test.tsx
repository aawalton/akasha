import { expect, test } from "bun:test"
import { sendsNow } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"

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
