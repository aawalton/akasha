import { expect, test } from "bun:test"
import { linesFor, ranValue } from "akasha/page/body-read-cost/body-read-cost.performance.code.ts"

const A = "01a04b79-0000-7000-8000-00000000000a"

test("a line says what a way was called, how many pages it read and what it took", () => {
  expect(linesFor([{ name: "read off the text", pages: 2000, milliseconds: 4 }])).toEqual([
    "read off the text\t2000 pages\t4ms\t2.00us a page",
  ])
})

test("a way that read no page is said to have taken nothing a page", () => {
  expect(linesFor([{ name: "run as code", pages: 0, milliseconds: 0 }])).toEqual([
    "run as code\t0 pages\t0ms\t0.00us a page",
  ])
})

test("running a body answers the first object that body exports", () => {
  expect(ranValue(`export const it = { id: "${A}" } as const\n`)).toEqual({ id: A })
})

test("a body the running throws on is counted rather than ending the run", () => {
  expect(ranValue("the new body")).toBe(null)
})
