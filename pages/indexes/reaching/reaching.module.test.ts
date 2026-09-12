import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  B,
  C,
  D,
  declaring,
  grounded,
  type Kept,
  keptFiled,
  propertyKind,
  scratch,
  shaped,
  shaping,
} from "akasha/pages/indexes/entries/index-entries.module.test-fixtures.ts"
import { lineFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  knownIn,
  namesMortal,
  reaches,
  type Shaped,
} from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import { readingAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"

afterAll(scratch.sweep)

function knownAt(root: string, repo: string): Shaped {
  return knownIn(readingAt(root), (path) => valueAt(path, repo))
}

test("a property naming many pages takes the target it names itself, and opens no page to do it", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)

  expect(known.targetOf("part-slugs")).toBe("domain")
  expect(known.targetOf("code")).toBe(null)
  expect(known.targetOf("design")).toBe(null)
})

test("a page type admits a target every page type it extends up to also admits", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)

  expect([...known.admitting("domain")].sort()).toEqual(["domain", "module"])
  expect(known.admitting("page-property")).toEqual([])
})

function twoParents(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-reaching-repo-")
  const root = scratch.rootFor("akasha-reaching-root-")
  const valued: string[] = []
  const typed = (slug: string, above: readonly string[], id: string): undefined => {
    const path = `${slug}.page-type.ts`
    const value = { id, pageTypeSlug: "page-type", slug, extends: above }
    writeFileSync(join(repo, path), `export const it = ${JSON.stringify(value)}\n`)
    mkdirSync(join(root, "identity/page-type/page-type/slug"), { recursive: true })
    writeFileSync(
      join(root, `identity/page-type/page-type/slug/${slug}.jsonl`),
      `${JSON.stringify({ path, id })}\n`
    )
    valued.push(JSON.stringify({ path, value }))
  }
  typed("module", ["domain"], "1")
  typed("page-property", ["page"], "2")
  typed("computed-property", ["module", "page-property"], "3")
  mkdirSync(join(root, "value"), { recursive: true })
  writeFileSync(join(root, "value/page-type.jsonl"), `${valued.join("\n")}\n`)
  return { root, repo }
}

test("a page type naming two parents admits what either of the two admits", () => {
  const { root, repo } = twoParents()
  const known = knownAt(root, repo)

  expect([...known.admitting("domain")].sort()).toEqual(["computed-property", "domain", "module"])
  expect([...known.admitting("page")].sort()).toEqual([
    "computed-property",
    "page",
    "page-property",
  ])
})

