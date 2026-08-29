import { expect, test } from "bun:test"
import { pageIn, pageNamedAsStated } from "./page-named-as-stated.check.code.ts"

const ROOT = "/repo/akasha"

function given(at: string, body: string) {
  return { root: ROOT, path: `${ROOT}/${at}`, bytes: Buffer.from(body, "utf8") }
}

function page(slug: string, pageTypeSlug: string): string {
  return [
    `export const held = {`,
    `  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1736",`,
    `  pageTypeSlug: "${pageTypeSlug}",`,
    `  slug: "${slug}",`,
    `  definition: "what is held",`,
    `} as const satisfies Page`,
    ``,
  ].join("\n")
}

test("a page whose file is named for the slug it states is let through", () => {
  expect(pageNamedAsStated(given("corpus.module.ts", page("corpus", "module")))).toEqual([])
})

test("a page naming itself otherwise than its file is refused, and both names are said", () => {
  const said = pageNamedAsStated(given("corpus.module.ts", page("corpse", "module")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `corpse`")
  expect(said[0]).toContain("its file is named `corpus`")
})

test("a page stating a page type its file does not carry is refused", () => {
  const said = pageNamedAsStated(given("corpus.module.ts", page("corpus", "domain")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page type as `domain`")
})

test("a page wrong in both its slug and its page type is told both", () => {
  expect(pageNamedAsStated(given("corpus.module.ts", page("corpse", "domain")))).toHaveLength(2)
})

test("the stem is bound to the slug, never to anything a reader would call a title", () => {
  const body = page("corpus", "module").replace('definition: "what is held",', 'title: "Something Else",')
  expect(pageNamedAsStated(given("corpus.module.ts", body))).toEqual([])
})

test("a property's file holds no page value, so it is not judged here", () => {
  const body = 'export function corpusIn(root: string) {\n  return root\n}\n'
  expect(pageNamedAsStated(given("corpus.module.code.ts", body))).toEqual([])
})

test("a page is found through the satisfies and as const it is written with", () => {
  const said = pageIn("corpus.module.ts", page("corpus", "module"))
  expect(said).toEqual({ slug: "corpus", pageTypeSlug: "module" })
})

test("a file whose name is not a page's shape is passed over", () => {
  expect(pageNamedAsStated(given("notes.txt", page("corpse", "module")))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: `${ROOT}/raw.module.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(pageNamedAsStated(held)).toEqual([])
})
