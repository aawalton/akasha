import { afterAll, expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answersFrom,
  pageTree,
  propertyKindsIn,
} from "akasha/command/pages/page/tree/page-tree.command.code.ts"
import type { Valued } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  aType,
  bodyOf,
  graphedRepo,
  idOf,
  type Named,
  scratch,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const ROOT = "/nowhere"

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha page tree", from: ROOT, writer: null, agentId: null }
}

const TYPES: readonly Valued[] = [
  {
    path: "one/thing.page-type.ts",
    value: {
      slug: "thing",
      extends: ["page-type/page"],
      properties: [
        { pagePropertySlug: "title", required: true, many: false },
        { pagePropertySlug: "note", required: false, many: true, maxCount: 3 },
      ],
    },
  },
  { path: "one/page.page-type.ts", value: { slug: "page", extends: [] } },
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
          value: { slug: "title", propertySlug: "title", targetPageType: "page-type/page" },
        },
      ],
    ],
  ])

  const one: readonly Valued[] = [
    {
      path: "one/held.page-type.ts",
      value: {
        slug: "held",
        extends: [],
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
  const said = pageTree(["one", "two"], givenIn())

  expect(said.refusals.length).toBe(2)
  expect(said.refusals.join("\n")).toContain("`one`")
  expect(said.refusals.join("\n")).toContain("`two`")
})

const ABOVE_TWO: readonly Valued[] = [
  {
    path: "one/held.page-type.ts",
    value: { slug: "held", extends: ["page-type/module", "page-type/page-property"] },
  },
  { path: "one/module.page-type.ts", value: { slug: "module", extends: ["page-type/page"] } },
  { path: "one/page.page-type.ts", value: { slug: "page", extends: [] } },
]

test("a page type naming two types above it is answered on one row for each", () => {
  expect(answersFrom(ABOVE_TWO, new Map()).types).toEqual([
    { at: "akasha:one/held.page-type.ts", values: { slug: "held", "extends-slug": "module" } },
    {
      at: "akasha:one/held.page-type.ts",
      values: { slug: "held", "extends-slug": "page-property" },
    },
    { at: "akasha:one/module.page-type.ts", values: { slug: "module", "extends-slug": "page" } },
    { at: "akasha:one/page.page-type.ts", values: { slug: "page", "extends-slug": null } },
  ])
})

test("a page type naming one type above it is answered on the one row it always was", () => {
  expect(answersFrom(TYPES, PROPERTIES).types.map((one) => one.values["extends-slug"])).toEqual([
    "page",
    null,
  ])
})

const TREE = "akasha"

const heldId = (one: string): string => `01a04a4a-0007-7000-8000-00000000000${one}`

const HELD: readonly Named[] = [
  thePage({
    id: heldId("1"),
    pageTypeSlug: "graph-attribute",
    slug: "property",
    definition: "the property one page named another page under",
  }),
  thePage({
    id: heldId("2"),
    pageTypeSlug: "graph-edge",
    slug: "relation",
    definition: "one page naming another page under a property",
    attributes: ["graph-attribute/property"],
  }),
  aType(heldId("3"), "computed-property", ["page-type/module", "page-type/page-property"]),
  aType(heldId("4"), "faith-points", ["page-type/computed-property"]),
  aType(heldId("5"), "id-named-property", [idOf("3"), "page-type/page"]),
  aType(heldId("6"), "one-ringed", ["page-type/two-ringed", "page-type/page"]),
  aType(heldId("7"), "two-ringed", ["page-type/one-ringed", "page-type/page"]),
]

function typesRepo(): string {
  return graphedRepo(
    Object.fromEntries(HELD.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)] as const))
  )
}

test("a kind of property is reached through any of the types above it", () => {
  const found = propertyKindsIn(typesRepo())

  expect(found.has("computed-property")).toBe(true)
  expect(found.has("faith-points")).toBe(true)
  expect(found.has("module")).toBe(false)
  expect(found.has("page-property")).toBe(false)
})

test("a type naming the type above it by id reaches what that type reaches", () => {
  expect(propertyKindsIn(typesRepo()).has("id-named-property")).toBe(true)
})

test("a ring among the types above is answered rather than walked forever", () => {
  const found = propertyKindsIn(typesRepo())

  expect(found.has("one-ringed")).toBe(false)
  expect(found.has("two-ringed")).toBe(false)
})