test("a name carrying no page type reaches the one page admitting its property's target", () => {
  expect(reaches("c", "domain", shaped({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying no page type and narrowing to two pages is refused rather than resolved", () => {
  const reached = reaches("b", "domain", shaped({ "domain/b": B, "module/b": D }))

  expect("refused" in reached && reached.refused).toMatch(/narrows to 2 pages/)
})

test("a name carrying its page type reaches that page when the property declares no target", () => {
  expect(reaches("domain/b", null, shaped({ "domain/b": B }))).toEqual({ id: B })
})

test("a name carrying a page type standing under the target reaches that page", () => {
  expect(reaches("module/c", "domain", shaped({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying a page type the target does not admit is refused, never resolved", () => {
  const reached = reaches("page-property/b", "domain", shaped({ "page-property/b": B }))

  expect("refused" in reached && reached.refused).toMatch(/admits only `domain`/)
})

test("a property naming members takes the target each of those members declares", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)

  expect(known.targetOf("either")).toEqual(["domain", "note"])
  expect(known.targetOf("page-domain")).toBe("domain")
})

test("a name one member of a one of admits reaches its page through that member", () => {
  expect(reaches("note/c", ["domain", "note"], shaped({ "note/c": C }))).toEqual({ id: C })
})

test("a name no member of a one of admits is refused, never resolved", () => {
  const reached = reaches("page-property/b", ["domain", "note"], shaped({ "page-property/b": B }))

  expect("refused" in reached && reached.refused).toMatch(/admits only `domain` or `note`/)
})

test("a name two members of a one of reach one page by reaches that page once", () => {
  expect(reaches("b", ["domain", "note"], shaped({ "domain/b": B, "note/b": B }))).toEqual({
    id: B,
  })
})

test("a name two members of a one of reach two pages by is refused rather than resolved", () => {
  const reached = reaches("b", ["domain", "note"], shaped({ "domain/b": B, "note/b": D }))

  expect("refused" in reached && reached.refused).toMatch(/narrows to 2 pages/)
})

test("a key one property carries reaches it, and a key no property carries reaches none", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)
  const value = { pageTypeSlug: "domain" }

  expect(known.slugOfKeyIn(value, "partSlugs")).toBe("part-slugs")
  expect(known.slugOfKeyIn(value, "domain")).toBe("page-domain")
  expect(known.slugOfKeyIn(value, "design")).toBe(null)
})

test("a key two properties carry reaches neither where the page's type declares neither", () => {
  const { root, repo } = grounded()
  declaring(root, "relation-property", "other-slugs", {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
    unique: null,
    slug: "other-slugs",
    propertySlug: "part-slugs",
  })
  const known = knownAt(root, repo)

  expect(known.slugOfKeyIn({ type: "domain" }, "partSlugs")).toBe(null)
})

test("a field reaches only a property the record it stands in declares", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)

  expect(known.fieldOfKey("parts", "partSlugs")).toBe("part-slugs")
  expect(known.fieldOfKey("parts", "design")).toBe(null)
  expect(known.fieldOfKey("part-slugs", "partSlugs")).toBe(null)
})

test("a record property answers the fields it declares, and another property answers none", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)

  expect(known.fieldsOf("parts")).toEqual(["part-slugs"])
  expect(known.fieldsOf("part-slugs")).toEqual([])
})

test("a name states its own page type's mortality, over whatever its property targets", () => {
  const known = shaped({})

  expect(namesMortal("note/gone", "domain", known)).toBe(true)
  expect(namesMortal("domain/gone", "note", known)).toBe(false)
})

test("a name stating no page type is mortal only where every target its property declares is", () => {
  const known = shaped({})

  expect(namesMortal("gone", "note", known)).toBe(true)
  expect(namesMortal("gone", ["domain", "note"], known)).toBe(false)
  expect(namesMortal("gone", null, known)).toBe(false)
})

test("a name carrying a page type and a scope reaches the page filed under that scope", () => {
  expect(reaches("module/held/c", "domain", shaped({ "module/held/c": C }))).toEqual({ id: C })
})

test("a name carrying a scope is not read as the slug it ends with", () => {
  const reached = reaches("domain/whatever/b", "domain", shaped({ "domain/b": B }))

  expect("refused" in reached).toBe(true)
  if ("refused" in reached) expect(reached.refused).toContain("within `whatever`")
})

function entryShapes(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-reaching-entry-repo-")
  const root = scratch.rootFor("akasha-reaching-entry-root-")
  const kept: Kept = new Map()
  const filed = (at: string, line: string): undefined => {
    lineFiled(root, at, line)
  }
  const page = (at: string, value: Record<string, unknown>): undefined => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
    const type = String(value["pageTypeSlug"])
    kept.set(type, [...(kept.get(type) ?? []), JSON.stringify({ path: at, value })])
    filed(
      `identity/page-type/${type}/slug/${String(value["slug"])}.jsonl`,
      JSON.stringify({ path: at, id: value["id"] })
    )
  }
  page("cases.page-property-entry.ts", {
    id: "1",
    pageTypeSlug: "page-property-entry",
    slug: "cases",
    propertySlug: "cases",
    properties: [{ pagePropertySlug: "relation-property/noted-page" }],
  })
  page("logs.page-property-entry.ts", {
    id: "2",
    pageTypeSlug: "page-property-entry",
    slug: "logs",
    propertySlug: "logs",
    properties: [{ pagePropertySlug: "text-property/log-text" }],
  })
  page("cased.page-type.ts", {
    id: "3",
    pageTypeSlug: "page-type",
    slug: "cased",
    properties: [
      { pagePropertySlug: "page-property-entry/cases" },
      { pagePropertySlug: "page-property-entry/logs" },
    ],
  })
  shaping(kept, "relation-property", "noted-page", {
    propertySlug: "noted-page",
    targetPageType: "domain",
  })
  shaping(kept, "text-property", "log-text", { propertySlug: "log-text" })
  propertyKind(kept, "page-property-entry")
  keptFiled(root, kept)
  return { root, repo }
}

