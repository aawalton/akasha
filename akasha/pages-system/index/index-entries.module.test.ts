import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import type { Shaped } from "./index-entries.module.code.ts"
import {
  filePropertiesAt,
  filePropertiesIn,
  identityIn,
  importIn,
  knownIn,
  loadedFrom,
  pathIn,
  pathsOf,
  reaches,
  relationIn,
  schemaIn,
  valueIn,
} from "./index-entries.module.code.ts"

const A = "01a04b79-0000-7000-8000-00000000000a"
const B = "01a04b79-0000-7000-8000-00000000000b"
const C = "01a04b79-0000-7000-8000-00000000000c"
const D = "01a04b79-0000-7000-8000-00000000000d"

const SCHEMA = {
  code: '{"pageTypeSlug":"file-property","targetPageTypeSlug":null}',
  domainSlug: '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain"}',
  partSlugs: '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain"}',
} as const

const scratch = scratchWorld()

afterAll(scratch.sweep)

function grounded(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-entries-repo-")
  const root = scratch.rootFor("akasha-entries-root-")
  const page = (at: string, value: Record<string, unknown>): void => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
  }
  const filed = (at: string, line: string): void => {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), `${line}\n`)
  }
  page("domain.page-type.ts", {
    id: "1",
    pageTypeSlug: "page-type",
    slug: "domain",
    extendsSlug: "page",
  })
  page("module.page-type.ts", {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: "domain",
  })
  page("parts.record-property.ts", {
    id: "3",
    pageTypeSlug: "record-property",
    slug: "parts",
    properties: [{ pagePropertySlug: "page-property/part-slugs", required: true, many: true }],
  })
  filed("identity/page-type/slug/domain.jsonl", '{"path":"domain.page-type.ts","id":"1"}')
  filed("identity/page-type/slug/module.jsonl", '{"path":"module.page-type.ts","id":"2"}')
  filed("identity/record-property/slug/parts.jsonl", '{"path":"parts.record-property.ts","id":"3"}')
  filed("schema/page-property/slug/code.jsonl", SCHEMA.code)
  filed("schema/page-property/slug/domain-slug.jsonl", SCHEMA.domainSlug)
  filed("schema/page-property/slug/part-slugs.jsonl", SCHEMA.partSlugs)
  return { root, repo }
}

function standing(pages: Readonly<Record<string, string>>): Shaped {
  return {
    targetOf: (propertySlug) => (propertySlug === "part-slugs" ? "domain" : null),
    admitting: (target) => (target === "domain" ? ["domain", "module"] : []),
    at: (pageTypeSlug, slug) => {
      const id = pages[`${pageTypeSlug}/${slug}`]
      return id === undefined ? [] : [{ path: `${slug}.${pageTypeSlug}.ts`, id }]
    },
    byId: () => null,
    fieldsOf: (propertySlug) => (propertySlug === "parts" ? ["part-slugs"] : []),
  }
}

test("a body exporting one object is answered with that object", () => {
  expect(valueIn(`export const it = { id: "${A}", slug: "a" } as const\n`)).toEqual({
    id: A,
    slug: "a",
  })
})

test("a body that will not load is answered with why rather than by throwing", () => {
  const loaded = loadedFrom("the new body")
  expect(loaded.value).toBe(null)
  expect(typeof loaded.failed).toBe("string")
})

test("a value carrying its three identifiers is filed under its id, its page type and slug, and its path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", new Set())).toEqual([
    { at: `identity/page/id/${A}.jsonl`, line },
    { at: "identity/domain/slug/a.jsonl", line },
    { at: "identity/page/path/a.domain.ts.jsonl", line },
  ])
})

