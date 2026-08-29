import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import type { Known } from "./index-entries.module.code.ts"
import {
  filePropertiesAt,
  filePropertiesIn,
  identityIn,
  knownIn,
  loadedFrom,
  pathsOf,
  reaches,
  relationIn,
  valueIn,
} from "./index-entries.module.code.ts"

const A = "01a04b79-0000-7000-8000-00000000000a"
const B = "01a04b79-0000-7000-8000-00000000000b"
const C = "01a04b79-0000-7000-8000-00000000000c"
const D = "01a04b79-0000-7000-8000-00000000000d"

function grounded(): { readonly root: string; readonly repo: string } {
  const repo = mkdtempSync(join(tmpdir(), "akasha-entries-repo-"))
  const root = mkdtempSync(join(tmpdir(), "akasha-entries-root-"))
  const page = (at: string, value: Record<string, unknown>): void => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
  }
  const filed = (at: string, line: string): void => {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), `${line}\n`)
  }
  page("domain-slug.page-property-type.ts", {
    id: "4",
    pageTypeSlug: "page-property-type",
    slug: "domain-slug",
    kind: "relation",
    targetPageTypeSlug: "domain",
  })
  page("part-slugs.page-property-type.ts", {
    id: "3",
    pageTypeSlug: "page-property-type",
    slug: "part-slugs",
    kind: "list",
    entrySlug: "domain-slug",
  })
  page("code.page-property-type.ts", {
    id: "5",
    pageTypeSlug: "page-property-type",
    slug: "code",
    kind: "file",
  })
  page("domain.page-type.ts", { id: "1", pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" })
  page("module.page-type.ts", { id: "2", pageTypeSlug: "page-type", slug: "module", extendsSlug: "domain" })
  filed("identity/page-property-type/slug/code.jsonl", '{"path":"code.page-property-type.ts","id":"5"}')
  filed("identity/page-property-type/slug/domain-slug.jsonl", '{"path":"domain-slug.page-property-type.ts","id":"4"}')
  filed("identity/page-property-type/slug/part-slugs.jsonl", '{"path":"part-slugs.page-property-type.ts","id":"3"}')
  filed("identity/page-type/slug/domain.jsonl", '{"path":"domain.page-type.ts","id":"1"}')
  filed("identity/page-type/slug/module.jsonl", '{"path":"module.page-type.ts","id":"2"}')
  return { root, repo }
}

function standing(pages: Readonly<Record<string, string>>): Known {
  return {
    targetOf: (propertySlug) => (propertySlug === "part-slugs" ? "domain" : null),
    admitting: (target) => (target === "domain" ? ["domain", "module"] : []),
    at: (pageTypeSlug, slug) => {
      const id = pages[`${pageTypeSlug}/${slug}`]
      return id === undefined ? [] : [{ path: `${slug}.${pageTypeSlug}.ts`, id }]
    },
    byId: () => null,
  }
}

test("a body exporting one object is answered with that object", () => {
  expect(valueIn(`export const it = { id: "${A}", slug: "a" } as const\n`)).toEqual({ id: A, slug: "a" })
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

test("a property no page property type declares to be a file is filed under no path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", definition: "what is held" }

  expect(pathsOf(value, "/repo/a.domain.ts", "/repo", new Set(["code"]))).toEqual(["a.domain.ts"])
})

test("the properties held in a file are the ones a page property type declares as such", () => {
  const values = [
    { id: "1", pageTypeSlug: "page-property-type", slug: "code", kind: "file" },
    { id: "2", pageTypeSlug: "page-property-type", slug: "part-slugs", kind: "list" },
    { id: "3", pageTypeSlug: "domain", slug: "code", kind: "file" },
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

test("the properties held in a file are read from the pages the index already names", () => {
  const { root, repo } = grounded()

  expect([...filePropertiesAt(root, repo)]).toEqual(["code"])
  rmSync(root, { recursive: true, force: true })
  rmSync(repo, { recursive: true, force: true })
})

test("a list property takes its target from the property its entry names", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect(known.targetOf("part-slugs")).toBe("domain")
  expect(known.targetOf("design")).toBe(null)
  rmSync(root, { recursive: true, force: true })
  rmSync(repo, { recursive: true, force: true })
})

test("a page type admits a target every page type it extends up to also admits", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect([...known.admitting("domain")].sort()).toEqual(["domain", "module"])
  expect(known.admitting("page-property-type")).toEqual([])
  rmSync(root, { recursive: true, force: true })
  rmSync(repo, { recursive: true, force: true })
})

test("a name carrying no page type reaches the one page admitting its property's target", () => {
  expect(reaches("c", "domain", standing({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying no page type and narrowing to two pages is refused rather than resolved", () => {
  const reached = reaches("b", "domain", standing({ "domain/b": B, "module/b": D }))

  expect("refused" in reached && reached.refused).toMatch(/narrows to 2 pages/)
})

test("a name carrying its page type reaches that page whatever its property declares", () => {
  expect(reaches("domain/b", null, standing({ "domain/b": B }))).toEqual({ id: B })
})

test("a property naming a page is filed under that page's id against the property's kebab slug", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [{ at: `relation/page/id/${B}/part-slugs/${A}.jsonl`, line: '{"path":"a.domain.ts"}' }],
    refused: [],
  })
})

test("a property naming no page is reported and files no edge", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["nowhere"] }
  const filed = relationIn(value, "/repo/a.domain.ts", standing({}), "/repo")

  expect(filed.entries).toEqual([])
  expect(filed.refused[0] ?? "").toMatch(/carries the slug `nowhere`/)
})
