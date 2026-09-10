import { afterAll, expect, test } from "bun:test"
import {
  idFiled,
  importFiled,
  listedFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { couldTurn, generatorAt, typedOver } from "./type-generating.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT = "/nowhere"

const AT = "pages/types/page-type.page-type.ts"

const OWN = "pages/types/page-type.page-type.types.ts"

const OTHER = "code-system/modules/module.page-type.types.ts"

const BYTES = new TextEncoder()

const STATED = { slug: "page-type", typeGenerator: "ts" }

function changeOver(bodies: ReadonlyMap<string, string>): Change {
  return {
    root: ROOT,
    changed: [...bodies.keys()],
    before: () => null,
    after: (path) => {
      const body = bodies.get(path)
      return body === undefined ? null : BYTES.encode(body)
    },
  }
}

function shadowOf(pages: ReadonlyMap<string, Record<string, unknown>>): Shadow {
  const index = {
    everyOfType: () => [...pages.keys()].map((path) => ({ path, id: path })),
  } as never
  return {
    index,
    filed: () => [],
    pageOf: (path) => pages.get(path) ?? null,
    codeAt: (path) => path,
  }
}

function only(page: Record<string, unknown>): ReadonlyMap<string, Record<string, unknown>> {
  return new Map([[AT, page]])
}

test("the generator sits beside the page type as that page type's `type-generator` section", () => {
  expect(generatorAt(AT)).toBe("pages/types/page-type.page-type.type-generator.ts")
})

test("a page type stating no type generator has no generator run for it", () => {
  let asked = 0
  const said = typedOver(changeOver(new Map()), shadowOf(only({ slug: "page-type" })), () => {
    asked += 1
    return { missing: "never reached" }
  })
  expect(asked).toBe(0)
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a page type stating a type generator has that generator's edits answered", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
  }))
  expect(said.edits).toEqual([{ kind: "add", path: OWN, content: "export type PageType = {}\n" }])
})

test("a page type is among the pages its own generator writes for", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [
      { kind: "add", path: OWN, content: "export type PageType = {}\n" },
      { kind: "add", path: OTHER, content: "export type Module = {}\n" },
    ],
  }))
  expect(said.edits.map((one) => one.path)).toEqual([OWN, OTHER])
})

test("a generator that is not there is said rather than thrown", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    missing: "no such file or directory",
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toHaveLength(1)
  expect(said.said[0]).toContain("page-type.page-type.type-generator.ts")
  expect(said.said[0]).toContain("no such file or directory")
})

test("a generator that breaks is said rather than thrown", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => {
      throw new Error("the shadow answered nothing")
    },
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toHaveLength(1)
  expect(said.said[0]).toContain("the shadow answered nothing")
})

test("a body equal to what is already at that path is left out", () => {
  const body = "export type PageType = {}\n"
  const said = typedOver(changeOver(new Map([[OWN, body]])), shadowOf(only(STATED)), () => ({
    generating: () => [{ kind: "add", path: OWN, content: body }],
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a body other than what is already at that path is answered as a replacement", () => {
  const said = typedOver(
    changeOver(new Map([[OWN, "export type PageType = { was: true }\n"]])),
    shadowOf(only(STATED)),
    () => ({
      generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
    })
  )
  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: OWN,
      contentFrom: "export type PageType = { was: true }\n",
      contentTo: "export type PageType = {}\n",
    },
  ])
})

test("a change naming no page type, no generator and no types file could turn nothing", () => {
  const change = changeOver(new Map([["command-system/calling/calling.module.code.ts", ""]]))
  expect(couldTurn(change)).toBe(false)
})

test("a change naming a page type could turn a type", () => {
  expect(couldTurn(changeOver(new Map([[AT, ""]])))).toBe(true)
})

test("a change naming a type generator could turn a type", () => {
  expect(couldTurn(changeOver(new Map([[generatorAt(AT) ?? "", ""]])))).toBe(true)
})

test("a change naming a types file could turn a type", () => {
  expect(couldTurn(changeOver(new Map([[OWN, ""]])))).toBe(true)
})

const idOf = (one: string): string => `01a088d0-0000-7000-8000-00000000000${one}`

const THING = idOf("1")

const CARRIES_TYPES = idOf("2")

const A_THING = idOf("3")

const THING_TYPE_AT = "akasha/thing.page-type.ts"

const CARRIES_TYPES_AT = "akasha/types.file-property.ts"

const A_THING_AT = "akasha/one.thing.ts"

const A_GENERATED_BODY = "akasha/one.thing.types.ts"

const AN_AUTHORED_BODY = "akasha/two.thing.ts"

const GONE = "akasha/held.text-property.ts"

function filedAt(root: string, kind: string, slug: string, path: string, id: string): undefined {
  listedFiled(root, kind, slug, [{ path, id }])
  valueAlsoFiled(root, kind, [{ path, value: { id, pageTypeSlug: kind, slug } }])
  idFiled(root, id, [{ path, id }])
}

function rootWhereTypesAreGenerated(importer: string): string {
  const root = scratch.rootFor("type-generating-")
  filedAt(root, "page-type", "thing", THING_TYPE_AT, THING)
  listedFiled(root, "thing", "one", [{ path: A_THING_AT, id: A_THING }])
  valueAlsoFiled(root, "thing", [
    { path: A_THING_AT, value: { id: A_THING, pageTypeSlug: "thing", slug: "one" } },
  ])
  schemaFiled(root, "file-property", "types", [
    {
      pageTypeSlug: "file-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "types",
      propertySlug: "types",
      fileName: null,
    },
  ])
  filedAt(root, "file-property", "types", CARRIES_TYPES_AT, CARRIES_TYPES)
  valueAlsoFiled(root, "file-property", [
    {
      path: CARRIES_TYPES_AT,
      value: {
        id: CARRIES_TYPES,
        pageTypeSlug: "file-property",
        slug: "types",
        propertySlug: "types",
        generated: true,
      },
    },
  ])
  relationFiled(root, CARRIES_TYPES, "page-property", THING, [{ path: THING_TYPE_AT }])
  importFiled(root, GONE, [{ path: importer }])
  return root
}

function leaving(root: string, after: string | null): Change {
  return {
    root,
    changed: [GONE],
    before: () => BYTES.encode("export type Held = string\n"),
    after: () => (after === null ? null : BYTES.encode(after)),
  }
}

test("a path a generated body imports, left with no body, could turn a type", () => {
  expect(couldTurn(leaving(rootWhereTypesAreGenerated(A_GENERATED_BODY), null))).toBe(true)
})

test("a path only an authored body imports could turn nothing", () => {
  expect(couldTurn(leaving(rootWhereTypesAreGenerated(AN_AUTHORED_BODY), null))).toBe(false)
})

test("a path the change still leaves a body at could turn nothing", () => {
  const root = rootWhereTypesAreGenerated(A_GENERATED_BODY)

  expect(couldTurn(leaving(root, "export type Held = number\n"))).toBe(false)
})
