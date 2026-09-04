import { expect, test } from "bun:test"
import type { Given } from "@akasha/command-system/calling"
import type { Valued } from "@akasha/indexes"
import { answersFrom, pageAnswers, pageTree, refusalsIn } from "./page-tree.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha page-tree", from: ROOT, writer: null, agentId: null }
}

const TYPES: readonly Valued[] = [
  {
    path: "one/thing.page-type.ts",
    value: {
      slug: "thing",
      extendsSlug: "page-type/page",
      properties: [
        { pagePropertySlug: "title", required: true, many: false },
        { pagePropertySlug: "note", required: false, many: true, max: 3 },
      ],
    },
  },
  { path: "one/page.page-type.ts", value: { slug: "page", extendsSlug: null } },
]

const PROPERTIES = new Map<string, readonly Valued[]>([
  [
    "text-property",
    [
      {
        path: "one/title.text-property.ts",
        value: { slug: "title", propertySlug: "title", definition: "the name a thing carries" },
      },
      {
        path: "one/note.text-property.ts",
        value: { slug: "note", propertySlug: "note", definition: "a line beside a thing" },
      },
    ],
  ],
])

test("the three groups are drawn from the page types and the property pages", () => {
  expect(answersFrom(TYPES, PROPERTIES)).toEqual({
    types: [
      {
        at: "akasha:one/thing.page-type.ts",
        values: { slug: "thing", "extends-slug": "page" },
      },
      { at: "akasha:one/page.page-type.ts", values: { slug: "page", "extends-slug": null } },
    ],
    properties: [
      {
        at: "akasha:one/title.text-property.ts",
        values: {
          slug: "title",
          key: "title",
          "defined-on-slug": "page-type/thing",
          type: "text",
        },
      },
      {
        at: "akasha:one/note.text-property.ts",
        values: {
          slug: "note",
          key: "note",
          "defined-on-slug": "page-type/thing",
          type: "list(text, max 3) | none",
        },
      },
    ],
    propertyTypes: [
      {
        at: "akasha:one/title.text-property.ts",
        values: {
          "type-slug": "title",
          kind: "text-property",
          suffix: null,
          of: "the name a thing carries",
          value: null,
        },
      },
      {
        at: "akasha:one/note.text-property.ts",
        values: {
          "type-slug": "note",
          kind: "text-property",
          suffix: null,
          of: "a line beside a thing",
          value: null,
        },
      },
    ],
  })
})

test("a row carries the checkout ahead of the path inside it", () => {
  for (const row of answersFrom(TYPES, PROPERTIES).types) {
    expect(row.at.startsWith("akasha:")).toBe(true)
  }
})

test("the answer carries the keys the editor reads and nothing it would drop", () => {
  const said = JSON.parse(JSON.stringify(answersFrom(TYPES, PROPERTIES)))

  expect(Object.keys(said)).toEqual(["types", "properties", "propertyTypes"])
  expect(Object.keys(said.types[0].values)).toEqual(["slug", "extends-slug"])
  expect(Object.keys(said.properties[0].values)).toEqual(["slug", "key", "defined-on-slug", "type"])
  expect(Object.keys(said.propertyTypes[0].values)).toEqual([
    "type-slug",
    "kind",
    "suffix",
    "of",
    "value",
  ])
})

test("a slug two property pages carry is named under its kind", () => {
  const twice = new Map<string, readonly Valued[]>([
    ...PROPERTIES,
    [
      "number-property",
      [{ path: "one/note.number-property.ts", value: { slug: "note", propertySlug: "note" } }],
    ],
  ])

  const said = answersFrom(TYPES, twice)

  expect(said.propertyTypes.map((one) => one.values["type-slug"])).toEqual([
    "title",
    "text-property/note",
    "number-property/note",
  ])
})

test("a property pointing at a page type is drawn as pointing at it", () => {
  const pointing = new Map<string, readonly Valued[]>([
    [
      "relation-property",
      [
        {
          path: "one/owner.relation-property.ts",
          value: { slug: "title", propertySlug: "title", targetPageTypeSlug: "page-type/page" },
        },
      ],
    ],
  ])

  const one: readonly Valued[] = [
    {
      path: "one/held.page-type.ts",
      value: {
        slug: "held",
        extendsSlug: null,
        properties: [{ pagePropertySlug: "title", required: true, many: false }],
      },
    },
  ]

  const said = answersFrom(one, pointing)

  expect(said.properties[0]?.values["type"]).toBe("relation(page)")
})

test("a declaration naming no property page refuses the whole answer", () => {
  expect(() => answersFrom(TYPES, new Map())).toThrow(/2 declaration\(s\) naming no property page/)
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = pageTree(["--json"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--json`")
})

test("every word said is named in the refusal, not only the first", () => {
  expect(refusalsIn(["one", "two"]).length).toBe(2)
})

test("a call naming nothing is not refused for its words", () => {
  expect(refusalsIn([])).toEqual([])
})

test("an index that is not there refuses as an operational fault", () => {
  const said = pageTree([], givenIn())

  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals.length).toBe(1)
})

test("the root the answer is read from is the one it was given", () => {
  expect(() => pageAnswers("/nowhere-at-all")).toThrow()
})
