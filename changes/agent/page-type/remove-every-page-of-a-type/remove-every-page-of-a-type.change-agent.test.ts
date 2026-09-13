import { afterAll, expect, test } from "bun:test"
import {
  removeEveryPageOfAType,
  runChange,
} from "akasha/changes/agent/page-type/remove-every-page-of-a-type/remove-every-page-of-a-type.change-agent.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  aType,
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/pages/indexes/modules/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const LEAF_TYPE = "akasha/leaf.page-type.ts"

const ONE_AT = "akasha/leaves/one.leaf.ts"

const TWO_AT = "akasha/leaves/two.leaf.ts"

const LEAVES: Readonly<Record<string, string>> = {
  [LEAF_TYPE]: bodyOf(aType(idOf("d"), "leaf", ["page-type/page"])[1]),
  "akasha/twig.page-type.ts": bodyOf(aType(idOf("0"), "twig", ["page-type/page"])[1]),
  [ONE_AT]: pageOf({ id: idOf("e"), pageTypeSlug: "leaf", slug: "one" }),
  [TWO_AT]: pageOf({ id: idOf("f"), pageTypeSlug: "leaf", slug: "two" }),
}

function leafWorld(): World {
  const root = indexedRepo(LEAVES)
  return worldAt(root, textIn(root), running)
}

test("every page of the page type is taken away", async () => {
  const world = leafWorld()

  const said = await removeEveryPageOfAType(world, { pageType: "leaf" })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([ONE_AT, TWO_AT])
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT)).toBe(null)
  expect(bodies.get(TWO_AT)).toBe(null)
})

test("the page stating the page type is no page of that type and remains", async () => {
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf" })

  expect(pathsIn(said)).not.toContain(LEAF_TYPE)
})

test("every page is taken away over a ledger too", async () => {
  const root = indexedRepo(LEAVES)

  const said = await removeEveryPageOfAType(ledgerAt(root, textIn(root), running), {
    pageType: "leaf",
  })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([ONE_AT, TWO_AT])
})

test("a page type the index does not name is refused", async () => {
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "bough" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`bough` names no page type")
})

test("a page type no page is of is refused rather than answered as no edit", async () => {
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "twig" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no page is a `twig`")
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const root = indexedRepo(LEAVES)
  const only = textIn(root)
  const gone = (path: string): string | null => (path === TWO_AT ? null : only(path))

  const said = await removeEveryPageOfAType(worldAt(root, gone, running), { pageType: "leaf" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
  expect(said.refused ?? "").toContain("is refused, and")
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(leafWorld(), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})

test("a count below the pages there are takes that many and no more", async () => {
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf", atMost: 1 })

  expect(said.refused).toBe(null)
  const taken = [...pathsIn(said)]
  expect(taken).toHaveLength(1)
  expect([ONE_AT, TWO_AT]).toContain(taken[0] ?? "")
})

test("a count above the pages there are takes every page", async () => {
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf", atMost: 5 })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([ONE_AT, TWO_AT])
})

test("a count handed in as text takes that many pages", async () => {
  const said = await runChange(leafWorld(), { "page-type": "leaf", "at-most": "1" })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)]).toHaveLength(1)
})

test("a count that is no whole number above nothing is refused", async () => {
  const fraction = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf", atMost: 1.5 })
  const text = await runChange(leafWorld(), { "page-type": "leaf", "at-most": "two" })
  const nothing = await runChange(leafWorld(), { "page-type": "leaf", "at-most": "0" })

  expect(fraction.edits).toEqual([])
  expect(fraction.refused ?? "").toContain("`1.5` is no count of pages")
  expect(text.edits).toEqual([])
  expect(text.refused ?? "").toContain("`two` is no count of pages")
  expect(nothing.edits).toEqual([])
  expect(nothing.refused ?? "").toContain("`0` is no count of pages")
})
