import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { readingAt } from "../index-surface/index-surface.module.code.ts"
import {
  fileKeysAt,
  fileKeysIn,
  pathsOf,
  schemaAt,
  uniquePropertiesAt,
} from "./index-entries.module.code.ts"
import { A, grounded, scratch } from "./index-entries.module.test-fixtures.ts"

afterAll(scratch.sweep)

function filedAs(
  said: Readonly<Record<string, string | null>>
): ReadonlyMap<string, string | null> {
  return new Map(Object.entries(said))
}

test("a property no page property declares to be a file is filed under no path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", definition: "what is held" }

  expect(pathsOf(value, "/repo/a.domain.ts", "/repo", filedAs({ code: null }))).toEqual([
    "a.domain.ts",
  ])
})

test("the properties held in a file are the ones the file shape is", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "code", propertySlug: "code" },
    { id: "2", pageTypeSlug: "relation-property", slug: "part-slugs", propertySlug: "part-slugs" },
    { id: "3", pageTypeSlug: "domain", slug: "code" },
  ]

  expect([...fileKeysIn(values)]).toEqual([["code", null]])
})

test("a file property is filed under the key a page carries rather than under its own slug", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "ambient-types", propertySlug: "d" },
  ]
  const value = { id: A, pageTypeSlug: "type-declaration", slug: "a", d: "ts" }

  expect([...fileKeysIn(values)]).toEqual([["d", null]])
  expect(pathsOf(value, "/repo/a.type-declaration.ts", "/repo", filedAs({ d: null }))).toEqual([
    "a.type-declaration.ts",
    "a.type-declaration.d.ts",
  ])
})

test("a property whose name is written in camel is filed under its kebab slug", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", codeOf: "ts" }

  expect(pathsOf(value, "/repo/a.module.ts", "/repo", filedAs({ "code-of": null }))).toEqual([
    "a.module.ts",
    "a.module.code-of.ts",
  ])
})

test("the properties held in a file are read from the schema the index carries", () => {
  const { root } = grounded()

  expect([...fileKeysAt(readingAt(root))]).toEqual([["code", null]])
})

test("a property stating the name its file stands under claims that name in the page's own directory", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", manifest: "json" }

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs({ manifest: "package.json" }))
  ).toEqual(["deep/a.module.ts", "deep/package.json"])
})

test("a property stating no name is still claimed under the name the grammar builds", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

  expect(pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs({ code: null }))).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
  ])
})

test("the numbered files of a property are claimed alongside the first while they are there", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const held = new Set(["deep/a.module.code.part2.ts", "deep/a.module.code.part3.ts"])
  const there = (at: string): boolean => held.has(at)

  expect(pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs({ code: null }), there)).toEqual(
    [
      "deep/a.module.ts",
      "deep/a.module.code.ts",
      "deep/a.module.code.part2.ts",
      "deep/a.module.code.part3.ts",
    ]
  )
})

test("a numbered file past a gap in the numbering is claimed by no page", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const held = new Set(["deep/a.module.code.part3.ts"])
  const there = (at: string): boolean => held.has(at)

  expect(pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs({ code: null }), there)).toEqual(
    ["deep/a.module.ts", "deep/a.module.code.ts"]
  )
})

test("a page carrying both is claimed under the built name and under the stated one", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", manifest: "json" }
  const filed = filedAs({ code: null, manifest: "package.json" })

  expect(pathsOf(value, "/repo/deep/a.module.ts", "/repo", filed)).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
    "deep/package.json",
  ])
})

function declaring(
  index: string,
  pageTypeSlug: string,
  slug: string,
  said: Record<string, unknown>
): undefined {
  const at = join(index, "schema", "page-property", pageTypeSlug, "slug", `${slug}.jsonl`)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(said)}\n`, "utf8")
}

test("a schema line saying nothing about unique declares no identifier", () => {
  const index = scratch.rootFor("akasha-entries-schema-")
  declaring(index, "text-property", "held", {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    slug: "held",
  })

  expect(schemaAt(readingAt(index)).get("text-property/held")?.unique).toBe(null)
  expect([...uniquePropertiesAt(readingAt(index)).keys()]).toEqual([])
})

test("a schema line saying nothing about its target names no target", () => {
  const index = scratch.rootFor("akasha-entries-target-")
  declaring(index, "relation-property", "held", {
    pageTypeSlug: "relation-property",
    slug: "held",
  })

  expect(schemaAt(readingAt(index)).get("relation-property/held")?.targetPageTypeSlug).toBe(null)
})

test("a schema line that does say unique declares it still", () => {
  const index = scratch.rootFor("akasha-entries-unique-")
  declaring(index, "text-property", "id", {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: "always",
    slug: "id",
    propertySlug: "id",
  })

  expect([...uniquePropertiesAt(readingAt(index)).entries()]).toEqual([
    ["id", { key: "id", reach: "always" }],
  ])
})

test("an identifier is read by the key its property states rather than by its slug", () => {
  const index = scratch.rootFor("akasha-entries-keyed-")
  declaring(index, "text-property", "held-name", {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: "page-type",
    slug: "held-name",
    propertySlug: "named",
  })

  expect([...uniquePropertiesAt(readingAt(index)).entries()]).toEqual([
    ["held-name", { key: "named", reach: "page-type" }],
  ])
})

test("a schema line stating no key declares no identifier", () => {
  const index = scratch.rootFor("akasha-entries-keyless-")
  declaring(index, "text-property", "id", {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: "always",
    slug: "id",
  })

  expect([...uniquePropertiesAt(readingAt(index)).keys()]).toEqual([])
})

test("two properties of one slug are answered apart, each under the page type it is", () => {
  const index = scratch.rootFor("akasha-entries-two-")
  declaring(index, "text-property", "foo", { pageTypeSlug: "text-property", slug: "foo" })
  declaring(index, "number-property", "foo", { pageTypeSlug: "number-property", slug: "foo" })

  expect([...schemaAt(readingAt(index)).keys()].sort()).toEqual([
    "number-property/foo",
    "text-property/foo",
  ])
})

test("a line carries the key a page reads the property by", () => {
  const index = scratch.rootFor("akasha-entries-key-")
  declaring(index, "text-property", "held", {
    pageTypeSlug: "text-property",
    slug: "held",
    propertySlug: "held",
  })

  expect(schemaAt(readingAt(index)).get("text-property/held")?.propertySlug).toBe("held")
})

test("a schema line stating a file name says the property is held in a file of that name", () => {
  const index = scratch.rootFor("akasha-entries-named-")
  declaring(index, "named-file-property", "manifest", {
    pageTypeSlug: "named-file-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  })

  expect([...fileKeysAt(readingAt(index))]).toEqual([["manifest", "package.json"]])
})

test("a stated file name holds a property in a file whatever page type the property is", () => {
  const index = scratch.rootFor("akasha-entries-stated-")
  declaring(index, "worded-property", "manifest", {
    pageTypeSlug: "worded-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  })

  expect([...fileKeysAt(readingAt(index))]).toEqual([["manifest", "package.json"]])
})
