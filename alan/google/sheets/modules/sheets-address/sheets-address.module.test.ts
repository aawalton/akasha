import { expect, test } from "bun:test"
import {
  namesItsTab,
  rangeOf,
  type SheetTab,
  sheetAddressOf,
} from "akasha/alan/google/sheets/modules/sheets-address/sheets-address.module.code.ts"

const ID = "1rxGy7zNVXzOtnrILAWUtkosfELOE3Izknl3y9dW_Czg"

const TABS: readonly SheetTab[] = [
  { title: "Overview", gid: 0, rows: 1000, columns: 26 },
  { title: "Alan's Builds", gid: 1025378572, rows: 200, columns: 12 },
]

test("a bare id names the sheet and no tab", () => {
  expect(sheetAddressOf(ID)).toEqual({ spreadsheetId: ID, gid: null })
})

test("an edit URL names the sheet and the tab its fragment names", () => {
  const url = `https://docs.google.com/spreadsheets/d/${ID}/edit?pli=1&gid=1025378572#gid=1025378572`
  expect(sheetAddressOf(url)).toEqual({ spreadsheetId: ID, gid: 1025378572 })
})

test("a URL naming its tab only in the query is read from the query", () => {
  const url = `https://docs.google.com/spreadsheets/d/${ID}/edit?gid=7`
  expect(sheetAddressOf(url)).toEqual({ spreadsheetId: ID, gid: 7 })
})

test("a URL naming no tab names none", () => {
  const url = `https://docs.google.com/spreadsheets/d/${ID}/edit`
  expect(sheetAddressOf(url)).toEqual({ spreadsheetId: ID, gid: null })
})

test("a URL holding no sheet id is refused", () => {
  expect(() => sheetAddressOf("https://docs.google.com/document/d/abc/edit")).toThrow(
    "holds no sheet id"
  )
})

test("a word too short to be an id is refused", () => {
  expect(() => sheetAddressOf("abc")).toThrow("neither a sheet URL nor a sheet id")
})

test("an empty word is refused", () => {
  expect(() => sheetAddressOf("  ")).toThrow("no sheet URL or id")
})

test("a range naming its tab is taken as it is", () => {
  expect(namesItsTab("Overview!A1:B2")).toBe(true)
  expect(rangeOf("Overview!A1:B2", 1025378572, TABS)).toBe("Overview!A1:B2")
})

test("a range naming no tab takes the tab the URL names", () => {
  expect(rangeOf("A1:C3", 1025378572, TABS)).toBe("'Alan''s Builds'!A1:C3")
})

test("no range at all reaches the whole tab the URL names", () => {
  expect(rangeOf(undefined, 1025378572, TABS)).toBe("'Alan''s Builds'")
})

test("a sheet naming no tab reaches its first tab", () => {
  expect(rangeOf(undefined, null, TABS)).toBe("'Overview'")
})

test("a gid the sheet holds no tab for is refused", () => {
  expect(() => rangeOf(undefined, 99, TABS)).toThrow("no tab whose gid is 99")
})
