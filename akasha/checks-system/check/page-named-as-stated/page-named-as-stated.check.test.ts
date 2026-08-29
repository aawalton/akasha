import { expect, test } from "bun:test"
import { heldInAFileAt, pageIn, reasonsIn } from "./page-named-as-stated.check.code.ts"

const ROOT = "/repo"

const HELD: ReadonlySet<string> = new Set(["code", "test"])

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

function reasons(at: string, body: string, held: ReadonlySet<string> = HELD): readonly string[] {
  return reasonsIn(given(at, body), held)
}

function page(slug: string, pageTypeSlug: string): string {
  return [
    "export const held = {",
    '  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1736",',
    `  pageTypeSlug: "${pageTypeSlug}",`,
    `  slug: "${slug}",`,
    '  definition: "what is held",',
    "} as const satisfies Page",
    "",
  ].join("\n")
}

test("a page whose file is named for the slug it states is let through", () => {
  expect(reasons("akasha/corpus.module.ts", page("corpus", "module"))).toEqual([])
})

test("a page naming itself otherwise than its file is refused, and both names are said", () => {
  const said = reasons("akasha/corpus.module.ts", page("corpse", "module"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `corpse`")
  expect(said[0]).toContain("its file is named `corpus`")
})

test("a page stating a page type its file does not carry is refused", () => {
  const said = reasons("akasha/corpus.module.ts", page("corpus", "domain"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page type as `domain`")
})

test("a page wrong in both its slug and its page type is told both", () => {
  const said = reasons("akasha/corpus.module.ts", page("corpse", "domain"))
  expect(said).toHaveLength(2)
})

test("the stem is bound to the slug, never to anything a reader would call a title", () => {
  const body = page("corpus", "module").replace(
    'definition: "what is held",',
    'title: "Something Else",'
  )
  expect(reasons("akasha/corpus.module.ts", body)).toEqual([])
})

test("a property's file holds no page value, so it is not judged here", () => {
  const body = "export function corpusIn(root: string) {\n  return root\n}\n"
  expect(reasons("akasha/corpus.module.code.ts", body)).toEqual([])
})

test("a page is found through the satisfies and as const it is written with", () => {
  const said = pageIn("akasha/corpus.module.ts", page("corpus", "module"))
  expect(said).toEqual({ slug: "corpus", pageTypeSlug: "module" })
})

test("a file whose name is not a page's shape is passed over", () => {
  expect(reasons("akasha/notes.txt", page("corpse", "module"))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const bytes = new Uint8Array([0xff, 0xfe, 0x00])
  expect(reasonsIn({ root: ROOT, path: "akasha/raw.module.ts", bytes }, HELD)).toEqual([])
})

test("a file is judged by its own name rather than by the folders above it", () => {
  const body = page("corpus", "module")
  expect(reasons("akasha/write-system/corpus.module.ts", body)).toEqual([])
  const said = reasons("akasha/corpus/held.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("its file is named `held`")
})

test("a stem carrying a dot is bound whole to the slug", () => {
  const body = page("held.corpus", "module")
  expect(reasons("akasha/held.corpus.module.ts", body)).toEqual([])
})

test("a page property's code file is no page, so a value it holds is passed over", () => {
  const body = page("corpse", "domain")
  expect(reasons("akasha/corpus.module.code.ts", body)).toEqual([])
})

test("a page property's test file is no page, so a fixture it holds is passed over", () => {
  const body = page("note", "page-property-type")
  expect(reasons("akasha/data-system/index/indexing.module.test.ts", body)).toEqual([])
})

test("a property newly held in a file is passed over, the set being the index's and not a list here", () => {
  const body = page("corpse", "domain")
  const held: ReadonlySet<string> = new Set(["code", "test", "note"])
  expect(reasons("akasha/corpus.module.note.ts", body, held)).toEqual([])
  expect(reasons("akasha/corpus.module.note.ts", body)).toHaveLength(2)
})

test("an index that cannot say which properties are held in a file refuses, rather than naming none", () => {
  expect(() => heldInAFileAt(ROOT)).toThrow("could not be answered")
})

test("a fixture written plainly at the top of a test file is passed over", () => {
  const body = 'const NOTE = {\n  pageTypeSlug: "page-property-type",\n  slug: "note",\n}\n'
  expect(reasons("akasha/index-schema.module.test.ts", body)).toEqual([])
})

test("a real page file is still judged, so the reach is narrowed to page files alone", () => {
  const said = reasons("akasha/corpus.module.ts", page("corpse", "module"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `corpse`")
})

test("a value stating a slug but no page type is no page here, so it is passed over", () => {
  const body = 'export const held = {\n  slug: "corpse",\n} as const satisfies Page\n'
  expect(reasons("akasha/corpus.module.ts", body)).toEqual([])
})

test("a value the file keeps to itself is judged the same as an exported one", () => {
  const body = page("corpse", "module").replace("export const held", "const held")
  expect(reasons("akasha/corpus.module.ts", body)).toHaveLength(1)
})

test("the first page a file states is the one its name is judged against", () => {
  const body = `${page("corpus", "module")}${page("corpse", "domain")}`
  expect(reasons("akasha/corpus.module.ts", body)).toEqual([])
})

test("a page written plainly, with no satisfies at all, is still judged", () => {
  const body = 'export const held = {\n  pageTypeSlug: "module",\n  slug: "corpse",\n}\n'
  const said = reasons("akasha/corpus.module.ts", body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `corpse`")
})
