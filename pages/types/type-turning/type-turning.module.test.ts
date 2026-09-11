import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  importFiled,
  relationFiled,
  schemaFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { turnedBy } from "akasha/pages/types/type-turning/type-turning.module.code.ts"
import {
  AT,
  OWN,
  TURNS_NOTHING_AT,
  WRITES,
} from "akasha/pages/types/type-turning/type-turning.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT = "/nowhere"

const BYTES = new TextEncoder()

function changeOver(paths: readonly string[]): Change {
  return { root: ROOT, changed: [...paths], before: () => null, after: () => null }
}

test("a change naming no page type, no generator and no types file could turn nothing", () => {
  expect(turnedBy(changeOver([TURNS_NOTHING_AT]))).toBe(false)
})

test("a change naming a page type could turn a type", () => {
  expect(turnedBy(changeOver([AT]))).toBe(true)
})

test("a change naming a type generator could turn a type", () => {
  expect(turnedBy(changeOver([WRITES]))).toBe(true)
})

test("a change naming a types file could turn a type", () => {
  expect(turnedBy(changeOver([OWN]))).toBe(true)
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
  const root = scratch.rootFor("type-turning-")
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
  expect(turnedBy(leaving(rootWhereTypesAreGenerated(A_GENERATED_BODY), null))).toBe(true)
})

test("a path only an authored body imports could turn nothing", () => {
  expect(turnedBy(leaving(rootWhereTypesAreGenerated(AN_AUTHORED_BODY), null))).toBe(false)
})

test("a path a generated body imports could turn a type though a body is left there", () => {
  const root = rootWhereTypesAreGenerated(A_GENERATED_BODY)

  expect(turnedBy(leaving(root, "export type Held = number\n"))).toBe(true)
})
