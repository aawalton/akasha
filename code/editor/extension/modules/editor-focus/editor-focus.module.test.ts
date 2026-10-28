import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import {
  editorFocused,
  focusWritten,
} from "akasha/code/editor/extension/modules/editor-focus/editor-focus.module.code.ts"

const living = (): boolean => true

test("no window written means no editor has focus", () => {
  const dir = mkdtempSync("/var/tmp/editor-focus-")
  expect(editorFocused(dir, living)).toBe(false)
})

test("a folder that is not there means no editor has focus", () => {
  expect(editorFocused("/var/tmp/editor-focus-never-made", living)).toBe(false)
})

test("one focused window among several means the editor has focus", () => {
  const dir = mkdtempSync("/var/tmp/editor-focus-")
  focusWritten(dir, 101, false)
  focusWritten(dir, 202, true)
  expect(editorFocused(dir, living)).toBe(true)
})

test("a window losing focus is no longer focused", () => {
  const dir = mkdtempSync("/var/tmp/editor-focus-")
  focusWritten(dir, 101, true)
  focusWritten(dir, 101, false)
  expect(editorFocused(dir, living)).toBe(false)
})

test("a focused window whose process is gone is not focused", () => {
  const dir = mkdtempSync("/var/tmp/editor-focus-")
  focusWritten(dir, 101, true)
  expect(editorFocused(dir, () => false)).toBe(false)
})
