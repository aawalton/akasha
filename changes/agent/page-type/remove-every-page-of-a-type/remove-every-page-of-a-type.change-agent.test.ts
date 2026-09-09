import { afterAll, expect, test } from "bun:test"
import {
  aType,
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as removeFile } from "../../../mechanical/file/remove/remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange as removeCodeFile } from "../../../mechanical/file/remove/remove-file-code/remove-file-code.change-mechanical.code.ts"
import { runChange as removePage } from "../../../mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.code.ts"
import { removePropertyValue } from "../../../mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  removeEveryPageOfAType,
  runChange,
} from "./remove-every-page-of-a-type.change-agent.code.ts"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const REMOVE_FILE_CODE = "change-mechanical/remove-file-code"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical-file-content/remove-property-value"

type Unnaming = { at: string; key: string; value: string }

const REACHES: Reaching = async (world, at, given) => {
  if (at === REMOVE_FILE_PAGE) return await removePage(world, given as { at: string })
  if (at === REMOVE_FILE_CODE) return await removeCodeFile(world, given as { at: string })
  if (at === REMOVE_FILE) return removeFile(world, given as { at: string })
  if (at === REMOVE_PROPERTY_VALUE) return removePropertyValue(world, given as Unnaming)
  return refusing(`\`${at}\` is reached by nothing here`)
}

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
  return worldAt(root, textIn(root), REACHES)
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

  const said = await removeEveryPageOfAType(ledgerAt(root, textIn(root), REACHES), {
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

  const said = await removeEveryPageOfAType(worldAt(root, gone, REACHES), { pageType: "leaf" })

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
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf", count: 1 })

  expect(said.refused).toBe(null)
  const taken = [...pathsIn(said)]
  expect(taken).toHaveLength(1)
  expect([ONE_AT, TWO_AT]).toContain(taken[0] ?? "")
})

test("a count above the pages there are takes every page", async () => {
  const said = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf", count: 5 })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([ONE_AT, TWO_AT])
})

test("a count handed in as text takes that many pages", async () => {
  const said = await runChange(leafWorld(), { "page-type": "leaf", count: "1" })

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)]).toHaveLength(1)
})

test("a count that is no whole number above nothing is refused", async () => {
  const fraction = await removeEveryPageOfAType(leafWorld(), { pageType: "leaf", count: 1.5 })
  const text = await runChange(leafWorld(), { "page-type": "leaf", count: "two" })
  const nothing = await runChange(leafWorld(), { "page-type": "leaf", count: "0" })

  expect(fraction.edits).toEqual([])
  expect(fraction.refused ?? "").toContain("`1.5` is no whole number above nothing")
  expect(text.edits).toEqual([])
  expect(text.refused ?? "").toContain("`two` is no whole number above nothing")
  expect(nothing.edits).toEqual([])
  expect(nothing.refused ?? "").toContain("`0` is no whole number above nothing")
})
