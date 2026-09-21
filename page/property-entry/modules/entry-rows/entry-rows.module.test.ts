import { expect, test } from "bun:test"
import { entryRowsIn } from "akasha/page/property-entry/modules/entry-rows/entry-rows.module.code.ts"

test("a file nothing has written yet holds no row", () => {
  expect(entryRowsIn(null)).toEqual([])
})

test("the newline a file ends on is no row of its own", () => {
  expect(entryRowsIn('{"one":1}\n{"one":2}\n')).toEqual(['{"one":1}', '{"one":2}'])
})

test("a line carrying nothing but blanks is no row", () => {
  expect(entryRowsIn('{"one":1}\n   \n\n{"one":2}')).toEqual(['{"one":1}', '{"one":2}'])
})

test("a row is handed back as the file spells that row", () => {
  expect(entryRowsIn('  {"one":1}  ')).toEqual(['  {"one":1}  '])
})
