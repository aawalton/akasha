import { afterAll, expect, test } from "bun:test"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  type Carried,
  carryingOf,
  facingOn,
  generatedAt,
  generatedIn,
  generates,
  heldBeside,
  heldUnder,
  type Naming,
  toolResolvesPaths,
  toolResolvesPathsIn,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import {
  carryingAt,
  counting,
  DEEPER,
  ENTRIES,
  facingSaying,
  folderedAt,
  HELD,
  ICONS,
  idOf,
  NAMING,
  ONE,
  OTHER,
  OWN,
  OWNER,
  RECORDS,
  refusing,
  SAYS,
  SECTIONED,
  saidNever,
  saidTrue,
  THING,
  TWO,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.test-fixtures.ts"
import {
  listedAndValued,
  relationFiled,
  shapeAdded,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function pageAt(slug: string, kind: string): string {
  return `akasha/${slug}.${kind}.ts`
}

function filed(root: string, slug: string, kind: string, id: string): undefined {
  const path = pageAt(slug, kind)
  listedAndValued(root, kind, slug, path, id)
  idFiled(root, id, [{ path, id }])
}

function property(root: string, slug: string, shape: string, id: string): undefined {
  shapeAdded(root, shape, slug, [
    {
      pageTypeSlug: shape,
      targetPageTypeSlug: null,
      unique: null,
      slug,
      propertySlug: slug,
      fileName: null,
    },
  ])
  filed(root, slug, shape, id)
}

function declares(root: string, named: string, by: string, at: string): undefined {
  relationFiled(root, named, "page-property", by, [{ path: at }])
}

function extending(root: string, above: string, below: string, at: string): undefined {
  relationFiled(root, above, "extends-type", below, [{ path: at }])
}

function rooted(): string {
  const root = scratch.rootFor("akasha-carrying-")
  property(root, "held", "text-property", HELD)
  filed(root, "thing", "page-type", THING)
  listedAndValued(root, "thing", "one", "akasha/one.thing.ts", ONE)
  return root
}

test("a property one page type declares is carried by that type's pages", () => {
  const root = rooted()
  declares(root, HELD, THING, pageAt("thing", "page-type"))
  expect(carryingOf(root, "held")).toEqual({
    carrying: [{ pageTypeSlug: "thing", path: "akasha/one.thing.ts", id: ONE, within: null }],
  })
})

test("a page type declaring nothing of it carries none of its pages", () => {
  const root = rooted()
  expect(carryingOf(root, "held")).toEqual({ carrying: [] })
})

test("a property is carried by the pages of every type beneath the one declaring it", () => {
  const root = rooted()
  declares(root, HELD, THING, pageAt("thing", "page-type"))
  filed(root, "deeper", "page-type", DEEPER)
  extending(root, THING, DEEPER, pageAt("deeper", "page-type"))
  listedAndValued(root, "deeper", "two", "akasha/two.deeper.ts", TWO)
  const said = carryingOf(root, "held")
  expect("carrying" in said ? said.carrying.map((one) => one.path) : []).toEqual([
    "akasha/one.thing.ts",
    "akasha/two.deeper.ts",
  ])
})

function extendingBoth(root: string): undefined {
  filed(root, "other", "page-type", OTHER)
  filed(root, "deeper", "page-type", DEEPER)
  extending(root, THING, DEEPER, pageAt("deeper", "page-type"))
  extending(root, OTHER, DEEPER, pageAt("deeper", "page-type"))
  listedAndValued(root, "deeper", "two", "akasha/two.deeper.ts", TWO)
}

test("a page type naming two page types above it carries what the first of them declares", () => {
  const root = rooted()
  extendingBoth(root)
  declares(root, HELD, THING, pageAt("thing", "page-type"))
  const said = carryingOf(root, "held")
  expect("carrying" in said ? said.carrying.map((one) => one.path) : []).toEqual([
    "akasha/one.thing.ts",
    "akasha/two.deeper.ts",
  ])
})

test("a page type naming two page types above it carries what the second of them declares", () => {
  const root = rooted()
  extendingBoth(root)
  declares(root, HELD, OTHER, pageAt("other", "page-type"))
  const said = carryingOf(root, "held")
  expect("carrying" in said ? said.carrying.map((one) => one.path) : []).toEqual([
    "akasha/two.deeper.ts",
  ])
})

test("a property a record declares is carried by the pages carrying that record", () => {
  const root = rooted()
  filed(root, "records", "record-property", RECORDS)
  declares(root, HELD, RECORDS, pageAt("records", "record-property"))
  declares(root, RECORDS, THING, pageAt("thing", "page-type"))
  expect(carryingOf(root, "held")).toEqual({
    carrying: [{ pageTypeSlug: "thing", path: "akasha/one.thing.ts", id: ONE, within: "records" }],
  })
})

test("a property nested deeper than one record is not reached", () => {
  const root = rooted()
  filed(root, "records", "record-property", RECORDS)
  filed(root, "deeper", "record-property", DEEPER)
  declares(root, HELD, RECORDS, pageAt("records", "record-property"))
  declares(root, RECORDS, DEEPER, pageAt("deeper", "record-property"))
  declares(root, DEEPER, THING, pageAt("thing", "page-type"))
  expect(carryingOf(root, "held")).toEqual({ carrying: [] })
})

test("a name no page property carries is refused rather than answered as none", () => {
  const root = rooted()
  const said = carryingOf(root, "nowhere")
  expect("refused" in said ? said.refused : "").toContain("no page property carries")
})

test("a name naming more than one page property is refused rather than chosen between", () => {
  const root = rooted()
  property(root, "held", "number-property", idOf("7"))
  const said = carryingOf(root, "held")
  expect("refused" in said ? said.refused : "").toContain("narrows to 2 page properties")
})

test("a name saying its own page property type is answered where a bare one is refused", () => {
  const root = rooted()
  property(root, "held", "number-property", idOf("7"))
  declares(root, HELD, THING, pageAt("thing", "page-type"))
  expect(carryingOf(root, "text-property/held")).toEqual({
    carrying: [{ pageTypeSlug: "thing", path: "akasha/one.thing.ts", id: ONE, within: null }],
  })
})

test("the answer is read with no page body standing anywhere", () => {
  const root = rooted()
  declares(root, HELD, THING, pageAt("thing", "page-type"))
  const said = carryingOf(root, "held")
  expect("carrying" in said ? said.carrying.length : 0).toBe(1)
})

test("a property saying a machine writes its file says so of its value", () => {
  expect(generates({ generated: true })).toBe(true)
})

test("a property saying nothing of a machine says nothing of its value", () => {
  expect(generates({ fileName: "bun.lock" })).toBe(false)
})

test("a property saying an author writes its file says nothing of its value", () => {
  expect(generates({ generated: false })).toBe(false)
})

test("a property saying a tool resolves the paths in its file says so of its value", () => {
  expect(toolResolvesPaths({ toolResolvesPaths: true })).toBe(true)
})

test("a property saying nothing of a tool says nothing of its value", () => {
  expect(toolResolvesPaths({ fileName: "package.json" })).toBe(false)
})

test("a file beside a property saying a tool resolves its paths is answered so", () => {
  const said = { fileName: "bun.lock", toolResolvesPaths: true }
  expect(toolResolvesPathsIn(facingSaying(said), "bun.lock")).toBe(true)
})

test("a file beside a property saying nothing of a tool is answered no", () => {
  expect(toolResolvesPathsIn(facingSaying({ fileName: "bun.lock" }), "bun.lock")).toBe(false)
})

function entriesFiled(root: string, said: Value): undefined {
  const path = pageAt("entries", "file-property")
  shapeAdded(root, "file-property", "entries", [
    {
      pageTypeSlug: "file-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "entries",
      propertySlug: "entries",
      fileName: null,
    },
  ])
  listedFiled(root, "file-property", "entries", [{ path, id: ENTRIES }])
  valueAlsoFiled(root, "file-property", [{ path, value: said }])
  idFiled(root, ENTRIES, [{ path, id: ENTRIES }])
  declares(root, ENTRIES, THING, pageAt("thing", "page-type"))
}

test("a property naming no file says each file its section names is generated", () => {
  const root = rooted()
  entriesFiled(root, { ...SAYS, generated: true })
  expect(generatedAt(root, SECTIONED)).toBe(true)
})

test("a property saying nothing of a machine says nothing of the files its section names", () => {
  const root = rooted()
  entriesFiled(root, SAYS)
  expect(generatedAt(root, SECTIONED)).toBe(false)
})

test("a file carrying no section is not the file of a property naming no file", () => {
  const root = rooted()
  entriesFiled(root, { ...SAYS, generated: true })
  expect(generatedAt(root, "akasha/one.thing.ts")).toBe(false)
})

test("that section under a page type not carrying the property names no generated file", () => {
  const root = rooted()
  entriesFiled(root, { ...SAYS, generated: true })
  filed(root, "other", "page-type", OTHER)
  listedAndValued(root, "other", "two", "akasha/two.other.ts", TWO)
  expect(generatedAt(root, "akasha/two.other.entries.jsonl")).toBe(false)
})

test("a property naming no file says a tool resolves the paths in each file its section names", () => {
  const root = rooted()
  entriesFiled(root, { ...SAYS, toolResolvesPaths: true })
  expect(toolResolvesPathsIn(facingOn(root), SECTIONED)).toBe(true)
})

test("a property saying nothing of a tool says nothing of the files its section names", () => {
  const root = rooted()
  entriesFiled(root, SAYS)
  expect(toolResolvesPathsIn(facingOn(root), SECTIONED)).toBe(false)
})

test("that section under a page type not carrying the property names no file a tool resolves", () => {
  const root = rooted()
  entriesFiled(root, { ...SAYS, toolResolvesPaths: true })
  filed(root, "other", "page-type", OTHER)
  listedAndValued(root, "other", "two", "akasha/two.other.ts", TWO)
  expect(toolResolvesPathsIn(facingOn(root), "akasha/two.other.entries.jsonl")).toBe(false)
})

test("a file is beside a property naming it where a page carrying it sits in the file's folder", () => {
  expect(heldBeside("bun.lock", [NAMING], saidTrue, carryingAt(OWNER))).toBe(true)
})

test("a file named the same in another folder is beside nothing", () => {
  expect(heldBeside("node_modules/one/bun.lock", [NAMING], saidTrue, carryingAt(OWNER))).toBe(false)
})

test("a page carrying the property from another folder holds no file beside it", () => {
  expect(heldBeside("bun.lock", [NAMING], saidTrue, carryingAt("deep/down/one.workspace.ts"))).toBe(
    false
  )
})

test("a property the caller does not ask for holds nothing beside it", () => {
  expect(heldBeside("bun.lock", [NAMING], saidNever, carryingAt(OWNER))).toBe(false)
})

test("a property naming another file holds nothing beside it", () => {
  expect(heldBeside("package.json", [NAMING], saidTrue, carryingAt(OWNER))).toBe(false)
})

test("a property carrying no value holds nothing beside it", () => {
  const none: Naming = { path: NAMING.path, value: null }
  expect(heldBeside("bun.lock", [none], saidTrue, carryingAt(OWNER))).toBe(false)
})

test("a name the carrying refuses holds nothing beside it", () => {
  expect(heldBeside("bun.lock", [NAMING], saidTrue, refusing)).toBe(false)
})

test("what a face says about every file property is worked out once for that face", () => {
  const seen = { reads: 0 }
  const facing = counting(seen)
  expect(generatedIn(facing, "akasha/one.thing.entries.jsonl")).toBe(false)
  expect(seen.reads).toBe(3)
  expect(generatedIn(facing, "akasha/two.thing.entries.jsonl")).toBe(false)
  expect(seen.reads).toBe(3)
})

test("a second question asked of one face reads what the first question worked out", () => {
  const seen = { reads: 0 }
  const facing = counting(seen)
  expect(generatedIn(facing, "akasha/one.thing.entries.jsonl")).toBe(false)
  expect(seen.reads).toBe(3)
  expect(toolResolvesPathsIn(facing, "akasha/one.thing.entries.jsonl")).toBe(false)
  expect(seen.reads).toBe(3)
})

test("a face built again works out what it says about every file property again", () => {
  const seen = { reads: 0 }
  expect(generatedIn(counting(seen), "akasha/one.thing.entries.jsonl")).toBe(false)
  expect(generatedIn(counting(seen), "akasha/one.thing.entries.jsonl")).toBe(false)
  expect(seen.reads).toBe(6)
})

function under(path: string, said: Naming): boolean {
  return heldUnder(path, [said], saidTrue, folderedAt)
}

test("a file under the folder a property names is held under that property", () => {
  expect(under("one/Icons/chest.dds", ICONS)).toBe(true)
})

test("a folder named as a lone dot is the folder the carrying page sits in", () => {
  expect(under("one/chest.dds", OWN)).toBe(true)
})

test("a file outside the folder a property names is held under nothing", () => {
  expect(under("three/chest.dds", OWN)).toBe(false)
})

test("the folder a file is beside is the one the index says the carrying page sits in", () => {
  const root = rooted()
  declares(root, HELD, THING, pageAt("thing", "page-type"))
  const naming: readonly Naming[] = [
    { path: pageAt("held", "text-property"), value: { fileName: "bun.lock", said: true } },
  ]
  const carrying = (named: string): Carried => carryingOf(root, named)
  expect(heldBeside("akasha/bun.lock", naming, saidTrue, carrying)).toBe(true)
  expect(heldBeside("bun.lock", naming, saidTrue, carrying)).toBe(false)
})
