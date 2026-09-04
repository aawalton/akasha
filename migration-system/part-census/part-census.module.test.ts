import { expect, test } from "bun:test"
import type { Filed, Naming } from "./part-census.module.code.ts"
import { censusIn, censusSaid, countedIn, pathsIn } from "./part-census.module.code.ts"

const NAMED = "01a06957-955c-7cf6-9b2b-b7ef62ac9c75"

const UNNAMED = "01a06957-955c-7cf6-9b2b-000000000000"

const WHOLE = "01a06957-955c-7cf6-9b2b-111111111111"

function namingOf(
  pages: ReadonlyMap<string, readonly Filed[]>,
  named: ReadonlySet<string>
): Naming {
  return {
    kinds: new Set(pages.keys()),
    pagesOf: (kind) => pages.get(kind) ?? [],
    shownOf: (path) => {
      if (path === "akasha/akasha.domain.ts") return null
      if (!path.startsWith("akasha/")) return null
      return path.slice("akasha/".length).replace(".ts", "")
    },
    namersOf: (id) => (named.has(id) ? 1 : 0),
  }
}

const PAGES = new Map<string, readonly Filed[]>([
  [
    "module",
    [
      { id: NAMED, path: "akasha/one/module-one" },
      { id: UNNAMED, path: "akasha/two/module-two" },
    ],
  ],
  ["domain", [{ id: WHOLE, path: "akasha/akasha.domain.ts" }]],
])

test("a page no page names among its parts is answered", () => {
  const census = censusIn(namingOf(PAGES, new Set([NAMED])))
  expect(census.judged).toBe(2)
  expect(pathsIn(census)).toEqual(["akasha/two/module-two"])
})

test("the whole is left out of the judging", () => {
  const census = censusIn(namingOf(PAGES, new Set([NAMED, UNNAMED])))
  expect(census.judged).toBe(2)
  expect(census.unnamed).toEqual([])
  expect(census.byKind.get("domain")).toBeUndefined()
})

test("a fault seeded on the named page is seen", () => {
  const census = censusIn(namingOf(PAGES, new Set()))
  expect(pathsIn(census)).toEqual(["akasha/one/module-one", "akasha/two/module-two"])
})

test("the count of pages each page type gave is answered", () => {
  const census = censusIn(namingOf(PAGES, new Set([NAMED, UNNAMED])))
  expect(census.byKind.get("module")).toBe(2)
  expect(countedIn(census)).toEqual(["  module: 2"])
})

test("the census is said as lines naming each page left unnamed", () => {
  const said = censusSaid(censusIn(namingOf(PAGES, new Set([NAMED]))))
  expect(said[2]).toBe("pages no page above them names among its parts: 1")
  expect(said[3]).toBe("  two/module-two — akasha/two/module-two")
})
