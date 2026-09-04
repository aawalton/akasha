import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Value } from "@akasha/pages-system/page-value"
import {
  idFiled,
  listedFiled,
  relationFiled,
  schemaFiled,
} from "../index-reading/index-reading.module.test-fixtures.ts"
import {
  type Carried,
  carryingOf,
  heldBeside,
  type Naming,
} from "./property-carrying.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const idOf = (one: string): string => `01a058c0-0000-7000-8000-00000000000${one}`

const HELD = idOf("1")

const THING = idOf("2")

const DEEPER = idOf("3")

const RECORDS = idOf("4")

const ONE = idOf("5")

const TWO = idOf("6")

function pageAt(slug: string, kind: string): string {
  return `akasha/${slug}.${kind}.ts`
}

function filed(root: string, slug: string, kind: string, id: string): undefined {
  const path = pageAt(slug, kind)
  listedFiled(root, kind, slug, [{ path, id }])
  idFiled(root, id, [{ path, id }])
}

function property(root: string, slug: string, shape: string, id: string): undefined {
  schemaFiled(root, shape, slug, [
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

function declares(root: string, property: string, by: string, at: string): undefined {
  relationFiled(root, property, "page-property-slug", by, [{ path: at }])
}

function extending(root: string, above: string, below: string, at: string): undefined {
  relationFiled(root, above, "extends-slug", below, [{ path: at }])
}

function rooted(): string {
  const root = scratch.rootFor("akasha-carrying-")
  property(root, "held", "text-property", HELD)
  filed(root, "thing", "page-type", THING)
  listedFiled(root, "thing", "one", [{ path: "akasha/one.thing.ts", id: ONE }])
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
  listedFiled(root, "deeper", "two", [{ path: "akasha/two.deeper.ts", id: TWO }])
  const said = carryingOf(root, "held")
  expect("carrying" in said ? said.carrying.map((one) => one.path) : []).toEqual([
    "akasha/one.thing.ts",
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

const NAMING: Naming = {
  path: "akasha/lockfile.named-file-property.ts",
  value: { fileName: "bun.lock", said: true },
}

const OWNER = "akasha-workspace.workspace.ts"

function saidTrue(value: Value): boolean {
  return value.said === true
}

function saidNever(): boolean {
  return false
}

function carryingAt(at: string): (named: string) => Carried {
  return (named) =>
    named === "named-file-property/lockfile"
      ? { carrying: [{ pageTypeSlug: "workspace", path: at, id: ONE, within: null }] }
      : { refused: "no page property carries that slug" }
}

function refusing(): Carried {
  return { refused: "no page property carries that slug" }
}

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
