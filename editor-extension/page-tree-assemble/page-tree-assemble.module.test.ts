import { expect, test } from "bun:test"
import {
  assemblePageTree,
  type PageAnswers,
  type PageNode,
  type QueryRow,
} from "./page-tree-assemble.module.code.ts"

const REPO = "/repo"

function typeRow(slug: string, above: string | null): QueryRow {
  return { at: `akasha:one/${slug}.page-type.ts`, values: { slug, "extends-slug": above } }
}

function answersOf(types: readonly QueryRow[], properties: readonly QueryRow[]): PageAnswers {
  return { types, properties, propertyTypes: [] }
}

function idsIn(nodes: readonly PageNode[]): readonly string[] {
  return nodes.flatMap((one) => [one.id, ...idsIn(one.children)])
}

test("a page type naming one type above it is drawn under it with the id it always had", () => {
  const said = assemblePageTree(
    answersOf([typeRow("page", null), typeRow("module", "page")], []),
    REPO
  )

  expect(idsIn(said.roots)).toEqual(["type/page", "type/module", "vocabulary"])
  expect(said.unreached).toEqual([])
})

test("a page type naming two types above it is drawn once under each of them", () => {
  const said = assemblePageTree(
    answersOf(
      [
        typeRow("page", null),
        typeRow("module", "page"),
        typeRow("page-property", "page"),
        typeRow("computed-property", "module"),
        typeRow("computed-property", "page-property"),
      ],
      []
    ),
    REPO
  )

  expect(idsIn(said.roots)).toEqual([
    "type/page",
    "type/module",
    "type/computed-property",
    "type/page-property",
    "type/page-property/computed-property",
    "vocabulary",
  ])
  expect(said.unreached).toEqual([])
})

test("everything under a second drawing carries an id of its own", () => {
  const said = assemblePageTree(
    answersOf(
      [
        typeRow("page", null),
        typeRow("module", "page"),
        typeRow("page-property", "page"),
        typeRow("computed-property", "module"),
        typeRow("computed-property", "page-property"),
        typeRow("faith-points", "computed-property"),
      ],
      [
        {
          at: "akasha:one/holds.text-property.ts",
          values: {
            slug: "holds",
            key: "holds",
            "defined-on-slug": "page-type/computed-property",
            type: "text",
          },
        },
      ]
    ),
    REPO
  )

  const ids = idsIn(said.roots)

  expect(ids).toContain("type/computed-property/properties/holds")
  expect(ids).toContain("type/page-property/computed-property/properties/holds")
  expect(ids).toContain("type/faith-points")
  expect(ids).toContain("type/page-property/computed-property/faith-points")
  expect(new Set(ids).size).toBe(ids.length)
})

test("a ring among the types above ends the drawing rather than going round again", () => {
  const said = assemblePageTree(
    answersOf(
      [
        typeRow("root", null),
        typeRow("held", "beside"),
        typeRow("held", "root"),
        typeRow("beside", "held"),
      ],
      []
    ),
    REPO
  )

  expect(idsIn(said.roots)).toEqual([
    "type/root",
    "type/root/held",
    "type/root/held/beside",
    "vocabulary",
  ])
})

test("two page types naming each other above are left unreached", () => {
  const said = assemblePageTree(answersOf([typeRow("one", "two"), typeRow("two", "one")], []), REPO)

  expect(idsIn(said.roots)).toEqual(["vocabulary"])
  expect(said.unreached).toEqual(["page-type/one", "page-type/two"])
})

test("a page type naming the same type above it twice is drawn under it once", () => {
  const said = assemblePageTree(
    answersOf([typeRow("page", null), typeRow("module", "page"), typeRow("module", "page")], []),
    REPO
  )

  expect(idsIn(said.roots)).toEqual(["type/page", "type/module", "vocabulary"])
})
