import { expect, test } from "bun:test"
import { landing } from "../../check-scratch/check-scratch.module.code.ts"
import {
  countAt,
  countingNeverFalls,
  fellTo,
  stoppedAt,
} from "./counting-never-falls.check.code.ts"

const ROOT = "/var/tmp"

const AT = "akasha/held.page-type.ts"

function stated(count: number | null): string {
  const counted = count === null ? "" : `, nextSeq: ${count}`
  return `export const held = { id: "id-held", pageTypeSlug: "page-type", slug: "held"${counted} }\n`
}

function bytesOf(count: number | null): Uint8Array {
  return new TextEncoder().encode(stated(count))
}

function over(was: number | null, now: number | null): readonly string[] {
  const said = countingNeverFalls(
    landing(ROOT, { [AT]: bytesOf(now) }, was === null ? {} : { [AT]: bytesOf(was) })
  )
  for (const one of said) expect(one.path).toBe(AT)
  return said.map((one) => one.reason)
}

test("a count is read off the body, and a body stating none holds none", () => {
  expect(countAt({ nextSeq: 7 })).toBe(7)
  expect(countAt({ nextSeq: "7" })).toBe(null)
  expect(countAt({})).toBe(null)
  expect(countAt(null)).toBe(null)
})

test("a count standing where it stood is let through", () => {
  expect(over(4, 4)).toEqual([])
})

test("a count risen is let through", () => {
  expect(over(4, 9)).toEqual([])
})

test("a count fallen is refused, and the reason names both numbers", () => {
  expect(over(9, 4)).toEqual([fellTo(9, 4)])
})

test("a count dropped altogether is refused", () => {
  expect(over(4, null)).toEqual([stoppedAt(4)])
})

test("a page type that never counted is passed over", () => {
  expect(over(null, null)).toEqual([])
})

test("a page type starting to count is let through", () => {
  expect(over(null, 1)).toEqual([])
})

test("a page type taken away is passed over, its pages going with it", () => {
  expect(countingNeverFalls(landing(ROOT, { [AT]: null }, { [AT]: bytesOf(9) }))).toEqual([])
})

test("a page that is no page type is passed over", () => {
  const at = "akasha/held.module.ts"
  expect(countingNeverFalls(landing(ROOT, { [at]: bytesOf(1) }, { [at]: bytesOf(9) }))).toEqual([])
})
