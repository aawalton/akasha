import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { boundIn, keyOf, literalIn, manyIn, statedIn } from "./page-literal.module.code.ts"

const AT = "one/held.module.ts"

const BODY = [
  'import type { Module } from "@akasha/code/module"',
  "",
  "export const held = {",
  '  id: "01a00000-0000-7000-8000-000000000000",',
  '  pageTypeSlug: "module",',
  '  slug: "held",',
  '  "quoted-key": "kept",',
  '  definition: "a page the parser reads",',
  '  partSlugs: ["module/one", "module/two"],',
  "  count: 3,",
  "} as const satisfies Module",
  "",
].join("\n")

function sourceOf(text: string = BODY): ReturnType<typeof parsedAs> {
  return parsedAs(AT, text)
}

test("the object answered is the one an exported declaration holds", () => {
  const held = literalIn(sourceOf())

  expect(held).not.toBeNull()
  expect(held?.properties.length).toBe(7)
})

test("a body exporting no object literal answers no object", () => {
  const held = literalIn(sourceOf('const held = { slug: "held" }\n'))

  expect(held).toBeNull()
})

test("the name answered is the name the exported object is bound to", () => {
  expect(boundIn(sourceOf())).toBe("held")
})

test("a body exporting no object literal is bound to no name", () => {
  expect(boundIn(sourceOf("export const held = 3\n"))).toBeNull()
})

test("each key stating text is answered under that key", () => {
  const said = statedIn(sourceOf())

  expect(said.get("slug")?.text).toBe("held")
  expect(said.get("definition")?.text).toBe("a page the parser reads")
})

test("a key spelled as a string is answered as a key spelled bare is", () => {
  expect(statedIn(sourceOf()).get("quoted-key")?.text).toBe("kept")
})

test("a key stating anything but text is left out", () => {
  const said = statedIn(sourceOf())

  expect(said.has("partSlugs")).toBe(false)
  expect(said.has("count")).toBe(false)
})

test("a body exporting no object literal states nothing", () => {
  expect(statedIn(sourceOf('const held = { slug: "held" }\n')).size).toBe(0)
})

test("a key holding a list holds many values", () => {
  expect(manyIn(sourceOf(), "partSlugs")).toBe(true)
})

test("a key holding one value holds no many values", () => {
  expect(manyIn(sourceOf(), "slug")).toBe(false)
})

test("a key the body states no value under holds no many values", () => {
  expect(manyIn(sourceOf(), "pluralSlug")).toBe(false)
})

test("a key is read off the assignment stating that key", () => {
  const held = literalIn(sourceOf())
  const found: (string | null)[] = []
  for (const one of held?.properties ?? []) {
    if (ts.isPropertyAssignment(one)) found.push(keyOf(one))
  }

  expect(found).toEqual([
    "id",
    "pageTypeSlug",
    "slug",
    "quoted-key",
    "definition",
    "partSlugs",
    "count",
  ])
})
