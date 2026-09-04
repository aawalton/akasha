import { expect, test } from "bun:test"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { landedChecked } from "@akasha/command-system/checked-landing"
import type { Composed } from "../landing/migration-landing.module.code.ts"
import { landingFor, makesAPage, takesAway } from "./migration-checked-landing.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..")

const HERE = "akasha/migration-system/checked-landing"

const WROTE: Composed = { path: "akasha/one.ts", body: "one" }

const TOOK: Composed = { path: "akasha/two.ts", body: null }

function pageBody(slug: string): string {
  return `export const one = {
  pageTypeSlug: "module",
  slug: "${slug}",
}
`
}

const MADE: Composed = {
  path: `${HERE}/zz-no-such-module.module.ts`,
  body: pageBody("zz-no-such-module"),
}

const STANDING: Composed = {
  path: `${HERE}/migration-checked-landing.module.ts`,
  body: pageBody("migration-checked-landing"),
}

const OUTSIDE: Composed = {
  path: "tools/lib/zz-no-such-module.module.ts",
  body: pageBody("zz-no-such-module"),
}

test("bodies that only write take nothing away", () => {
  expect(takesAway([WROTE, WROTE])).toBe(false)
})

test("one body of nothing takes a file away", () => {
  expect(takesAway([WROTE, TOOK])).toBe(true)
})

test("nothing composed takes nothing away", () => {
  expect(takesAway([])).toBe(false)
})

test("a page composed where no file stands is a page put up", () => {
  expect(makesAPage(ROOT, [WROTE, MADE])).toBe(true)
})

test("a page composed over a file already standing puts up no page", () => {
  expect(makesAPage(ROOT, [STANDING])).toBe(false)
})

test("a page put up outside the akasha folder is judged by no check", () => {
  expect(makesAPage(ROOT, [OUTSIDE])).toBe(false)
})

test("a body that is no page puts up no page", () => {
  expect(makesAPage(ROOT, [WROTE])).toBe(false)
})

test("nothing composed puts up no page", () => {
  expect(makesAPage(ROOT, [])).toBe(false)
})

test("bodies that take a file away land through the checks", () => {
  expect(landingFor(ROOT, [WROTE, TOOK])).toBe(landedChecked)
})

test("bodies that put up a page land through the checks", () => {
  expect(landingFor(ROOT, [MADE])).toBe(landedChecked)
})

test("bodies that only write over files already standing land the way they landed before", () => {
  expect(landingFor(ROOT, [WROTE, STANDING])).toBe(landedMechanically)
})
