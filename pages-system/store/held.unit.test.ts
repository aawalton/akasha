import { expect, test } from "bun:test"
import { heldBy, valuedAs } from "./held.ts"

const TEXT = { kind: "text" } as const
const NUMBER = { kind: "number" } as const
const BOOLEAN = { kind: "boolean" } as const
const INSTANT = { kind: "instant" } as const
const DATE = { kind: "date" } as const

test("every stated type holding one run of characters reaches a text", () => {
  for (const spelling of [
    "text",
    "slug",
    "uuid",
    "path",
    "url",
    "relation-address",
    "relation-id",
    "relation-name",
    "relation-seq",
    "relation-slug",
  ]) {
    expect(heldBy(spelling)).toEqual(TEXT)
  }
})

test("a stated type the language holds under its own name reaches that kind", () => {
  expect(heldBy("number")).toEqual(NUMBER)
  expect(heldBy("boolean")).toEqual(BOOLEAN)
  expect(heldBy("instant")).toEqual(INSTANT)
})

test("a calendar date reaches a date, the two being one type under two names", () => {
  expect(heldBy("calendar-date")).toEqual(DATE)
})

test("a select holds whatever its choices are written in", () => {
  expect(heldBy("select(slug)")).toEqual(TEXT)
})

test("a list holds several of whatever its items are", () => {
  expect(heldBy("list(text)")).toEqual({ kind: "list", of: "text" })
  expect(heldBy("list(relation-slug)")).toEqual({ kind: "list", of: "text" })
  expect(heldBy("list(number)")).toEqual({ kind: "list", of: "number" })
})

test("a count limit is not part of a type, so a bounded list reaches what an open one does", () => {
  expect(heldBy("list(relation-slug, max 20)")).toEqual(heldBy("list(relation-slug)"))
})

test("a list of days reaches nothing, a list holding scalars and a date not being one", () => {
  expect(heldBy("list(calendar-date)")).toBeNull()
})

test("a stated type holding structure rather than a value reaches nothing", () => {
  for (const spelling of ["json", "map(reading)", "pages", "process", "template", "range(number)"]) {
    expect(heldBy(spelling)).toBeNull()
  }
})

test("stating that a key may hold nothing says nothing about its type", () => {
  expect(heldBy("text | none")).toEqual(TEXT)
  expect(heldBy("relation-slug | none")).toEqual(TEXT)
})

test("a union of two types reaches nothing, the language having one place to put a type", () => {
  expect(heldBy("number | text")).toBeNull()
  expect(heldBy("path | list(path, max 8) | none")).toBeNull()
  expect(heldBy("calendar-date | instant")).toBeNull()
})

test("a stated type named nowhere in the table reaches nothing rather than falling to text", () => {
  expect(heldBy("string")).toBeNull()
})

test("what a page writes is read under the type declared for it, not under how it looks", () => {
  expect(valuedAs(2026, TEXT)).toEqual({ kind: "text", text: "2026" })
  expect(valuedAs("9", NUMBER)).toEqual({ kind: "number", number: 9 })
  expect(valuedAs(true, TEXT)).toEqual({ kind: "text", text: "true" })
})

test("a key the page writes nothing under holds nothing", () => {
  expect(valuedAs(undefined, TEXT)).toEqual({ kind: "absent" })
  expect(valuedAs(null, NUMBER)).toEqual({ kind: "absent" })
})

test("a value that cannot be read under its declared type holds nothing", () => {
  expect(valuedAs("nine", NUMBER)).toEqual({ kind: "absent" })
  expect(valuedAs({ a: 1 }, TEXT)).toEqual({ kind: "absent" })
  expect(valuedAs("yes", BOOLEAN)).toEqual({ kind: "absent" })
})

test("an instant is read from the moment a page writes, and holds milliseconds", () => {
  expect(valuedAs("1970-01-01T00:00:01.000Z", INSTANT)).toEqual({ kind: "instant", instant: 1000 })
})

test("a day is read only where it is written as a day", () => {
  expect(valuedAs("2026-08-27", DATE)).toEqual({ kind: "date", date: "2026-08-27" })
  expect(valuedAs("27 August 2026", DATE)).toEqual({ kind: "absent" })
})

test("a list keeps the items it can read and drops the rest, one item not being the others", () => {
  expect(valuedAs(["1", "two", "3"], { kind: "list", of: "number" })).toEqual({
    kind: "list",
    of: "number",
    items: [
      { kind: "number", number: 1 },
      { kind: "number", number: 3 },
    ],
  })
})

test("a single value written where a list is declared holds nothing, a list being several", () => {
  expect(valuedAs("one", { kind: "list", of: "text" })).toEqual({ kind: "absent" })
})
