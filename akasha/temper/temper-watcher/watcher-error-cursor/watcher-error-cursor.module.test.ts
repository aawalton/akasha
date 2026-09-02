import { expect, test } from "bun:test"
import {
  CURSOR_FILENAME,
  cursorPath,
  parseErrorCursor,
  serializeErrorCursor,
} from "./watcher-error-cursor.module.code.ts"

test("the cursor is kept beside the watcher log", () => {
  expect(cursorPath()).toEndWith(`/${CURSOR_FILENAME}`)
})

test("a cursor round-trips through text unchanged", () => {
  const seen = new Map([
    ["boom\nа.lua:1", 3],
    ["bang", 1],
  ])
  expect(parseErrorCursor(serializeErrorCursor(seen))).toEqual(seen)
})

test("an empty cursor round-trips as empty", () => {
  expect(parseErrorCursor(serializeErrorCursor(new Map())).size).toBe(0)
})

test("a cursor that is no valid json reads as nothing carried up yet", () => {
  expect(parseErrorCursor("not json").size).toBe(0)
  expect(parseErrorCursor("").size).toBe(0)
})

test("a cursor of the wrong shape reads as nothing carried up yet", () => {
  expect(parseErrorCursor('{"boom":"three"}').size).toBe(0)
  expect(parseErrorCursor("[1,2,3]").size).toBe(0)
  expect(parseErrorCursor("null").size).toBe(0)
})

test("a cursor is never partly read", () => {
  expect(parseErrorCursor('{"good":1,"bad":"x"}').size).toBe(0)
})

test("a well shaped cursor is read whole", () => {
  const read = parseErrorCursor('{"a":1,"b":2}')
  expect(read.get("a")).toBe(1)
  expect(read.get("b")).toBe(2)
  expect(read.size).toBe(2)
})