test("a property held in a file is filed under the path the naming grammar gives it", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const line = `{"path":"deep/a.module.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/deep/a.module.ts", "/repo", new Set(["code", "test"]))).toEqual([
    { at: `identity/page/id/${A}.jsonl`, line },
    { at: "identity/module/slug/a.jsonl", line },
    { at: "identity/page/path/deep/a.module.ts.jsonl", line },
    { at: "identity/page/path/deep/a.module.code.ts.jsonl", line },
    { at: "identity/page/path/deep/a.module.test.ts.jsonl", line },
  ])
})

test("a path is filed under the path alone, with no scope or property above it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", new Set())).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
  ])
})

test("a file a page property holds is filed under its own path, naming the page stating it", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const line = `{"path":"deep/a.module.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/deep/a.module.ts", "/repo", new Set(["code", "test"]))).toEqual([
    { at: "path/deep/a.module.ts.jsonl", line },
    { at: "path/deep/a.module.code.ts.jsonl", line },
    { at: "path/deep/a.module.test.ts.jsonl", line },
  ])
})

test("a value carrying no slug is filed under no path, as it is filed under no identifier", () => {
  const value = { id: A, pageTypeSlug: "domain" }

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", new Set())).toEqual([])
})

test("a property no page property declares to be a file is filed under no path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", definition: "what is held" }

  expect(pathsOf(value, "/repo/a.domain.ts", "/repo", new Set(["code"]))).toEqual(["a.domain.ts"])
})

test("the properties held in a file are the ones the file shape is", () => {
  const values = [
    { id: "1", pageTypeSlug: "file-property", slug: "code" },
    { id: "2", pageTypeSlug: "relation-property", slug: "part-slugs" },
    { id: "3", pageTypeSlug: "domain", slug: "code" },
  ]

  expect([...filePropertiesIn(values)]).toEqual(["code"])
})

test("a property whose name is written in camel is filed under its kebab slug", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", codeOf: "ts" }

  expect(pathsOf(value, "/repo/a.module.ts", "/repo", new Set(["code-of"]))).toEqual([
    "a.module.ts",
    "a.module.code-of.ts",
  ])
})

test("a property is filed under its slug with the shape it is, and a target it does not name is held as null", () => {
  const value = {
    id: A,
    pageTypeSlug: "file-property",
    slug: "code",
  }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/slug/code.jsonl", line: SCHEMA.code },
  ])
})

test("a target naming its page type is filed as the slug alone", () => {
  const value = {
    pageTypeSlug: "relation-property",
    slug: "domain-slug",
    targetPageTypeSlug: "page-type/domain",
  }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/slug/domain-slug.jsonl", line: SCHEMA.domainSlug },
  ])
})

test("a property naming many pages is filed under its slug with the target it names itself", () => {
  const value = {
    id: A,
    pageTypeSlug: "relation-property",
    slug: "part-slugs",
    targetPageTypeSlug: "page-type/domain",
  }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/slug/part-slugs.jsonl", line: SCHEMA.partSlugs },
  ])
})

test("a page that is no property shape, and a property stating no slug, are filed with no schema", () => {
  expect(schemaIn({ id: A, pageTypeSlug: "domain", slug: "a" })).toEqual([])
  expect(schemaIn({ id: A, pageTypeSlug: "page-property", slug: "a" })).toEqual([])
  expect(schemaIn({ id: A, pageTypeSlug: "text-property" })).toEqual([])
})

test("the properties held in a file are read from the schema the index carries", () => {
  const { root } = grounded()

  expect([...filePropertiesAt(root)]).toEqual(["code"])
})

test("a property naming many pages takes the target it names itself, and opens no page to do it", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect(known.targetOf("part-slugs")).toBe("domain")
  expect(known.targetOf("code")).toBe(null)
  expect(known.targetOf("design")).toBe(null)
})

test("a page type admits a target every page type it extends up to also admits", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect([...known.admitting("domain")].sort()).toEqual(["domain", "module"])
  expect(known.admitting("page-property")).toEqual([])
})

