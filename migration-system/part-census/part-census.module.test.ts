import { expect, test } from "bun:test"
import type { Filed, Naming } from "./part-census.module.code.ts"
import { censusIn, censusSaid, countedIn, faultedIn, pathsIn } from "./part-census.module.code.ts"

const NAMED = "01a06957-955c-7cf6-9b2b-b7ef62ac9c75"

const UNNAMED = "01a06957-955c-7cf6-9b2b-000000000000"

const WHOLE = "01a06957-955c-7cf6-9b2b-111111111111"

const OVER = "akasha/"

const AT_THE_WHOLE = "akasha/akasha.domain.ts"

function shownAt(path: string): string | null {
  if (!path.startsWith(OVER)) return null
  return path.slice(OVER.length).replace(".ts", "")
}

function namingOf(
  pages: ReadonlyMap<string, readonly Filed[]>,
  namers: ReadonlyMap<string, readonly string[]>
): Naming {
  return {
    kinds: new Set(pages.keys()),
    pagesOf: (kind) => pages.get(kind) ?? [],
    addressOf: shownAt,
    shownOf: (path) => (path === AT_THE_WHOLE ? null : shownAt(path)),
    namersOf: (id) => namers.get(id) ?? [],
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
  ["domain", [{ id: WHOLE, path: AT_THE_WHOLE }]],
])

const NOBODY = new Map<string, readonly string[]>()

const ONE_EACH = new Map<string, readonly string[]>([
  [NAMED, [WHOLE]],
  [UNNAMED, [WHOLE]],
])

const HALF = new Map<string, readonly string[]>([[NAMED, [WHOLE]]])

const RINGING = new Map<string, readonly string[]>([
  [NAMED, [UNNAMED]],
  [UNNAMED, [NAMED]],
])

const TWICE = new Map<string, readonly string[]>([
  [NAMED, [WHOLE, UNNAMED]],
  [UNNAMED, [WHOLE]],
])

test("a page no page names among its parts is answered", () => {
  const census = censusIn(namingOf(PAGES, HALF))
  expect(census.judged).toBe(2)
  expect(pathsIn(census)).toEqual(["akasha/two/module-two"])
})

test("the whole is left out of the judging", () => {
  const census = censusIn(namingOf(PAGES, ONE_EACH))
  expect(census.judged).toBe(2)
  expect(census.unnamed).toEqual([])
  expect(census.byKind.get("domain")).toBeUndefined()
})

test("a fault seeded on the named page is seen", () => {
  const census = censusIn(namingOf(PAGES, NOBODY))
  expect(pathsIn(census)).toEqual(["akasha/one/module-one", "akasha/two/module-two"])
})

test("the count of pages each page type gave is answered", () => {
  const census = censusIn(namingOf(PAGES, ONE_EACH))
  expect(census.byKind.get("module")).toBe(2)
  expect(countedIn(census)).toEqual(["  module: 2"])
})

test("the census is said as lines naming each page left unnamed", () => {
  const said = censusSaid(censusIn(namingOf(PAGES, HALF)))
  expect(said[2]).toBe("pages no page above them names among its parts: 1")
  expect(said[3]).toBe("  two/module-two — akasha/two/module-two")
})

test("a page exactly one page names is neither unnamed nor shared", () => {
  const census = censusIn(namingOf(PAGES, ONE_EACH))
  expect(census.unnamed).toEqual([])
  expect(census.shared).toEqual([])
  expect(faultedIn(census)).toBe(false)
})

test("a page more than one page names is answered beside the pages naming it", () => {
  const census = censusIn(namingOf(PAGES, TWICE))
  expect(census.unnamed).toEqual([])
  expect(census.shared.map((one) => one.shown)).toEqual(["one/module-one"])
  expect(census.shared[0]?.namedBy).toEqual(["akasha.domain", "two/module-two"])
  expect(pathsIn(census)).toEqual(["akasha/one/module-one"])
  expect(faultedIn(census)).toBe(true)
})

test("the census says how many pages more than one page names", () => {
  const said = censusSaid(censusIn(namingOf(PAGES, TWICE)))
  expect(said[3]).toBe("pages more than one page names among its parts: 1")
  expect(said[4]).toBe("  one/module-one — akasha.domain, two/module-two")
})

test("a page no page names is faulted as well", () => {
  expect(faultedIn(censusIn(namingOf(PAGES, HALF)))).toBe(true)
})

test("a ring of pages naming each other is seen though each has exactly one parent", () => {
  const census = censusIn(namingOf(PAGES, RINGING))
  expect(census.unnamed).toEqual([])
  expect(census.shared).toEqual([])
  expect(census.looping.map((one) => one.shown)).toEqual(["one/module-one", "two/module-two"])
  expect(faultedIn(census)).toBe(true)
})

test("a page reached by descending from the whole is not looping", () => {
  const census = censusIn(namingOf(PAGES, ONE_EACH))
  expect(census.looping).toEqual([])
  expect(faultedIn(census)).toBe(false)
})

test("a page adrift because the page above it is unnamed is answered once", () => {
  const census = censusIn(namingOf(PAGES, HALF))
  expect(census.looping).toEqual([])
})

test("the census says how many pages loop rather than reaching the whole", () => {
  const said = censusSaid(censusIn(namingOf(PAGES, RINGING)))
  expect(said[4]).toBe("pages whose parents loop rather than reaching `domain/akasha`: 2")
  expect(said[5]).toBe("  one/module-one — akasha/one/module-one")
})
