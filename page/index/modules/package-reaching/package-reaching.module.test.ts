import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing as wrote } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import {
  bodiesAt,
  manifestsAmong,
  reachingIn,
  reachingOf,
  rereadOver,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  importFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { reading } from "akasha/page/modules/value/page-value.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PREFIX = "akasha-package-reaching-"

const ONE = JSON.stringify({ name: "@akasha/one", exports: { ".": "./one.module.code.ts" } })

const TWO = JSON.stringify({ name: "@akasha/two", exports: { "./deep": "./deep/two.ts" } })

const FILING = new Map<string, string | null>([["workspace-manifest", "package.json"]])

const PATHS = [
  "akasha/one/package.json",
  "akasha/one/one.module.code.ts",
  "akasha/two/package.json",
]

const BODIES = reading({ "akasha/one/package.json": ONE, "akasha/two/package.json": TWO })

const MODULE_TYPE = "01a05ae4-0000-7000-8000-00000000000a"

function worldAt(): string {
  const root = scratch.rootFor(PREFIX)
  shapeAdded(root, "file-property", "workspace-manifest", [
    {
      pageTypeSlug: "file-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "workspace-manifest",
      propertySlug: "workspace-manifest",
      fileName: "package.json",
    },
  ])
  listedFiled(root, "page-type", "module", [
    { path: "akasha/module.page-type.ts", id: MODULE_TYPE },
  ])
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

test("a path whose last part merely ends in the file name is no manifest", () => {
  expect(manifestsAmong(["akasha/one/my-package.json"], "package.json")).toEqual([])
})

test("a manifest at the root of the repository is picked out", () => {
  expect(manifestsAmong(["package.json"], "package.json")).toEqual(["package.json"])
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

const READER = "akasha/two/reader.module.code.ts"

const REPOINTED = 'import { one } from "@akasha/one/moved"\n'

const LANDS = new Map([
  ["@akasha/one", "akasha/one/moved.module.code.ts"],
  ["@akasha/two/deep", "akasha/two/deep/two.ts"],
])

test("an importer reread is read through the reader handed in rather than off the disk", () => {
  const root = worldAt()
  importFiled(root, "akasha/one/one.module.code.ts", [{ path: READER }])
  const said = rereadOver(
    readingIn(root),
    [{ path: "akasha/one/package.json", before: ONE, was: null }],
    root,
    FILING,
    new Map(),
    LANDS,
    (path) => (path === READER ? REPOINTED : null)
  )
  expect(said.reread).toEqual([{ path: READER, before: REPOINTED, after: REPOINTED }])
})
