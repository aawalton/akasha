import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { readingAt } from "../index-surface/index-surface.module.code.ts"
import {
  type FilePropertiesBy,
  fileKeysAt,
  fileKeysIn,
  filePropertiesAt,
  filePropertiesIn,
  filePropertiesOver,
  pathsOf,
  schemaAt,
  sidecarsIn,
  uniquePropertiesAt,
} from "./index-entries.module.code.ts"
import { A, grounded, scratch } from "./index-entries.module.test-fixtures.ts"

afterAll(scratch.sweep)

function filedAs(
  pageTypeSlug: string,
  said: Readonly<Record<string, string | null>>
): FilePropertiesBy {
  return new Map([[pageTypeSlug, new Map(Object.entries(said))]])
}

test("a property no page property declares to be a file is filed under no path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", definition: "what is held" }

  expect(pathsOf(value, "/repo/a.domain.ts", "/repo", filedAs("domain", { code: null }))).toEqual([
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
  expect(
    pathsOf(value, "/repo/a.type-declaration.ts", "/repo", filedAs("type-declaration", { d: null }))
  ).toEqual(["a.type-declaration.ts", "a.type-declaration.d.ts"])
})

test("a property whose name is written in camel is filed under its kebab slug", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", codeOf: "ts" }

  expect(
    pathsOf(value, "/repo/a.module.ts", "/repo", filedAs("module", { "code-of": null }))
  ).toEqual(["a.module.ts", "a.module.code-of.ts"])
})

test("the properties held in a file are read from the schema the index carries", () => {
  const { root } = grounded()

  expect([...fileKeysAt(readingAt(root))]).toEqual([["code", null]])
})

test("a property stating the name its file stands under claims that name in the page's own directory", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", manifest: "json" }

  expect(
    pathsOf(
      value,
      "/repo/deep/a.module.ts",
      "/repo",
      filedAs("module", { manifest: "package.json" })
    )
  ).toEqual(["deep/a.module.ts", "deep/package.json"])
})

test("a property stating no name is still claimed under the name the grammar builds", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs("module", { code: null }))
  ).toEqual(["deep/a.module.ts", "deep/a.module.code.ts"])
})

test("the numbered files of a property are claimed alongside the first while they are there", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const held = new Set(["deep/a.module.code.part2.ts", "deep/a.module.code.part3.ts"])
  const there = (at: string): boolean => held.has(at)

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs("module", { code: null }), there)
  ).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
    "deep/a.module.code.part2.ts",
    "deep/a.module.code.part3.ts",
  ])
})

test("a numbered file past a gap in the numbering is claimed by no page", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const held = new Set(["deep/a.module.code.part3.ts"])
  const there = (at: string): boolean => held.has(at)

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs("module", { code: null }), there)
  ).toEqual(["deep/a.module.ts", "deep/a.module.code.ts"])
})

test("a page carrying both is claimed under the built name and under the stated one", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", manifest: "json" }
  const filed = filedAs("module", { code: null, manifest: "package.json" })

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

test("a file property is answered under the page type declaring it and under no other", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "notes", propertySlug: "notes" },
    { id: "2", pageTypeSlug: "text-property", slug: "location-notes", propertySlug: "notes" },
    {
      id: "3",
      pageTypeSlug: "page-type",
      slug: "review-session",
      properties: [{ pagePropertySlug: "notes" }],
    },
    {
      id: "4",
      pageTypeSlug: "page-type",
      slug: "location",
      properties: [{ pagePropertySlug: "location-notes" }],
    },
  ]

  const said = filePropertiesIn(values)

  expect([...(said.get("review-session") ?? [])]).toEqual([["notes", null]])
  expect([...(said.get("location") ?? [])]).toEqual([])
})

test("a page type carries what every page type above it declares", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "code", propertySlug: "code" },
    {
      id: "2",
      pageTypeSlug: "page-type",
      slug: "module",
      extendsSlug: ["page-type/domain"],
      properties: [{ pagePropertySlug: "code" }],
    },
    { id: "3", pageTypeSlug: "page-type", slug: "domain", properties: [] },
    { id: "4", pageTypeSlug: "page-type", slug: "index", extendsSlug: ["page-type/module"] },
  ]

  const said = filePropertiesIn(values)

  expect([...(said.get("index") ?? [])]).toEqual([["code", null]])
  expect([...(said.get("domain") ?? [])]).toEqual([])
})

test("a bare declaration name two page properties carry declares neither", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "notes", propertySlug: "notes" },
    { id: "2", pageTypeSlug: "text-property", slug: "notes", propertySlug: "notes" },
    {
      id: "3",
      pageTypeSlug: "page-type",
      slug: "review-session",
      properties: [{ pagePropertySlug: "notes" }],
    },
  ]

  expect([...(filePropertiesIn(values).get("review-session") ?? [])]).toEqual([])
})

