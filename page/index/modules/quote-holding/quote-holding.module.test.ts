import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { facingOn } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import {
  facingSaying,
  idOf,
  ONE,
  THING,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.test-fixtures.ts"
import {
  quotedIn,
  quotes,
} from "akasha/page/index/modules/quote-holding/quote-holding.module.code.ts"
import {
  listedAndValued,
  relationFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CASES = idOf("10")

const AT = "akasha/cases.page-property-entry.ts"

const TYPE_AT = "akasha/thing.page-type.ts"

const SECTIONED = "akasha/one.thing.cases.jsonl"

const SAID: Value = {
  id: CASES,
  pageTypeSlug: "page-property-entry",
  slug: "cases",
  propertySlug: "cases",
}

function rooted(said: Value): string {
  const root = scratch.rootFor("akasha-quoting-")
  listedAndValued(root, "page-type", "thing", TYPE_AT, THING)
  idFiled(root, THING, [{ path: TYPE_AT, id: THING }])
  listedAndValued(root, "thing", "one", "akasha/one.thing.ts", ONE)
  shapeAdded(root, "page-property-entry", "cases", [
    {
      pageTypeSlug: "page-property-entry",
      targetPageTypeSlug: null,
      unique: null,
      slug: "cases",
      propertySlug: "cases",
      fileName: null,
    },
  ])
  listedFiled(root, "page-property-entry", "cases", [{ path: AT, id: CASES }])
  valueAlsoFiled(root, "page-property-entry", [{ path: AT, value: said }])
  idFiled(root, CASES, [{ path: AT, id: CASES }])
  relationFiled(root, CASES, "page-property", THING, [{ path: TYPE_AT }])
  return root
}

test("a property saying its words are kept as they were said says so of its value", () => {
  expect(quotes({ quoted: true })).toBe(true)
})

test("a property saying nothing of its words says nothing of its value", () => {
  expect(quotes({ fileName: "bun.lock" })).toBe(false)
})

test("a property whose entries sit beside a page says those entries are kept as said", () => {
  expect(quotedIn(facingOn(rooted({ ...SAID, quoted: true })), SECTIONED)).toBe(true)
})

test("a property saying nothing of its words says nothing of the entries beside a page", () => {
  expect(quotedIn(facingOn(rooted(SAID)), SECTIONED)).toBe(false)
})

test("a page's own file carries no section, so the page holds no words kept that way", () => {
  expect(quotedIn(facingOn(rooted({ ...SAID, quoted: true })), "akasha/one.thing.ts")).toBe(false)
})

test("a file beside a property saying its words are kept as they were said is answered so", () => {
  expect(quotedIn(facingSaying({ fileName: "bun.lock", quoted: true }), "bun.lock")).toBe(true)
})

test("a file beside a property saying nothing of its words is answered no", () => {
  expect(quotedIn(facingSaying({ fileName: "bun.lock" }), "bun.lock")).toBe(false)
})
