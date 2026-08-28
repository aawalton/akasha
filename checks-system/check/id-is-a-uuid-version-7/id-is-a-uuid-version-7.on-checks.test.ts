import { expect, test } from "bun:test"
import { resolve } from "node:path"
import idIsAUuidVersion7 from "./id-is-a-uuid-version-7.check.code.attachment.ts"

const AKASHA = resolve(import.meta.dir, "../../..")

const AT = "akasha/pages-system/page/thing.page-type.ts"

const SEVEN = "01a049b9-856c-7090-bd14-5a916f574259"

const FOUR = "f81d4fae-7dec-41d0-9765-00a0c91e6bf6"

function verdict(path: string, text: string): readonly string[] {
  return idIsAUuidVersion7.run({ root: AKASHA, path: `${AKASHA}/${path}`, body: Buffer.from(text) })
}

function held(name: string, id: string): string {
  return [
    `export const ${name} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "page-type",`,
    `  slug: "${name}",`,
    `} as const satisfies PageType`,
    ``,
  ].join("\n")
}

function page(id: string): string {
  return `import type { PageType } from "./page-type.page-type.ts"\n\n${held("thing", id)}`
}

test("a page stating a uuid version 7 in lower uuid passes", () => {
  expect(verdict(AT, page(SEVEN))).toEqual([])
})

test("every variant a uuid version 7 carries passes", () => {
  for (const variant of ["8", "9", "a", "b"]) {
    expect(verdict(AT, page(`01a049b9-856c-7090-${variant}d14-5a916f574259`))).toEqual([])
  }
})

test("a uuid of another version fails, and the reason names the version", () => {
  const said = verdict(AT, page(FOUR))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is a uuid version 4")
  expect(said[0]).toContain("a page's identity is a uuid version 7")
})

test("a uuid version 7 in upper uuid fails, and the reason names the case", () => {
  const said = verdict(AT, page(SEVEN.toUpperCase()))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is written in upper uuid")
  expect(said[0]).not.toContain("is a uuid version")
})

test("a value that is no uuid at all fails, and the reason says so", () => {
  const said = verdict(AT, page("thing-one"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is not a uuid")
})

test("a uuid version 7 carrying no variant of its own fails, and the reason names it", () => {
  const said = verdict(AT, page("01a049b9-856c-7090-cd14-5a916f574259"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("carries the variant `c`")
})

test("the reason names the line the id is stated on and the value it states", () => {
  const said = verdict(AT, page(FOUR))
  expect(said[0]).toContain("line 4")
  expect(said[0]).toContain(`states id "${FOUR}"`)
})

test("a file outside the akasha folder is not judged", () => {
  expect(verdict("pages-system/page/thing.ts", page(FOUR))).toEqual([])
})

test("a file stating no id passes", () => {
  const body = `export const thing = {\n  slug: "thing",\n} as const satisfies PageType\n`
  expect(verdict(AT, body)).toEqual([])
})

test("an id that is not stated as text is outside this check", () => {
  const body = `export const thing = {\n  id: HELD,\n  slug: "thing",\n} as const satisfies PageType\n`
  expect(verdict(AT, body)).toEqual([])
})

test("an id somewhere other than the exported page is not judged", () => {
  const nested = `export const thing = {\n  id: "${SEVEN}",\n  inner: { id: "nope" },\n} as const satisfies PageType\n`
  expect(verdict(AT, nested)).toEqual([])
  const beside = `const inner = { id: "nope" }\nexport const thing = {\n  id: "${SEVEN}",\n} as const satisfies PageType\n`
  expect(verdict(AT, beside)).toEqual([])
})

test("an exported object satisfying nothing is not judged", () => {
  expect(verdict(AT, `export const thing = { id: "nope" }\n`)).toEqual([])
})

test("every page stated in one file is judged", () => {
  const body = `${held("one", "nope-one")}\n${held("two", "nope-two")}`
  expect(verdict(AT, body)).toHaveLength(2)
})

test("a body that is not UTF-8 text is not judged", () => {
  const body = Buffer.from([0xff, 0xfe, 0x00])
  expect(idIsAUuidVersion7.run({ root: AKASHA, path: `${AKASHA}/${AT}`, body })).toEqual([])
})
