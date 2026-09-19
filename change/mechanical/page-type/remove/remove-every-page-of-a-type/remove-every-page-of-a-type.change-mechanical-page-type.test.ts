import { afterAll, expect, test } from "bun:test"
import {
  removeEveryPageOfAType,
  runChange,
} from "akasha/change/mechanical/page-type/remove/remove-every-page-of-a-type/remove-every-page-of-a-type.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import {
  aProperty,
  aType,
  bodyOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const SPRIG_TYPE = "akasha/sprig.page-type.ts"

const TWIG_TYPE = "akasha/twig.page-type.ts"

const ONE_AT = "akasha/sprigs/one.sprig.ts"

const ONE_CODE = "akasha/sprigs/one.sprig.code.ts"

const TWO_AT = "akasha/sprigs/two.sprig.ts"

const GROVE_AT = "akasha/sprigs/grove.module.ts"

const PARTING = aProperty("01a04a4a-0003-7000-8000-000000000006", "parts", "relation-property", {
  targetPageType: "domain",
})

const PARTING_MODULE = aType(
  "01a04a4a-0000-7000-8000-000000000006",
  "module",
  [DOMAIN_AT],
  ["code", "test", "note", "part-slugs", "parts"]
)

const SPRIGS: Readonly<Record<string, string>> = {
  [`akasha/${PARTING[0]}`]: bodyOf(PARTING[1]),
  [`akasha/${PARTING_MODULE[0]}`]: bodyOf(PARTING_MODULE[1]),
  [SPRIG_TYPE]: bodyOf(
    aType("01a04a4a-0003-7000-8000-000000000001", "sprig", [DOMAIN_AT], ["code"])[1]
  ),
  [TWIG_TYPE]: bodyOf(aType("01a04a4a-0003-7000-8000-000000000002", "twig", [DOMAIN_AT])[1]),
  [ONE_AT]: pageOf({
    id: "01a04a4a-0003-7000-8000-000000000003",
    pageTypeSlug: "sprig",
    slug: "one",
    code: "ts",
  }),
  [ONE_CODE]: "export const one = 1\n",
  [TWO_AT]: pageOf({
    id: "01a04a4a-0003-7000-8000-000000000004",
    pageTypeSlug: "sprig",
    slug: "two",
  }),
  [GROVE_AT]: pageOf({
    id: "01a04a4a-0003-7000-8000-000000000005",
    pageTypeSlug: "module",
    slug: "grove",
    definition: "a page naming both sprigs in parts",
    parts: ["sprig/one", "sprig/two"],
  }),
}

const REACHED: string[] = []

function sprigWorld(): World {
  const root = indexedRepo(SPRIGS)
  return worldAt(root, textIn(root), listing(REACHED))
}

test("every page of the page type is answered in this one answer", () => {
  const world = sprigWorld()

  const said = removeEveryPageOfAType(world, { pageType: "sprig" })

  expect(said.refused).toBeNull()
  const taken = [...pathsIn(said)]
  expect(taken).toContain(ONE_AT)
  expect(taken).toContain(TWO_AT)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT)).toBeNull()
  expect(bodies.get(TWO_AT)).toBeNull()
})

test("a page and every file that page keeps beside the page go together", () => {
  const world = sprigWorld()

  const said = removeEveryPageOfAType(world, { pageType: "sprig" })

  expect(bodiesIn(said, world.base).get(ONE_CODE)).toBeNull()
})

test("the files beside a page go before that page's own file", () => {
  const taken = [...pathsIn(removeEveryPageOfAType(sprigWorld(), { pageType: "sprig" }))]

  expect(taken.indexOf(ONE_CODE)).toBeLessThan(taken.indexOf(ONE_AT))
})

test("a parent naming two pages that go loses both entries by one edit over it", () => {
  const world = sprigWorld()

  const said = removeEveryPageOfAType(world, { pageType: "sprig" })

  const over = said.edits.filter((one) => one.kind === "replace" && one.path === GROVE_AT)
  expect(over).toHaveLength(1)
  const grove = bodiesIn(said, world.base).get(GROVE_AT) ?? ""
  expect(grove).not.toContain("sprig/one")
  expect(grove).not.toContain("sprig/two")
})

test("every entry in a parent's `parts` is dropped before any file goes", () => {
  const said = removeEveryPageOfAType(sprigWorld(), { pageType: "sprig" })
  const first = said.edits[0]

  expect(first?.kind).toBe("replace")
})

test("the page stating the page type is no page of that type and remains", () => {
  const said = removeEveryPageOfAType(sprigWorld(), { pageType: "sprig" })

  expect(pathsIn(said)).not.toContain(SPRIG_TYPE)
})

test("a page type the index does not name is refused", () => {
  const said = removeEveryPageOfAType(sprigWorld(), { pageType: "bough" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`bough` names no page type")
})

test("a page type no page is of is refused rather than answered as no edit", () => {
  const said = removeEveryPageOfAType(sprigWorld(), { pageType: "twig" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no page is a `twig`")
})

test("a count below the pages there are takes that many and no more", () => {
  const said = runChange(sprigWorld(), { pageType: "sprig", atMost: 1 })

  expect(said.refused).toBeNull()
  const taken = [...pathsIn(said)]
  expect(taken.includes(ONE_AT) && taken.includes(TWO_AT)).toBe(false)
})

test("a count above the pages there are takes every page", () => {
  const said = removeEveryPageOfAType(sprigWorld(), { pageType: "sprig", atMost: 5 })

  expect(said.refused).toBeNull()
  const taken = [...pathsIn(said)]
  expect(taken).toContain(ONE_AT)
  expect(taken).toContain(TWO_AT)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = removeEveryPageOfAType(sprigWorld(), { pageType: "sprig" })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