test("an entry shape declaring a relation is answered, and one declaring none is left out", () => {
  const { root, repo } = entryShapes()
  const known = knownAt(root, repo)

  expect(known.entriedIn({ pageTypeSlug: "cased" }).map((one) => one.pagePropertySlug)).toEqual([
    "cases",
  ])
})

function oneOfRecords(): { readonly root: string; readonly repo: string } {
  const repo = scratch.rootFor("akasha-reaching-oneof-repo-")
  const root = scratch.rootFor("akasha-reaching-oneof-root-")
  const kept: Kept = new Map()
  const filed = (at: string, line: string): undefined => {
    lineFiled(root, at, line)
  }
  const page = (at: string, value: Record<string, unknown>): undefined => {
    writeFileSync(join(repo, at), `export const it = ${JSON.stringify(value)} as const\n`)
    const type = String(value["pageTypeSlug"])
    kept.set(type, [...(kept.get(type) ?? []), JSON.stringify({ path: at, value })])
    filed(
      `identity/page-type/${type}/slug/${String(value["slug"])}.jsonl`,
      JSON.stringify({ path: at, id: value["id"] })
    )
  }
  page("holder.page-type.ts", { id: "1", pageTypeSlug: "page-type", slug: "holder" })
  page("one-held.record-property.ts", {
    id: "2",
    pageTypeSlug: "record-property",
    slug: "one-held",
    propertySlug: "one-held",
    properties: [{ pageProperty: "relation-property/part-slugs" }],
  })
  page("many-held.record-property.ts", {
    id: "3",
    pageTypeSlug: "record-property",
    slug: "many-held",
    propertySlug: "many-held",
    properties: [{ pageProperty: "relation-property/note-slug" }],
  })
  page("holds.one-of-property.ts", {
    id: "4",
    pageTypeSlug: "one-of-property",
    slug: "holds",
    propertySlug: "holds",
    members: ["record-property/one-held", "record-property/many-held"],
  })
  shaping(kept, "relation-property", "part-slugs", {
    propertySlug: "part-slugs",
    targetPageType: "domain",
  })
  shaping(kept, "relation-property", "note-slug", {
    propertySlug: "note-slug",
    targetPageType: "note",
  })
  propertyKind(kept, "record-property")
  propertyKind(kept, "one-of-property")
  keptFiled(root, kept)
  return { root, repo }
}

test("a property naming record members has every field those records declare", () => {
  const { root, repo } = oneOfRecords()
  const known = knownAt(root, repo)

  expect(known.fieldsOf("holds")).toEqual(["part-slugs", "note-slug"])
  expect(known.fieldOfKey("holds", "partSlugs")).toBe("part-slugs")
  expect(known.fieldOfKey("holds", "noteSlug")).toBe("note-slug")
  expect(known.fieldOfKey("holds", "design")).toBe(null)
})

test("a property naming members that declare no fields has none of its own", () => {
  const { root, repo } = grounded()
  const known = knownAt(root, repo)

  expect(known.fieldsOf("either")).toEqual([])
})

test("a name carrying a scope under a page type the target does not admit is refused", () => {
  const reached = reaches("page-property/held/b", "domain", shaped({ "page-property/held/b": B }))

  expect("refused" in reached && reached.refused).toMatch(/admits only `domain`/)
})
