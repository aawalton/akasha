import { expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { turnedWhole } from "akasha/page/index/modules/generator-turning/generator-turning.module.code.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const GENERATOR_AT = "page/type/page-type.page-type.type-generator.ts"

const TYPES_AT = "akasha/carrier.page-type.types.ts"

const SCHEMA_AT = "akasha/carrier.page-type.schema.jsonl"

function world(generator: string): string {
  return indexedRepo({
    "akasha/page-type.page-type.ts": bodyOf({
      id: idOf("2"),
      type: `${pageType.slug}/${pageType.slug}`,
      slug: "page-type",
      extends: [DOMAIN_AT],
      properties: [],
      typeGenerator: "ts",
    }),
    "akasha/page-type.page-type.type-generator.ts": generator,
    "akasha/carrier.page-type.ts": bodyOf({
      id: "01a04a4a-0009-7000-8000-000000000001",
      type: `${pageType.slug}/${pageType.slug}`,
      slug: "carrier",
      extends: [MODULE_AT],
      properties: [{ pagePropertySlug: "note", required: false, many: false }],
      types: "ts",
      schema: "jsonl",
    }),
  })
}

const REAL = `export { generateTypes } from "${join(rootOf(import.meta.dir), GENERATOR_AT)}"\n`

test("a file a generator writes that the tree has not is written and named", () => {
  const root = world(REAL)
  const said = turnedWhole(root, true)
  expect(said.refused).toEqual([])
  expect(said.added).toContain(TYPES_AT)
  expect(said.added).toContain(SCHEMA_AT)

  const again = turnedWhole(root, false)
  expect(again.added).toEqual([])
  expect(again.changed).toEqual([])
  expect(again.weighed).toBe(said.weighed)
})

test("a generated type file the pages no longer say is named and written again", () => {
  const root = world(REAL)
  turnedWhole(root, true)
  const at = join(root, TYPES_AT)
  const was = readFileSync(at, "utf8")
  writeFileSync(at, `${was}export type Nonsense = never\n`)

  expect(turnedWhole(root, false).changed).toEqual([TYPES_AT])
  expect(turnedWhole(root, true).changed).toEqual([TYPES_AT])
  expect(readFileSync(at, "utf8")).toBe(was)
})

test("a generated shape file the pages no longer say is named and written again", () => {
  const root = world(REAL)
  turnedWhole(root, true)
  const at = join(root, SCHEMA_AT)
  const was = readFileSync(at, "utf8")
  writeFileSync(at, was.replace('"propertySlug":"', '"propertySlug":"nonsense-'))

  expect(turnedWhole(root, false).changed).toEqual([SCHEMA_AT])
  expect(turnedWhole(root, true).changed).toEqual([SCHEMA_AT])
  expect(readFileSync(at, "utf8")).toBe(was)
})

test("a generator that breaks is refused rather than answered as nothing differing", () => {
  const root = world('export function generateTypes() { throw new Error("no") }\n')
  const said = turnedWhole(root, false)

  expect(said.added).toEqual([])
  expect(said.weighed).toBe(0)
  expect(said.refused.length).toBe(1)
  expect(said.refused[0]).toContain("broke — no")
})

test("a generator answering to no `generateTypes` is refused", () => {
  const root = world("export const nothing = 1\n")

  expect(turnedWhole(root, false).refused[0]).toContain("answers to no `generateTypes`")
})
