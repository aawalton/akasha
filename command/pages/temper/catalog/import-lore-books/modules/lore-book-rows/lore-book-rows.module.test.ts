import { expect, test } from "bun:test"
import {
  mapCountsOf,
  placesOf,
  shalidorPinsOf,
  tableValuesOf,
} from "akasha/command/pages/temper/catalog/import-lore-books/modules/lore-book-rows/lore-book-rows.module.code.ts"

test("a place is carried under the names its properties give it", () => {
  expect(placesOf({ e: [{ mn: 11, pm: 7, px: 0.5, py: 0.25, d: true }] })).toEqual([
    { mn: 11, mapId: 7, mapX: 0.5, mapY: 0.25, dungeon: true },
  ])
})

test("a place tucked inside a place under `4` is carried as its alternate", () => {
  expect(placesOf({ e: [{ 4: { fp: true, pm: 511 }, pm: 7 }] })).toEqual([
    { alternate: { fp: true, mapId: 511 }, mapId: 7 },
  ])
})

test("a place holding a key no property carries is refused", () => {
  expect(() => placesOf({ e: [{ gp: true }] })).toThrow()
})

test("a map gives a book a count or a mark", () => {
  expect(mapCountsOf({ m: { 1: 9, 2114: true } })).toEqual([
    { mapId: 1, mapCount: 9 },
    { mapId: 2114, mapFlagged: true },
  ])
})

test("a book's own id repeated inside it is kept as a mark", () => {
  expect(tableValuesOf(1566, { c: true, e: [], k: 1566 })).toEqual({
    esoBookId: 1566,
    charted: true,
    keyed: true,
  })
})

test("a title the table holds as a number is kept as a number", () => {
  expect(tableValuesOf(5666, { c: true, e: [], n: 6403 }).numberedTitle).toBe(6403)
})

test("a Shalidor pin is found by its collection and book, with its place in its map's list", () => {
  const table = {
    63: [
      { 1: 0.1, 2: 0.2, 3: 1, 4: 2 },
      { 1: 0.3, 2: 0.4, 3: 1, 4: 1, 5: 279, ld: [5] },
    ],
    1: [{ 1: 0.5, 2: 0.6, 3: 1, 4: 1 }],
  }
  expect(shalidorPinsOf(table, 1, 1)).toEqual([
    { mapId: 1, mapOrder: 1, mapX: 0.5, mapY: 0.6 },
    { mapId: 63, mapOrder: 2, mapX: 0.3, mapY: 0.4, esoZoneId: 279, locationDetails: [5] },
  ])
})