test("a declaration naming its page property outright reaches it though the bare name is shared", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "notes", propertySlug: "notes" },
    { id: "2", pageTypeSlug: "text-property", slug: "notes", propertySlug: "notes" },
    {
      id: "3",
      pageTypeSlug: "page-type",
      slug: "review-session",
      properties: [{ pagePropertySlug: "file-property/notes" }],
    },
  ]

  expect([...(filePropertiesIn(values).get("review-session") ?? [])]).toEqual([["notes", null]])
})

test("a page type the change carries reaches the page properties the index carries", () => {
  const { root } = grounded()
  const left = [
    {
      id: "9",
      pageTypeSlug: "page-type",
      slug: "module",
      properties: [{ pagePropertySlug: "code" }, { pagePropertySlug: "part-slugs" }],
    },
  ]

  expect([...(filePropertiesOver(readingAt(root), left).get("module") ?? [])]).toEqual([
    ["code", null],
  ])
})

test("a page type no page type page names is answered by nothing rather than by every key", () => {
  const { root } = grounded()

  expect(filePropertiesOver(readingAt(root), []).get("module")).toBe(undefined)
})

test("what each page type holds in a file is answered off the index carrying no change", () => {
  const { root } = grounded()
  const reading = readingAt(root)

  expect(filePropertiesAt(reading)).toEqual(filePropertiesOver(reading, []))
})

function manifest(slug: string, fileName: string): Record<string, unknown> {
  return { id: slug, pageTypeSlug: "named-file-property", slug, propertySlug: "manifest", fileName }
}

test("a page type naming two page types above it carries what each of them declares", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "alpha", propertySlug: "alpha" },
    { id: "2", pageTypeSlug: "file-property", slug: "beta", propertySlug: "beta" },
    {
      id: "3",
      pageTypeSlug: "page-type",
      slug: "one",
      properties: [{ pagePropertySlug: "alpha" }],
    },
    { id: "4", pageTypeSlug: "page-type", slug: "two", properties: [{ pagePropertySlug: "beta" }] },
    {
      id: "5",
      pageTypeSlug: "page-type",
      slug: "both",
      extendsSlug: ["page-type/one", "page-type/two"],
    },
  ]

  expect([...(filePropertiesIn(values).get("both") ?? [])]).toEqual([
    ["beta", null],
    ["alpha", null],
  ])
})

test("a property two page types above declare is taken from the nearer of them", () => {
  const values = [
    manifest("near-manifest", "near.json"),
    manifest("far-manifest", "far.json"),
    {
      id: "a",
      pageTypeSlug: "page-type",
      slug: "far",
      properties: [{ pagePropertySlug: "named-file-property/far-manifest" }],
    },
    {
      id: "b",
      pageTypeSlug: "page-type",
      slug: "near",
      properties: [{ pagePropertySlug: "named-file-property/near-manifest" }],
    },
    { id: "c", pageTypeSlug: "page-type", slug: "mid", extendsSlug: ["page-type/far"] },
    {
      id: "d",
      pageTypeSlug: "page-type",
      slug: "leaf",
      extendsSlug: ["page-type/near", "page-type/mid"],
    },
  ]

  expect([...(filePropertiesIn(values).get("leaf") ?? [])]).toEqual([["manifest", "near.json"]])
})

test("a property two page types equally near declare is taken from the last one named", () => {
  const values = [
    manifest("first-manifest", "first.json"),
    manifest("second-manifest", "second.json"),
    {
      id: "a",
      pageTypeSlug: "page-type",
      slug: "first-parent",
      properties: [{ pagePropertySlug: "named-file-property/first-manifest" }],
    },
    {
      id: "b",
      pageTypeSlug: "page-type",
      slug: "second-parent",
      properties: [{ pagePropertySlug: "named-file-property/second-manifest" }],
    },
    {
      id: "c",
      pageTypeSlug: "page-type",
      slug: "leaf",
      extendsSlug: ["page-type/first-parent", "page-type/second-parent"],
    },
  ]

  expect([...(filePropertiesIn(values).get("leaf") ?? [])]).toEqual([["manifest", "second.json"]])
})

test("the files beside a page are read from every page type above it", () => {
  const values = [
    {
      id: "1",
      pageTypeSlug: "page-type",
      slug: "one",
      properties: [{ secret: true }, { pagePropertySlug: "patch", default: "one-default" }],
    },
    {
      id: "2",
      pageTypeSlug: "page-type",
      slug: "two",
      properties: [{ uncommitted: true }, { pagePropertySlug: "patch", default: "two-default" }],
    },
    {
      id: "3",
      pageTypeSlug: "page-type",
      slug: "both",
      extendsSlug: ["page-type/one", "page-type/two"],
    },
  ]

  const said = sidecarsIn(values).get("both")

  expect(said?.secret).toBe(true)
  expect(said?.uncommitted).toBe(true)
  expect([...(said?.besides ?? [])]).toEqual([["patch", "two-default"]])
})
