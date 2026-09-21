import { afterAll, expect, test } from "bun:test"
import {
  namingsIn,
  refusalsOver,
  viewsIn,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.code.ts"
import {
  QUOIN,
  rooted,
  scratch,
  viewing,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.test-fixtures.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Keying } from "akasha/page/view/modules/key-naming/key-naming.module.code.ts"

const UNDER = "akasha-viewed-decision-"

const LISTS_QUOIN = `page-type/${QUOIN}`

const KEYING: readonly Keying[] = [
  { key: "grouped", within: null },
  { key: "shown", within: null },
  { key: "ordering", within: "key" },
]

afterAll(scratch.sweep)

function judged(root: string): readonly string[] {
  const shadow = shadowAt(root)
  return refusalsOver(viewsIn(shadow), shadow).map((one) => one.reason)
}

test("a field holding one text names one key", () => {
  expect(namingsIn({ grouped: "held" }, KEYING)).toEqual([{ key: "held", at: "grouped" }])
})

test("a field holding many texts names a key in each of them", () => {
  expect(namingsIn({ shown: ["held", "gone"] }, KEYING)).toEqual([
    { key: "held", at: "shown[0]" },
    { key: "gone", at: "shown[1]" },
  ])
})

test("a field of a record names the key that record states under it", () => {
  expect(namingsIn({ ordering: [{ key: "held", descending: false }] }, KEYING)).toEqual([
    { key: "held", at: "ordering[0].key" },
  ])
})

test("a field the view states nothing under names no key", () => {
  expect(namingsIn({}, KEYING)).toEqual([])
})

test("a view naming a key its page type declares is let through", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: LISTS_QUOIN, shown: ["held"], grouped: "held" })

  expect(judged(root)).toEqual([])
})

test("a view naming a key its page type declares nothing for is refused", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: LISTS_QUOIN, shown: ["held", "gone"] })

  const said = judged(root)

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`gone` at `shown[1]`")
  expect(said[0]).toContain(`\`${QUOIN}\` page type declares no such key`)
  expect(said[0]).toContain("the keys are")
})

test("a key a record of a view states is judged like any other", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: LISTS_QUOIN, ordering: [{ key: "gone" }] })

  expect(judged(root)[0] ?? "").toContain("`gone` at `ordering[0].key`")
})

test("a key parted by dots is judged by the segment before the first dot", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: LISTS_QUOIN, grouped: "held.deeper" })

  expect(judged(root)).toEqual([])
})

test("a view listing no page type is passed over", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { shown: ["gone"] })

  expect(judged(root)).toEqual([])
})

test("a view listing a page type that cannot be read is passed over", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: "page-type/nowhere", shown: ["gone"] })

  expect(judged(root)).toEqual([])
})

test("every view the index files is gathered", () => {
  const root = rooted(UNDER)
  const one = viewing(root, "looking", { pageType: LISTS_QUOIN })
  const two = viewing(root, "other", { pageType: LISTS_QUOIN })

  expect(viewsIn(shadowAt(root)).map((each) => each.path)).toEqual([one, two].sort())
})
