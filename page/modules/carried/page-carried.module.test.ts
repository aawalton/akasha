import { expect, test } from "bun:test"
import {
  carriedFiled,
  carryingAt,
  linesFor,
} from "akasha/page/modules/carried/page-carried.module.code.ts"

test("the file sits beside the page under the property slug", () => {
  expect(carryingAt("akasha/a.module.ts")).toBe("akasha/a.module.carried.jsonl")
})

test("a path that is no typescript file has no file beside it", () => {
  expect(carryingAt("akasha/a.module.jsonl")).toBe(null)
})

test("a path is told to be one of these files by how it ends", () => {
  expect(carriedFiled("akasha/a.module.carried.jsonl")).toBe(true)
  expect(carriedFiled("akasha/a.module.referenced-by.jsonl")).toBe(false)
  expect(carriedFiled("akasha/a.module.ts")).toBe(false)
})

test("a line holds one key a page states, under that key", () => {
  expect(linesFor({ slug: "a", many: false })).toEqual(['{"many":false}', '{"slug":"a"}'])
})

test("the lines are sorted as text", () => {
  expect(linesFor({ b: 2, a: 1, c: 3 })).toEqual(['{"a":1}', '{"b":2}', '{"c":3}'])
})

test("a page stating nothing composes no line", () => {
  expect(linesFor({})).toEqual([])
})

test("a value of its own shape is held whole on the line", () => {
  expect(linesFor({ parts: ["domain/a", "domain/b"] })).toEqual([
    '{"parts":["domain/a","domain/b"]}',
  ])
})
