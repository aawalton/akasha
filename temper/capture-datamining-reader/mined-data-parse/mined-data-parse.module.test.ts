import { expect, test } from "bun:test"
import {
  extractMinedItemRows,
  extractMinedQuestRows,
  isFullyRead,
  readMinedAccountWide,
} from "./mined-data-parse.module.code.ts"
import { minedLua } from "./mined-data-parse.module.test-fixtures.ts"

const READ_ALL = minedLua([{ id: 700001 }, { id: 700002 }, { id: 700003 }], [800001, 800002])

const ONE = minedLua([{ id: 700001 }])

test("the fixture writes the file the game writes: CRLF lines and bare integer keys", () => {
  expect(ONE.includes("\n") && !ONE.includes("\r")).toBe(false)
  expect(ONE).toContain('["items"] = \r\n')
  expect(ONE).toContain("[700001] = \r\n")
  expect(ONE).not.toContain('["700001"]')
})

test("the set-bonus members are written as a numeric-keyed table in hash order", () => {
  const memberKey = /^ {28}\[(\d+)\] = \r$/
  const order = ONE.split("\n")
    .map((line) => memberKey.exec(line)?.[1])
    .filter((key) => key !== undefined)
  expect(order).toEqual(["4", "1", "2", "3"])
})

test("the siblings are read through the Default, account and account-wide envelope", () => {
  const accountWide = readMinedAccountWide(READ_ALL)
  expect(accountWide.version).toBe(1)
  expect(accountWide.nextItemId).toBe(900001)
})

test("one row comes back per item entry, keyed by the map key", () => {
  const { rows } = extractMinedItemRows(readMinedAccountWide(READ_ALL))
  expect(rows.map((row) => row.itemId)).toEqual([700001, 700002, 700003])
  expect(rows[0]?.name).toBe("Item 700001")
})

test("one row comes back per quest entry, keyed by the map key", () => {
  const { rows } = extractMinedQuestRows(readMinedAccountWide(READ_ALL))
  expect(rows.map((row) => row.questId)).toEqual([800001, 800002])
  expect(rows[0]?.zoneId).toBe(101)
})

test("a reading that took every entry names no loss at all", () => {
  const { diagnostics } = extractMinedItemRows(readMinedAccountWide(READ_ALL))
  expect(diagnostics).toEqual({ unreadableIds: [], nonIntegerKeys: [], reasons: [] })
  expect(isFullyRead(diagnostics)).toBe(true)
  expect(isFullyRead(extractMinedQuestRows(readMinedAccountWide(READ_ALL)).diagnostics)).toBe(true)
})

test("requiredCP is handed on as requiredCp and the map key is written in as itemId", () => {
  const accountWide = readMinedAccountWide(minedLua([{ id: 700009, requiredCP: 810 }]))
  const row = extractMinedItemRows(accountWide).rows[0]
  expect(row?.requiredCp).toBe(810)
  expect(row).not.toHaveProperty("requiredCP")
  expect(row?.itemId).toBe(700009)
})

test("set bonuses the file wrote out of order come back in key order", () => {
  expect(READ_ALL).toContain(`${" ".repeat(28)}[4] = \r\n`)
  const row = extractMinedItemRows(readMinedAccountWide(READ_ALL)).rows[0]
  expect(row?.setBonuses.map((bonus) => bonus.numRequired)).toEqual([1, 2, 3, 5])
})

test("a map the sweep already emptied reads as no rows and as fully read", () => {
  const accountWide = readMinedAccountWide(minedLua())
  const items = extractMinedItemRows(accountWide)
  const quests = extractMinedQuestRows(accountWide)
  expect(items.rows).toEqual([])
  expect(quests.rows).toEqual([])
  expect(isFullyRead(items.diagnostics)).toBe(true)
  expect(isFullyRead(quests.diagnostics)).toBe(true)
})

test("an entry carrying a key the shape does not name is counted, not thrown on", () => {
  const accountWide = readMinedAccountWide(
    minedLua([{ id: 700001 }, { id: 700002, unknownField: true }, { id: 700003 }])
  )
  const { rows, diagnostics } = extractMinedItemRows(accountWide)
  expect(diagnostics.unreadableIds).toEqual([700002])
  expect(rows.map((row) => row.itemId)).toEqual([700001, 700003])
  expect(isFullyRead(diagnostics)).toBe(false)
  expect(diagnostics.reasons).toEqual([{ reason: "unrecognized_keys", count: 1 }])
})

test("a set-bonus member the shape refuses is named by its own record key", () => {
  const accountWide = readMinedAccountWide(
    minedLua([{ id: 700001 }, { id: 700002, malformedSetBonus: true }, { id: 700003 }])
  )
  const { rows, diagnostics } = extractMinedItemRows(accountWide)
  expect(diagnostics.unreadableIds).toEqual([700002])
  expect(rows.map((row) => row.itemId)).toEqual([700001, 700003])
  expect(diagnostics.reasons).toEqual([
    { reason: "invalid_type at setBonuses.4.numRequired", count: 1 },
  ])
})

test("a key that is no integer is recorded rather than dropped in silence", () => {
  const accountWide = readMinedAccountWide(
    minedLua([{ id: 700001 }, { id: 700002, key: '["oops"]' }])
  )
  const { rows, diagnostics } = extractMinedItemRows(accountWide)
  expect(diagnostics.nonIntegerKeys).toEqual(["oops"])
  expect(diagnostics.unreadableIds).toEqual([])
  expect(isFullyRead(diagnostics)).toBe(false)
  expect(rows.map((row) => row.itemId)).toEqual([700001])
})

test("the reason the most entries were refused for is named first", () => {
  const accountWide = readMinedAccountWide(
    minedLua([
      { id: 700001 },
      { id: 700002, unknownField: true },
      { id: 700003, unknownField: true },
      { id: 700004, unknownField: true },
      { id: 700005, malformedSetBonus: true },
    ])
  )
  const { diagnostics } = extractMinedItemRows(accountWide)
  expect(diagnostics.reasons).toEqual([
    { reason: "unrecognized_keys", count: 3 },
    { reason: "invalid_type at setBonuses.4.numRequired", count: 1 },
  ])
  expect(diagnostics.unreadableIds).toEqual([700002, 700003, 700004, 700005])
})
