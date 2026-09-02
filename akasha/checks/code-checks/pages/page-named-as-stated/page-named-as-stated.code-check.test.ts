import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { noPathsFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { shadowAsked, shadowFor } from "@akasha/pages-system/shadow"
import { bodiesIn, bytesOf } from "@akasha/testing-system/bodying"
import {
  change,
  declaring,
  landing,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  pageIn,
  pageNamedAsStated,
  pagesIn,
  reasonsIn,
} from "./page-named-as-stated.code-check.code.ts"

const ROOT = "/repo"

const HELD: ReadonlyMap<string, string | null> = new Map([
  ["code", null],
  ["test", null],
])

const given = bodiesIn(ROOT)

function reasons(
  at: string,
  body: string,
  held: ReadonlyMap<string, string | null> = HELD
): readonly string[] {
  return reasonsIn(given(at, body), held)
}

function page(slug: string, pageTypeSlug: string, named: string = exportedAs(slug)): string {
  return [
    `export const ${named} = {`,
    '  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1736",',
    `  pageTypeSlug: "${pageTypeSlug}",`,
    `  slug: "${slug}",`,
    '  definition: "what is held",',
    "} as const satisfies Page",
    "",
  ].join("\n")
}

test("a page whose file is named for the slug it states is let through", () => {
  expect(reasons("akasha/ledger.module.ts", page("ledger", "module"))).toEqual([])
})

test("a page naming itself otherwise than its file is refused, and both names are said", () => {
  const said = reasons("akasha/ledger.module.ts", page("ledges", "module"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `ledges`")
  expect(said[0]).toContain("its file is named `ledger`")
})

test("a page stating a page type its file does not carry is refused", () => {
  const said = reasons("akasha/ledger.module.ts", page("ledger", "domain"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page type as `domain`")
})

test("a page wrong in both its slug and its page type is told both", () => {
  const said = reasons("akasha/ledger.module.ts", page("ledges", "domain"))
  expect(said).toHaveLength(2)
})

test("the stem is bound to the slug, never to anything a reader would call a title", () => {
  const body = page("ledger", "module").replace(
    'definition: "what is held",',
    'title: "Something Else",'
  )
  expect(reasons("akasha/ledger.module.ts", body)).toEqual([])
})

test("a property's file holds no page value, so it is not judged here", () => {
  const body = "export function ledgerIn(root: string) {\n  return root\n}\n"
  expect(reasons("akasha/ledger.module.code.ts", body)).toEqual([])
})

test("a page is found through the satisfies and as const it is written with", () => {
  const said = pageIn("akasha/ledger.module.ts", page("ledger", "module"))
  expect(said).toEqual({ slug: "ledger", pageTypeSlug: "module", named: "ledger" })
})

test("a file whose name is not a page's shape is passed over", () => {
  expect(reasons("akasha/notes.txt", page("ledges", "module"))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const bytes = new Uint8Array([0xff, 0xfe, 0x00])
  const raw = { root: ROOT, path: "akasha/raw.module.ts", bytes }
  expect(() => reasonsIn(raw, HELD)).toThrow("akasha/raw.module.ts")
  expect(() => reasonsIn(raw, HELD)).toThrow("not valid UTF-8")
})

test("a file is judged by its own name rather than by the folders above it", () => {
  const body = page("ledger", "module")
  expect(reasons("akasha/write-system/ledger.module.ts", body)).toEqual([])
  const said = reasons("akasha/ledger/held.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("its file is named `held`")
})

test("a slug never carries a dot, so a name carrying one names some other page", () => {
  const body = page("held.ledger", "module", "heldLedger")
  const said = reasons("akasha/held.ledger.module.ts", body)
  expect(said).toHaveLength(3)
  expect(said[0]).toContain("its file is named `held`")
  expect(said[1]).toContain("its file is named `ledger`")
})

test("a page property's code file is no page, so a value it holds is passed over", () => {
  const body = page("ledges", "domain")
  expect(reasons("akasha/ledger.module.code.ts", body)).toEqual([])
})

test("a page property's test file is no page, so a fixture it holds is passed over", () => {
  const body = page("note", "relation-property")
  expect(reasons("akasha/pages-system/index/indexing.module.test.ts", body)).toEqual([])
})

test("a property newly held in a file is passed over, the set being the index's and not a list here", () => {
  const body = page("ledges", "domain")
  const held: ReadonlyMap<string, string | null> = new Map([
    ["code", null],
    ["test", null],
    ["note", null],
  ])
  expect(reasons("akasha/ledger.module.note.ts", body, held)).toEqual([])
  expect(reasons("akasha/ledger.module.note.ts", body)).toHaveLength(2)
})

test("an index that cannot say which properties are held in a file refuses, rather than naming none", () => {
  const held = change(ROOT, [])
  expect(() => pageNamedAsStated(held, shadowAsked(held))).toThrow("could not be answered")
})

test("a property whose file is named for the shape it states is let through", () => {
  const body = page("part-slugs", "relation-property")
  expect(reasons("akasha/part-slugs.relation-property.ts", body)).toEqual([])
})

test("a property whose file is named for a shape it does not state is refused", () => {
  const body = page("part-slugs", "text-property")
  const said = reasons("akasha/part-slugs.relation-property.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page type as `text-property`")
})

test("a fixture written plainly at the top of a test file is passed over", () => {
  const body = 'const NOTE = {\n  pageTypeSlug: "relation-property",\n  slug: "note",\n}\n'
  expect(reasons("akasha/index-schema.module.test.ts", body)).toEqual([])
})

test("a real page file is still judged, so the reach is narrowed to page files alone", () => {
  const said = reasons("akasha/ledger.module.ts", page("ledges", "module"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `ledges`")
})

test("a value stating a slug but no page type is no page here, so it is passed over", () => {
  const body = 'export const held = {\n  slug: "ledges",\n} as const satisfies Page\n'
  expect(reasons("akasha/ledger.module.ts", body)).toEqual([])
})

test("a value the file keeps to itself is judged the same as an exported one", () => {
  const body = page("ledges", "module").replace("export const", "const")
  expect(reasons("akasha/ledger.module.ts", body)).toHaveLength(1)
})

test("a file stating a second page is refused, and the extra page is named", () => {
  const body = `${page("ledger", "module")}${page("ledges", "domain")}`
  const said = reasons("akasha/ledger.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("states 2 pages")
  expect(said[0]).toContain("`domain/ledges`")
  expect(said[0]).toContain("filed by nothing")
})

test("the first page a file states is still the one its name is judged against", () => {
  const body = `${page("ledges", "module")}${page("held", "domain")}`
  const said = reasons("akasha/ledger.module.ts", body)
  expect(said).toHaveLength(2)
  expect(said[0]).toContain("names itself `ledges`")
  expect(said[1]).toContain("states 2 pages")
})

test("every page a file states past the first is named in the one refusal", () => {
  const body = [page("ledger", "module"), page("ledges", "domain"), page("held", "domain")].join("")
  const said = reasons("akasha/ledger.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("states 3 pages")
  expect(said[0]).toContain("`domain/ledges`")
  expect(said[0]).toContain("`domain/held`")
})

test("a type declaring a page's keys states no page, so the one page beside it stands alone", () => {
  const shape = "export type Held = {\n  pageTypeSlug: PageTypeSlug\n  slug: Slug\n}\n"
  expect(reasons("akasha/ledger.module.ts", `${shape}${page("ledger", "module")}`)).toEqual([])
})

test("a second page in a file a page property holds is passed over with the file", () => {
  const body = `${page("ledger", "module")}${page("ledges", "domain")}`
  expect(reasons("akasha/ledger.module.code.ts", body)).toEqual([])
})

test("every page a file states is answered, and the first alone is answered by `pageIn`", () => {
  const body = `${page("ledger", "module")}${page("ledges", "domain")}`
  expect(pagesIn("akasha/ledger.module.ts", body)).toHaveLength(2)
  expect(pageIn("akasha/ledger.module.ts", body)).toEqual({
    slug: "ledger",
    pageTypeSlug: "module",
    named: "ledger",
  })
})

test("a file stating no page is answered as no pages rather than as one", () => {
  expect(pagesIn("akasha/ledger.module.ts", "export const held = 1\n")).toEqual([])
  expect(pageIn("akasha/ledger.module.ts", "export const held = 1\n")).toBeNull()
})

test("a page written plainly, with no satisfies at all, is still judged", () => {
  const body = 'export const ledges = {\n  pageTypeSlug: "module",\n  slug: "ledges",\n}\n'
  const said = reasons("akasha/ledger.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `ledges`")
})

test("a page bound to the name its slug makes is let through", () => {
  const body = page("page-named-as-stated", "check")
  expect(reasons("akasha/page-named-as-stated.check.ts", body)).toEqual([])
})

test("a page bound to some other name is refused, and the reason says both names", () => {
  const body = page("part-slugs", "relation-property", "slugs")
  const said = reasons("akasha/part-slugs.relation-property.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("bound as `slugs`")
  expect(said[0]).toContain("named `partSlugs`")
})

test("a slug whose export name is a reserved word is refused whatever the page is bound to", () => {
  const body = page("import", "page-type", "importEdge")
  const said = reasons("akasha/import.page-type.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("bound as `importEdge`")
  expect(said[0]).toContain("named `import`")
})

test("a page bound by a pattern rather than a name is refused", () => {
  const body = 'export const { slug } = {\n  pageTypeSlug: "module",\n  slug: "ledger",\n}\n'
  const said = reasons("akasha/ledger.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("bound to no name")
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PROPERTY = "akasha/note.file-property.ts"

const BESIDE = "akasha/ledger.module.note.ts"

function rooted(fileProperties: readonly string[]): string {
  const root = scratch.rootFor("akasha-page-named-")
  noPathsFiled(root)
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "page-type" })
  for (const one of fileProperties) {
    declaring(root, one, { pageTypeSlug: "file-property", unique: null })
  }
  return root
}

function property(slug: string): Uint8Array {
  return bytesOf(
    [
      `export const ${slug} = {`,
      '  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1737",',
      '  pageTypeSlug: "file-property",',
      `  slug: "${slug}",`,
      `  propertySlug: "${slug}",`,
      "} as const satisfies Page",
      "",
    ].join("\n")
  )
}

function judged(over: Change): readonly Judged[] {
  const cast = shadowFor(over)
  if ("refused" in cast) throw new Error(cast.refused)
  return pageNamedAsStated(over, cast.shadow)
}

test("a file property the change introduces holds its file back from being judged a page", () => {
  const root = rooted(["code"])
  const bodies = { [PROPERTY]: property("note"), [BESIDE]: bytesOf(page("ledges", "domain")) }
  expect(judged(landing(root, bodies))).toEqual([])
})

test("a file property the change takes away leaves its file judged as the page the file is", () => {
  const root = rooted(["note"])
  const bodies = { [PROPERTY]: null, [BESIDE]: bytesOf(page("ledges", "domain")) }
  const said = judged(landing(root, bodies, { [PROPERTY]: property("note") }))
  expect(said.map((one) => one.path)).toEqual([BESIDE, BESIDE])
})
