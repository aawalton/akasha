import { expect, test } from "bun:test"
import {
  boundIn,
  keyOf,
  listIn,
  literalIn,
  manyIn,
  matchingIn,
  statedIn,
  textsOf,
  valuesIn,
} from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import { parsedAs } from "akasha/code/code-source/code-source.module.code.ts"
import ts from "typescript"

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

const RECORDS = [
  'import type { Module } from "@akasha/code/module"',
  "",
  "export const held = {",
  '  slug: "held",',
  "  invariants: [",
  '    { invariantKind: "departure", statement: "the first" },',
  '    { invariantKind: "gap", statement: "the second" },',
  "    3,",
  "  ],",
  '  partSlugs: ["module/one"],',
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

test("the records a many-valued key holds are answered in the order they sit in", () => {
  const held = valuesIn(sourceOf(RECORDS), "invariants")
  const said = held.map((one) => textsOf(one).get("statement")?.text)

  expect(said).toEqual(["the first", "the second"])
})

test("each key stating text on a record is answered under that key", () => {
  const held = valuesIn(sourceOf(RECORDS), "invariants")
  const said = held.map((one) => textsOf(one).get("invariantKind")?.text)

  expect(said).toEqual(["departure", "gap"])
})

test("a key holding one value holds no records", () => {
  expect(valuesIn(sourceOf(), "slug").length).toBe(0)
})

test("a key the body states no value under holds no records", () => {
  expect(valuesIn(sourceOf(), "pluralSlug").length).toBe(0)
})

test("a list holding no object holds no records", () => {
  expect(valuesIn(sourceOf(), "partSlugs").length).toBe(0)
})

test("the list a key states is answered whole", () => {
  const held = listIn(sourceOf(RECORDS), "invariants")

  expect(held?.elements.length).toBe(3)
})

test("a key stating no list answers no list", () => {
  expect(listIn(sourceOf(), "slug")).toBeNull()
  expect(listIn(sourceOf(), "pluralSlug")).toBeNull()
})

test("a record is matched by the text one named field states", () => {
  const held = listIn(sourceOf(RECORDS), "invariants")

  expect(held === null ? [] : matchingIn(held, "statement", "the second")).toEqual([1])
})

test("every record stating that text is matched", () => {
  const held = listIn(sourceOf(RECORDS), "invariants")

  expect(held === null ? [] : matchingIn(held, "invariantKind", "gap")).toEqual([1])
})

test("text no record states matches nothing", () => {
  const held = listIn(sourceOf(RECORDS), "invariants")

  expect(held === null ? [] : matchingIn(held, "statement", "the third")).toEqual([])
})

test("a place in the list that is no object matches nothing", () => {
  const held = listIn(sourceOf(RECORDS), "invariants")

  expect(held === null ? [] : matchingIn(held, "statement", "3")).toEqual([])
})
