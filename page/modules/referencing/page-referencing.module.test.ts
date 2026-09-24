import { expect, test } from "bun:test"
import {
  IMPORT,
  type Reference,
  referenceIn,
  referencesAt,
  referencesEach,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { bodyOf } from "akasha/page/modules/referencing/page-referencing.module.test-fixtures.ts"

const NAMED: Reference = {
  propertySlug: "parts",
  fileName: null,
  path: "b/b.domain.ts",
  id: "01a0a2e9-c513-7eed-aa47-3b272814218c",
}

const IMPORTED: Reference = {
  propertySlug: IMPORT,
  fileName: "x.module.code.ts",
  path: "a/a.module.code.ts",
  id: null,
}

const ALSO_IMPORTED: Reference = { ...IMPORTED, path: "c/c.module.code.ts" }

test("the file sits beside the page under the property slug", () => {
  expect(referencesAt("akasha/a.module.ts")).toBe("akasha/a.module.referenced-by.jsonl")
})

test("a path that is no typescript file has no file beside it", () => {
  expect(referencesAt("akasha/a.module.jsonl")).toBe(null)
})

test("a line leaves out what it has nothing for", () => {
  expect(bodyOf([IMPORTED])).toBe(
    '{"propertySlug":"import","fileName":"x.module.code.ts","path":"a/a.module.code.ts"}\n'
  )
  expect(bodyOf([NAMED])).toBe(
    '{"propertySlug":"parts","path":"b/b.domain.ts","id":"01a0a2e9-c513-7eed-aa47-3b272814218c"}\n'
  )
})

test("the lines are sorted by what they come through, then the file, then where they are from", () => {
  const body = bodyOf([NAMED, ALSO_IMPORTED, IMPORTED])
  expect(body.split("\n").slice(0, 3)).toEqual([
    '{"propertySlug":"import","fileName":"x.module.code.ts","path":"a/a.module.code.ts"}',
    '{"propertySlug":"import","fileName":"x.module.code.ts","path":"c/c.module.code.ts"}',
    '{"propertySlug":"parts","path":"b/b.domain.ts","id":"01a0a2e9-c513-7eed-aa47-3b272814218c"}',
  ])
})

test("two references alike are one line", () => {
  expect(bodyOf([IMPORTED, { ...IMPORTED }])).toBe(bodyOf([IMPORTED]))
})

test("a page nothing references composes an empty body", () => {
  expect(bodyOf([])).toBe("")
})

test("a line read back is the reference it was composed from", () => {
  expect(referencesEach(bodyOf([NAMED, IMPORTED]).split("\n").slice(0, 2))).toEqual([
    IMPORTED,
    NAMED,
  ])
})

test("an import's line carries whether it names a type and whether it is followed later", () => {
  const typed: Reference = { ...IMPORTED, typed: true, deferred: false }

  expect(bodyOf([typed])).toBe(
    '{"propertySlug":"import","fileName":"x.module.code.ts","path":"a/a.module.code.ts","typed":true,"deferred":false}\n'
  )
  expect(referencesEach(bodyOf([typed]).split("\n").slice(0, 1))).toEqual([typed])
})

test("a line that will not parse is left out rather than thrown over", () => {
  expect(referenceIn("{")).toBe(null)
  expect(referenceIn("[]")).toBe(null)
  expect(referenceIn('{"propertySlug":"parts"}')).toBe(null)
  expect(referencesEach(["{", '{"propertySlug":"parts","path":"b/b.domain.ts"}'])).toEqual([
    { propertySlug: "parts", fileName: null, path: "b/b.domain.ts", id: null },
  ])
})
