import { afterAll, expect, test } from "bun:test"
import { pathsOf } from "../path-claiming/path-claiming.module.code.ts"
import { readingAt } from "../surface/index-surface.module.code.ts"
import {
  fileKeysAt,
  fileKeysIn,
  filePropertiesAt,
  filePropertiesIn,
  filePropertiesOver,
  schemaAt,
  uniquePropertiesAt,
} from "./index-entries.module.code.ts"
import {
  A,
  declaring,
  EQUALLY_NEAR,
  filedAs,
  grounded,
  NEARER,
  SHARED_NAME,
  scratch,
  TWO_ABOVE,
} from "./index-entries.module.test-fixtures.ts"

afterAll(scratch.sweep)

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

test("the properties held in a file are read from the schema the index carries", () => {
  const { root } = grounded()

  expect([...fileKeysAt(readingAt(root))]).toEqual([["code", null]])
})

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
    unique: "page",
    slug: "id",
    propertySlug: "id",
  })

  expect([...uniquePropertiesAt(readingAt(index)).entries()]).toEqual([
    ["id", { key: "id", uniqueKind: "page" }],
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
    ["held-name", { key: "named", uniqueKind: "page-type" }],
  ])
})

test("a schema line stating no key declares no identifier", () => {
  const index = scratch.rootFor("akasha-entries-keyless-")
  declaring(index, "text-property", "id", {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: "page",
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
  declaring(index, "file-property", "manifest", {
    pageTypeSlug: "file-property",
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
  const said = filePropertiesIn(SHARED_NAME)

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

  expect(filePropertiesOver(readingAt(root), []).get("note")).toBe(undefined)
})

test("what each page type holds in a file is answered off the index carrying no change", () => {
  const { root } = grounded()
  const reading = readingAt(root)

  expect(filePropertiesAt(reading)).toEqual(filePropertiesOver(reading, []))
})

test("a page type naming two page types above it carries what each of them declares", () => {
  expect([...(filePropertiesIn(TWO_ABOVE).get("both") ?? [])]).toEqual([
    ["beta", null],
    ["alpha", null],
  ])
})

test("a property two page types above declare is taken from the nearer of them", () => {
  expect([...(filePropertiesIn(NEARER).get("leaf") ?? [])]).toEqual([["manifest", "near.json"]])
})

test("a property two page types equally near declare is taken from the last one named", () => {
  expect([...(filePropertiesIn(EQUALLY_NEAR).get("leaf") ?? [])]).toEqual([
    ["manifest", "second.json"],
  ])
})
