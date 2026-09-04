import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { valueAt } from "@akasha/pages-system/page-value"
import {
  B,
  C,
  D,
  grounded,
  scratch,
  shaped,
} from "../index-entries/index-entries.module.test-fixtures.ts"
import { readingAt } from "../index-surface/index-surface.module.code.ts"
import { knownIn, reaches, type Shaped } from "./reaching.module.code.ts"

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
  const typed = (slug: string, above: readonly string[], id: string): undefined => {
    const value = { id, pageTypeSlug: "page-type", slug, extendsSlug: above }
    writeFileSync(
      join(repo, `${slug}.page-type.ts`),
      `export const it = ${JSON.stringify(value)}\n`
    )
    mkdirSync(join(root, "identity/page-type/slug"), { recursive: true })
    writeFileSync(
      join(root, `identity/page-type/slug/${slug}.jsonl`),
      `${JSON.stringify({ path: `${slug}.page-type.ts`, id })}\n`
    )
  }
  typed("module", ["domain"], "1")
  typed("page-property", ["page"], "2")
  typed("computed-property", ["module", "page-property"], "3")
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
  expect(known.targetOf("domain-slug")).toBe("domain")
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
  expect(known.slugOfKeyIn(value, "domainSlug")).toBe("domain-slug")
  expect(known.slugOfKeyIn(value, "design")).toBe(null)
})

test("a key two properties carry reaches neither where the page's type declares neither", () => {
  const { root, repo } = grounded()
  mkdirSync(join(root, "schema/page-property/relation-property/slug"), { recursive: true })
  writeFileSync(
    join(root, "schema/page-property/relation-property/slug/other-slugs.jsonl"),
    `${JSON.stringify({
      pageTypeSlug: "relation-property",
      targetPageTypeSlug: "domain",
      unique: null,
      slug: "other-slugs",
      propertySlug: "part-slugs",
    })}\n`
  )
  const known = knownAt(root, repo)

  expect(known.slugOfKeyIn({ pageTypeSlug: "domain" }, "partSlugs")).toBe(null)
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