test("a name carrying no page type reaches the one page admitting its property's target", () => {
  expect(reaches("c", "domain", standing({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying no page type and narrowing to two pages is refused rather than resolved", () => {
  const reached = reaches("b", "domain", standing({ "domain/b": B, "module/b": D }))

  expect("refused" in reached && reached.refused).toMatch(/narrows to 2 pages/)
})

test("a name carrying its page type reaches that page when the property declares no target", () => {
  expect(reaches("domain/b", null, standing({ "domain/b": B }))).toEqual({ id: B })
})

test("a name carrying a page type standing under the target reaches that page", () => {
  expect(reaches("module/c", "domain", standing({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying a page type the target does not admit is refused, never resolved", () => {
  const reached = reaches("page-property/b", "domain", standing({ "page-property/b": B }))

  expect("refused" in reached && reached.refused).toMatch(/admits only `domain`/)
})

test("a property naming a page is filed under that page's id against the property's kebab slug", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [
      { at: `relation/page/id/${B}/part-slugs/${A}.jsonl`, line: '{"path":"a.domain.ts"}' },
    ],
    refused: [],
  })
})

test("a property naming no page is reported and files no edge", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["nowhere"] }
  const filed = relationIn(value, "/repo/a.domain.ts", standing({}), "/repo")

  expect(filed.entries).toEqual([])
  expect(filed.refused[0] ?? "").toMatch(/carries the slug `nowhere`/)
})

test("a record property answers the fields it declares, and another property answers none", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect(known.fieldsOf("parts")).toEqual(["part-slugs"])
  expect(known.fieldsOf("part-slugs")).toEqual([])
})

test("a relation nested in a record is filed from the page, and twice over files one edge", () => {
  const value = {
    id: A,
    pageTypeSlug: "domain",
    slug: "a",
    parts: [{ partSlugs: ["domain/b"] }, { partSlugs: ["domain/b"] }],
  }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [
      { at: `relation/page/id/${B}/part-slugs/${A}.jsonl`, line: '{"path":"a.domain.ts"}' },
    ],
    refused: [],
  })
})

test("a field the record does not declare, and a record nested deeper, file no edge", () => {
  const value = {
    id: A,
    pageTypeSlug: "domain",
    slug: "a",
    parts: [{ heldSlugs: ["domain/b"], inner: { partSlugs: ["domain/b"] } }],
    holds: [{ partSlugs: ["domain/b"] }],
  }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [],
    refused: [],
  })
})

test("a record entry naming no page is reported against the record and the field it states", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", parts: [{ partSlugs: ["nowhere"] }] }
  const filed = relationIn(value, "/repo/a.domain.ts", standing({}), "/repo")

  expect(filed.entries).toEqual([])
  expect(filed.refused[0] ?? "").toMatch(/`parts part-slugs`/)
})

test("a body that will not load answers with no value rather than throwing", () => {
  expect(
    valueIn(
      `import { oidOf } from "./reading.module.code.ts"\nexport const it = { id: oidOf("x") }\n`
    )
  ).toBe(null)
  expect(valueIn("the new body")).toBe(null)
})

test("a relative specifier is filed under the path it reaches, against the path importing it", () => {
  const body = 'import { one } from "../one.module.code.ts"\nexport * from "./two.module.code.ts"\n'

  expect(importIn(body, "/repo/akasha/deep/a.module.code.ts", "/repo")).toEqual([
    {
      at: "import/path/akasha/one.module.code.ts.jsonl",
      line: '{"path":"akasha/deep/a.module.code.ts"}',
    },
    {
      at: "import/path/akasha/deep/two.module.code.ts.jsonl",
      line: '{"path":"akasha/deep/a.module.code.ts"}',
    },
  ])
})

test("a type-only import files the same edge as any other import", () => {
  const filed = importIn(
    'import type { One } from "./one.module.ts"\n',
    "akasha/a.module.code.ts",
    "/repo"
  )

  expect(filed.map((one) => one.at)).toEqual(["import/path/akasha/one.module.ts.jsonl"])
})

test("a package specifier files no edge, and a file it names that does not stand files one", () => {
  const body =
    'import ts from "typescript"\nimport { x } from "node:fs"\nimport { y } from "./gone.ts"\n'

  expect(importIn(body, "akasha/a.module.code.ts", "/repo").map((one) => one.at)).toEqual([
    "import/path/akasha/gone.ts.jsonl",
  ])
})

test("a specifier reaching above the repository root files no edge", () => {
  expect(
    importIn('import { x } from "../../../away.ts"\n', "akasha/a.module.code.ts", "/repo")
  ).toEqual([])
})

test("a file that is not TypeScript files no edge whatever its body says", () => {
  expect(importIn('import { x } from "./one.ts"\n', "akasha/a.module.md", "/repo")).toEqual([])
})
