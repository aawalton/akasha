import { afterAll, expect, test } from "bun:test"
import {
  reasonFor,
  refusalsOver,
} from "akasha/checks/code-checks/pages/parts-list-is-sorted/parts-list-is-sorted.code-check.decision.code.ts"
import {
  AT,
  domainBody,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/parts-list-is-sorted/parts-list-is-sorted.code-check.decision.test-fixtures.ts"
import { judgingBy, landing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(refusalsOver)

function over(stated: string): readonly string[] {
  return judging(landing(rooted(), { [AT]: domainBody(stated) })).map((one) => one.reason)
}

test("a list whose parts rise raises nothing", () => {
  expect(reasonFor(["domain/a", "domain/b", "module/a"])).toBeNull()
})

test("a list of one part and a list of none raise nothing", () => {
  expect(reasonFor([])).toBeNull()
  expect(reasonFor(["module/z"])).toBeNull()
})

test("a part written after one above it is refused", () => {
  expect(reasonFor(["module/z", "domain/a"])).toContain("`domain/a` after `module/z`")
})

test("a slug is read under the page type written with it rather than on its own", () => {
  expect(reasonFor(["module/z", "namespace/a"])).toBeNull()
  expect(reasonFor(["namespace/a", "module/z"])).toContain("`module/z` after `namespace/a`")
})

test("two parts spelled alike are in order either way round", () => {
  expect(reasonFor(["domain/a", "domain/a"])).toBeNull()
})

test("a refusal names the first pair out of order rather than every pair", () => {
  const said = reasonFor(["module/c", "module/b", "module/a"])
  expect(said).toContain("`module/b` after `module/c`")
  expect(said).not.toContain("module/a")
})

test("a page naming its parts in order is let through", () => {
  expect(over('parts: ["domain/a", "domain/b"]')).toEqual([])
})

test("a page naming its parts out of order is refused", () => {
  expect(over('parts: ["domain/b", "domain/a"]')).toHaveLength(1)
})

test("a page naming no part is passed over", () => {
  expect(over('definition: "held"')).toEqual([])
})

test("a file the index does not name as a page is passed over", () => {
  const body = domainBody('parts: ["domain/b", "domain/a"]')
  expect(judging(landing(rooted(), { "akasha/held.ts": body }))).toEqual([])
})

test("a page whose body will not load is passed over rather than thrown on", () => {
  const body = bytesOf("export const held = (\n")
  expect(judging(landing(rooted(), { [AT]: body }))).toEqual([])
})

test("a page the change takes away is passed over", () => {
  expect(judging(landing(rooted(), { [AT]: null }))).toEqual([])
})
