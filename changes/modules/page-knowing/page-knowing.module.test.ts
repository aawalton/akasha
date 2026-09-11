import { afterAll, expect, test } from "bun:test"
import {
  afterIn,
  namersIn,
  pageIn,
  readFor,
  singleIn,
  spelledIn,
  targetsIn,
} from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  NOTHING_OVER,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_PAGE,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

afterAll(scratch.sweep)

const MISSING = "akasha/one/missing.module.ts"

function worldIn(): World {
  const root = indexedRepo()
  return worldAt(root, textIn(root))
}

test("the page the index files at a path is answered", () => {
  expect(pageIn(worldIn(), HELD_PAGE)?.slug).toBe("held")
})

test("a path carrying a section beside the page's own names no page", () => {
  expect(pageIn(worldIn(), HELD_CODE)).toBeNull()
})

test("a path reading as no page file names no page", () => {
  expect(pageIn(worldIn(), "akasha/notes.md")).toBeNull()
})

test("a path the index files no page at names no page", () => {
  expect(pageIn(worldIn(), MISSING)).toBeNull()
})

test("a read answers the page standing at the path", () => {
  const read = readFor(worldIn(), HELD_PAGE)

  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.value.slug).toBe("held")
})

test("a path naming no page is refused rather than answered", () => {
  const read = readFor(worldIn(), MISSING)

  expect("refused" in read && read.refused).toContain("names no page")
})

test("a key naming a relation answers the page types that key reaches", () => {
  const read = readFor(worldIn(), NAMER_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(targetsIn(read.known, read.value, "note")).toEqual(["module"])
  expect(targetsIn(read.known, read.value, "partSlugs")).toEqual(["domain"])
})

test("a key reaching no property names no page", () => {
  const read = readFor(worldIn(), NAMER_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(targetsIn(read.known, read.value, "definition")).toEqual([])
})

test("the pages naming a path under one property are answered", () => {
  expect(namersIn(worldIn(), HELD_PAGE, "part-slugs")).toEqual([
    { path: NAMER_PAGE, propertySlug: "part-slugs" },
  ])
})

test("a property no page names the path under answers no page", () => {
  expect(namersIn(worldIn(), HELD_PAGE, "definition")).toEqual([])
})

test("a key the page's type holds one value under is single", () => {
  const world = worldIn()
  const read = readFor(world, HELD_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(singleIn(world, read.value, "code")).toBe(true)
})

test("a key the page's type names under no property holds many values", () => {
  const world = worldIn()
  const read = readFor(world, HELD_PAGE)
  if ("refused" in read) throw new Error(read.refused)

  expect(singleIn(world, read.value, "namedByNoProperty")).toBe(false)
})

function routes(count: number, keys: readonly string[]): readonly Value[] {
  const made: Value[] = []
  for (let at = 0; at < count; at += 1) {
    const one: Record<string, unknown> = { pageTypeSlug: "route", type: "route" }
    for (const key of keys) one[key] = `${key}-${at}`
    made.push(one)
  }
  return made
}

function worldOver(said: readonly Value[]): World {
  const held = new Map<string, Value>(said.map((one, at) => [`${at}.route.ts`, one]))
  return {
    root: "/nowhere",
    index: { valuesByPath: () => held } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const ROUTE = routes(1, ["slug", "code", "urlPath"])[0] as Value

test("a key falls after the key the pages of its own type put it after", () => {
  const world = worldOver(routes(1, ["slug", "code", "test", "urlPath"]))

  expect(afterIn(world, ROUTE, "test")).toBe("code")
})

test("a key none of those pages write falls after nothing", () => {
  const world = worldOver(routes(1, ["slug", "code", "test", "urlPath"]))

  expect(afterIn(world, ROUTE, "invariants")).toBeNull()
})

test("a key the page already writes falls after nothing", () => {
  const world = worldOver(routes(1, ["slug", "code", "test", "urlPath"]))

  expect(afterIn(world, ROUTE, "code")).toBeNull()
})

test("a page saying no page type falls after nothing", () => {
  const world = worldOver(routes(1, ["slug", "code", "test", "urlPath"]))

  expect(afterIn(world, { slug: "one" }, "test")).toBeNull()
})

test("the first sixty-four pages writing the key settle where it falls", () => {
  const world = worldOver([
    ...routes(64, ["slug", "code", "urlPath", "test"]),
    ...routes(64, ["slug", "code", "test", "urlPath"]),
  ])

  expect(afterIn(world, ROUTE, "test")).toBe("urlPath")
})

function worldDeclaring(carried: readonly { readonly key: string }[] | null): World {
  return {
    root: "/nowhere",
    index: { propertiesIfNamed: () => carried } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const SEAT = { pageTypeSlug: "seat", type: "seat", slug: "one" } as Value

const DECLARED = [{ key: "transcriptPath" }]

test("a slug the page's type declares a key for answers that key", () => {
  expect(spelledIn(worldDeclaring(DECLARED), SEAT, "transcript-path")).toBe("transcriptPath")
})

test("a slug the page's type declares no key for answers no key", () => {
  expect(spelledIn(worldDeclaring(DECLARED), SEAT, "no-such-thing")).toBeNull()
})

test("a spelling that is already a key answers no key", () => {
  expect(spelledIn(worldDeclaring(DECLARED), SEAT, "transcriptPath")).toBeNull()
})

test("a type the index cannot read answers no key for a slug", () => {
  expect(spelledIn(worldDeclaring(null), SEAT, "transcript-path")).toBeNull()
})

test("a page saying no page type answers no key for a slug", () => {
  expect(spelledIn(worldDeclaring(DECLARED), { slug: "one" }, "transcript-path")).toBeNull()
})
