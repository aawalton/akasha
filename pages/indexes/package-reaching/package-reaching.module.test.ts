import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing as wrote } from "@akasha/command-system/scratching/testing"
import { pathFiled, schemaFiled } from "../reading/index-reading.module.test-fixtures.ts"
import {
  bodiesAt,
  manifestsAmong,
  reachingAt,
  reachingFor,
  reachingIn,
  reachingOf,
} from "./package-reaching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PREFIX = "akasha-package-reaching-"

const ONE = JSON.stringify({ name: "@akasha/one", exports: { ".": "./one.module.code.ts" } })

const TWO = JSON.stringify({ name: "@akasha/two", exports: { "./deep": "./deep/two.ts" } })

const FILING = new Map<string, string | null>([["manifest", "package.json"]])

const PATHS = [
  "akasha/one/package.json",
  "akasha/one/one.module.code.ts",
  "akasha/two/package.json",
]

function bodyFor(held: Record<string, string>): (path: string) => string | null {
  return (path) => held[path] ?? null
}

const BODIES = bodyFor({ "akasha/one/package.json": ONE, "akasha/two/package.json": TWO })

function worldAt(): string {
  const root = scratch.rootFor(PREFIX)
  schemaFiled(root, "named-file-property", "manifest", [
    {
      pageTypeSlug: "named-file-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "manifest",
      propertySlug: "manifest",
      fileName: "package.json",
    },
  ])
  for (const one of PATHS) pathFiled(root, one, [{ path: one }])
  wrote(root, "akasha/one/package.json", ONE)
  wrote(root, "akasha/two/package.json", TWO)
  return root
}

test("the manifests are picked out of the paths handed in by their file name", () => {
  expect(manifestsAmong(PATHS, "package.json")).toEqual([
    "akasha/one/package.json",
    "akasha/two/package.json",
  ])
})

test("no file name at all picks out no manifest", () => {
  expect(manifestsAmong(PATHS, null)).toEqual([])
})

test("each manifest names against the folder it stands in", () => {
  const held = reachingOf(["akasha/one/package.json", "akasha/two/package.json"], BODIES)
  expect(held.get("@akasha/one")).toBe("akasha/one/one.module.code.ts")
  expect(held.get("@akasha/two/deep")).toBe("akasha/two/deep/two.ts")
})

test("a manifest whose body does not stand is passed over", () => {
  const held = reachingOf(["akasha/one/package.json", "akasha/gone/package.json"], BODIES)
  expect([...held.keys()]).toEqual(["@akasha/one"])
})

test("the file name a manifest stands under is read from what the properties state", () => {
  const held = reachingIn(PATHS, FILING, BODIES)
  expect(held.get("@akasha/one")).toBe("akasha/one/one.module.code.ts")
})

test("properties stating no manifest are answered as reaching nothing", () => {
  expect([...reachingIn(PATHS, new Map(), BODIES)]).toEqual([])
})

test("a body is read from under the root it was asked for", () => {
  const root = worldAt()
  expect(bodiesAt(root)("akasha/one/package.json")).toBe(ONE)
  expect(bodiesAt(root)("akasha/gone/package.json")).toBe(null)
})

test("the manifests the index names are read as one naming", () => {
  const root = worldAt()
  const held = reachingAt(root, bodiesAt(root))
  expect(held.get("@akasha/one")).toBe("akasha/one/one.module.code.ts")
  expect(held.get("@akasha/two/deep")).toBe("akasha/two/deep/two.ts")
})

test("a caller holding only a root is answered the same thing twice", () => {
  const root = worldAt()
  const held = reachingFor(root)
  expect(reachingFor(root)).toBe(held)
  expect(held.get("@akasha/one")).toBe("akasha/one/one.module.code.ts")
})

test("an index that is not there refuses rather than reaching nothing", () => {
  const root = scratch.rootFor(PREFIX)
  expect(() => reachingAt(root, bodiesAt(root))).toThrow("is not there")
})
