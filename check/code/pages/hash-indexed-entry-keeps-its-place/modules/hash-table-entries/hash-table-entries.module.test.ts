import { expect, test } from "bun:test"
import { filesOf as reading } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  keyOrder,
  tableIn,
} from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/modules/hash-table-entries/hash-table-entries.module.code.ts"

const AT = "kit/kit.module.code.ts"

const PART_AT = "part/part.module.code.ts"

const IMPORTED = 'import { PART } from "akasha/part/part.module.code.ts"'

function entriesOf(files: Readonly<Record<string, string>>): readonly string[] {
  const found = tableIn(reading(files), AT, "TABLE")
  if ("unread" in found) throw new Error(found.unread)
  if ("pages" in found) throw new Error(`read as the pages of ${found.pages}`)
  return found.entries
}

function unreadOf(files: Readonly<Record<string, string>>): string {
  const found = tableIn(reading(files), AT, "TABLE")
  return "unread" in found ? found.unread : ""
}

test("a record is read in the order its keys are written", () => {
  const body =
    'const TABLE = { "no-kit": { id: "no-kit" }, axe: { id: "axe" }, "bow": {} } as const\n'
  expect(entriesOf({ [AT]: body })).toEqual(["no-kit", "axe", "bow"])
})

test("an array is read by each element's `id`, or by the element as written", () => {
  const body = 'const TABLE = [{ id: "one", name: "One" }, "two", 3, [4,  5]]\n'
  expect(entriesOf({ [AT]: body })).toEqual(["one", "two", "3", "[4, 5]"])
})

test("a table spread in from another module is read in its place", () => {
  const part = "export const PART = { two: {}, three: {} }\n"
  const body = `${IMPORTED}\nconst TABLE = { one: {}, ...PART, four: {} }\n`
  expect(entriesOf({ [AT]: body, [PART_AT]: part })).toEqual(["one", "two", "three", "four"])
})

test("a table made by a factory is read through the table handed in", () => {
  const part = [
    "const PART_DATA = { two: {}, three: {} }",
    "export const part = createDataFile<Held>()(PART_DATA)",
    "",
  ].join("\n")
  const body = [
    'import { part } from "akasha/part/part.module.code.ts"',
    "const TABLE = { one: {}, ...part.data } satisfies Record<string, Held>",
    "",
  ].join("\n")
  expect(entriesOf({ [AT]: body, [PART_AT]: part })).toEqual(["one", "two", "three"])
})

test("a key spread in a second time keeps the place it first had", () => {
  const body = "const PART = { two: {}, three: {} }\nconst TABLE = { ...PART, one: {}, ...PART }\n"
  expect(entriesOf({ [AT]: body })).toEqual(["two", "three", "one"])
})

test("an element written twice is told apart by how many times it came", () => {
  expect(entriesOf({ [AT]: 'const TABLE = ["", "Sword", ""]\n' })).toEqual(["", "Sword", " (2)"])
})

test("a key naming an array index comes first, as the language orders it", () => {
  expect(keyOrder(["b", "10", "a", "2"])).toEqual(["2", "10", "b", "a"])
})

test("every file the table was read through is named", () => {
  const body = `${IMPORTED}\nconst TABLE = ["one", ...PART]\n`
  const found = tableIn(
    reading({ [AT]: body, [PART_AT]: 'export const PART = ["two"]\n' }),
    AT,
    "TABLE"
  )
  expect(found.paths).toEqual([AT, PART_AT])
})

test("a name the code declares nowhere is unread, and says so", () => {
  expect(unreadOf({ [AT]: "const OTHER = []\n" })).toContain("declares no `TABLE`")
})

test("a table built by a call read no further is unread, and names the call", () => {
  expect(unreadOf({ [AT]: "const TABLE = rowsFrom(OTHER)\n" })).toContain("`rowsFrom`")
})

test("a table read from a page type's pages is read as those pages, through a call over them", () => {
  const body = [
    'import { kit } from "akasha/kit/kit.page-type.ts"',
    "const ROWS = $pagesOfType<Row>(kit)",
    "const TABLE = namesByPlace(ROWS)",
    "",
  ].join("\n")
  const found = tableIn(reading({ [AT]: body }), AT, "TABLE")
  expect("pages" in found && found.pages).toBe("kit/kit.page-type.ts")
})

test("pages of a page type the module does not import are unread", () => {
  expect(unreadOf({ [AT]: "const TABLE = $pagesOfType<Row>(kit)\n" })).toContain(
    "reads the pages of no page type it imports"
  )
})

test("a table imported from a file that is not there is unread", () => {
  expect(unreadOf({ [AT]: `${IMPORTED}\nconst TABLE = [...PART]\n` })).toContain("is no file")
})
