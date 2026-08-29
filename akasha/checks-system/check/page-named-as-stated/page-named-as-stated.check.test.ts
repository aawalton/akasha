import { expect, test } from "bun:test"
import { pageIn, reasonsIn } from "./page-named-as-stated.check.code.ts"

const ROOT = "/repo"

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
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
  expect(reasonsIn(given("akasha/corpus.module.ts", page("corpus", "module")))).toEqual([])
})

test("a page naming itself otherwise than its file is refused, and both names are said", () => {
  const said = reasonsIn(given("akasha/corpus.module.ts", page("corpse", "module")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `corpse`")
  expect(said[0]).toContain("its file is named `corpus`")
})

test("a page stating a page type its file does not carry is refused", () => {
  const said = reasonsIn(given("akasha/corpus.module.ts", page("corpus", "domain")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page type as `domain`")
})

test("a page wrong in both its slug and its page type is told both", () => {
  const said = reasonsIn(given("akasha/corpus.module.ts", page("corpse", "domain")))
  expect(said).toHaveLength(2)
})

test("the stem is bound to the slug, never to anything a reader would call a title", () => {
  const body = page("corpus", "module").replace(
    'definition: "what is held",',
    'title: "Something Else",'
  )
  expect(reasonsIn(given("akasha/corpus.module.ts", body))).toEqual([])
})

test("a property's file holds no page value, so it is not judged here", () => {
  const body = "export function corpusIn(root: string) {\n  return root\n}\n"
  expect(reasonsIn(given("akasha/corpus.module.code.ts", body))).toEqual([])
})

test("a page is found through the satisfies and as const it is written with", () => {
  const said = pageIn("akasha/corpus.module.ts", page("corpus", "module"))
  expect(said).toEqual({ slug: "corpus", pageTypeSlug: "module" })
})

test("a file whose name is not a page's shape is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", page("corpse", "module")))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const bytes = new Uint8Array([0xff, 0xfe, 0x00])
  expect(reasonsIn({ root: ROOT, path: "akasha/raw.module.ts", bytes })).toEqual([])
})

test("a file is judged by its own name rather than by the folders above it", () => {
  const body = page("corpus", "module")
  expect(reasonsIn(given("akasha/write-system/corpus.module.ts", body))).toEqual([])
  const said = reasonsIn(given("akasha/corpus/held.module.ts", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("its file is named `held`")
})

test("a stem carrying a dot is bound whole to the slug", () => {
  const body = page("corpus.module", "code")
  expect(reasonsIn(given("akasha/corpus.module.code.ts", body))).toEqual([])
})

test("a value stating a slug but no page type is no page here, so it is passed over", () => {
  const body = 'export const held = {\n  slug: "corpse",\n} as const satisfies Page\n'
  expect(reasonsIn(given("akasha/corpus.module.ts", body))).toEqual([])
})

test("a value the file keeps to itself is judged the same as an exported one", () => {
  const body = page("corpse", "module").replace("export const held", "const held")
  expect(reasonsIn(given("akasha/corpus.module.ts", body))).toHaveLength(1)
})

test("the first page a file states is the one its name is judged against", () => {
  const body = `${page("corpus", "module")}${page("corpse", "domain")}`
  expect(reasonsIn(given("akasha/corpus.module.ts", body))).toEqual([])
})

test("a page written plainly, with no satisfies at all, is still judged", () => {
  const body = 'export const held = {\n  pageTypeSlug: "module",\n  slug: "corpse",\n}\n'
  const said = reasonsIn(given("akasha/corpus.module.ts", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `corpse`")
})
