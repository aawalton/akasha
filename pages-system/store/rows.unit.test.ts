import { expect, test } from "bun:test"
import { type RowPage, type RowUnread, rowsIn } from "./rows.ts"

const AT = "pages/seat-log-day/one.seat-log-day.lines.jsonl"

const HOLDER = "one"

const read = (text: string): readonly (RowPage | RowUnread)[] => [...rowsIn(AT, text, HOLDER)]

const pages = (text: string): readonly RowPage[] =>
  read(text).filter((one): one is RowPage => !("unread" in one))

test("a row is named by the slug it states", () => {
  const found = pages(`{"slug":"morning","note":"up"}`)
  expect(found.map((one) => one.name)).toEqual(["morning"])
})

test("a row stating no slug is named by the id it states", () => {
  const found = pages(`{"id":"01a0-abc","note":"up"}`)
  expect(found.map((one) => one.name)).toEqual(["01a0-abc"])
})

test("a slug is preferred to an id, a row having one name", () => {
  const found = pages(`{"id":"01a0-abc","slug":"morning"}`)
  expect(found.map((one) => one.name)).toEqual(["morning"])
})

test("a row naming itself nothing is named by its holder and its place", () => {
  const found = pages(`{"note":"up"}`)
  expect(found.map((one) => one.name)).toEqual(["one#1"])
})

test("a row's address carries its name rather than its place", () => {
  const [found] = pages(`{"slug":"morning"}`)
  expect(found?.at).toBe(`${AT}#morning`)
})

test("a row keeps its address when a line is written above it", () => {
  const before = pages(`{"slug":"morning"}`)
  const after = pages(`{"slug":"dawn"}\n{"slug":"morning"}`)
  expect(before[0]?.at).toBe(`${AT}#morning`)
  expect(after[1]?.at).toBe(`${AT}#morning`)
})

test("a line that is not one JSON object is answered rather than dropped", () => {
  const found = read(`{"slug":"morning"}\nnot json at all\n{"slug":"evening"}`)
  expect(found.length).toBe(3)
  const unread = found.filter((one): one is RowUnread => "unread" in one)
  expect(unread.length).toBe(1)
  expect(unread[0]?.unread).toContain("line 2")
})

test("an array is not a row, a row being a set of keys", () => {
  const found = read(`[1,2]`)
  expect(found.every((one) => "unread" in one)).toBe(true)
})

test("a bare value is not a row", () => {
  const found = read(`7`)
  expect(found.every((one) => "unread" in one)).toBe(true)
})

test("a blank line is neither a row nor an unread", () => {
  expect(read(`{"slug":"morning"}\n\n\n{"slug":"evening"}`).length).toBe(2)
})

test("a sidecar ending without a line break holds its last row", () => {
  expect(pages(`{"slug":"morning"}\n{"slug":"evening"}`).map((one) => one.name)).toEqual([
    "morning",
    "evening",
  ])
})

test("reading the rows twice answers them twice", () => {
  const held = rowsIn(AT, `{"slug":"morning"}\n{"slug":"evening"}`, HOLDER)
  const first = [...held].length
  const second = [...held].length
  expect(first).toBe(2)
  expect(second).toBe(2)
})

test("a reader may stop early and leave the rest unread", () => {
  const held = rowsIn(AT, `{"slug":"a"}\n{"slug":"b"}\n{"slug":"c"}`, HOLDER)
  const taken: string[] = []
  for (const one of held) {
    if ("unread" in one) continue
    taken.push(one.name)
    if (taken.length === 2) break
  }
  expect(taken).toEqual(["a", "b"])
  expect([...held].length).toBe(3)
})

test("nothing at all holds no rows", () => {
  expect(read("")).toEqual([])
})
