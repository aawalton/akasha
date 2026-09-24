import { afterAll, expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { type Shadow, shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { id as idPage } from "akasha/page/properties/id.text-property.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"
import {
  generatorAt,
  turnsFor,
  typedOver,
} from "akasha/page/type/modules/type-generating/type-generating.module.code.ts"
import {
  AT,
  GENERATOR_AT,
  OTHER,
  OWN,
} from "akasha/page/type/modules/type-generating/type-generating.module.test-fixtures.ts"
import { generateTypes } from "akasha/page/type/page-property/page-property.page-type.type-generator.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT = "/nowhere"

const BYTES = new TextEncoder()

const STATED = { slug: "page-type", typeGenerator: "ts" }

function changeOver(bodies: ReadonlyMap<string, string>): Change {
  return {
    root: ROOT,
    changed: [...bodies.keys()],
    before: () => null,
    after: (path) => {
      const body = bodies.get(path)
      return body === undefined ? null : BYTES.encode(body)
    },
  }
}

function shadowOf(pages: ReadonlyMap<string, Record<string, unknown>>): Shadow {
  const index = {
    everyOfType: () => [...pages.keys()].map((path) => ({ path, id: path })),
  } as never
  return {
    root: ROOT,
    index,
    before: () => index,
    filed: () => new Map(),
    holds: (path) => pages.has(path),
    listed: () => [...pages.keys()],
    refusals: () => [],
    pageOf: (path) => pages.get(path) ?? null,
    codeAt: (path) => path,
  }
}

function only(page: Record<string, unknown>): ReadonlyMap<string, Record<string, unknown>> {
  return new Map([[AT, page]])
}

test("the generator sits beside the page type as that page type's `type-generator` section", () => {
  expect(generatorAt(AT)).toBe(GENERATOR_AT)
})

test("a page type stating no type generator has no generator run for it", () => {
  let asked = 0
  const said = typedOver(changeOver(new Map()), shadowOf(only({ slug: "page-type" })), () => {
    asked += 1
    return { missing: "never reached" }
  })
  expect(asked).toBe(0)
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a page type stating a type generator has that generator's edits answered", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
  }))
  expect(said.edits).toEqual([{ kind: "add", path: OWN, content: "export type PageType = {}\n" }])
})

test("a page type is among the pages its own generator writes for", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [
      { kind: "add", path: OWN, content: "export type PageType = {}\n" },
      { kind: "add", path: OTHER, content: "export type Module = {}\n" },
    ],
  }))
  expect(said.edits.map((one) => one.path)).toEqual([OWN, OTHER])
})

test("a generator that is not there is said rather than thrown", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    missing: "no such file or directory",
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toHaveLength(1)
  expect(said.said[0]).toContain("page-type.page-type.type-generator.ts")
  expect(said.said[0]).toContain("no such file or directory")
})

test("a generator that breaks is said rather than thrown", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => {
      throw new Error("the shadow answered nothing")
    },
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toHaveLength(1)
  expect(said.said[0]).toContain("the shadow answered nothing")
})

test("a body equal to what is already at that path is left out", () => {
  const body = "export type PageType = {}\n"
  const said = typedOver(changeOver(new Map([[OWN, body]])), shadowOf(only(STATED)), () => ({
    generating: () => [{ kind: "add", path: OWN, content: body }],
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a body other than what is already at that path is answered as a replacement", () => {
  const said = typedOver(
    changeOver(new Map([[OWN, "export type PageType = { was: true }\n"]])),
    shadowOf(only(STATED)),
    () => ({
      generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
    })
  )
  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: OWN,
      contentFrom: "export type PageType = { was: true }\n",
      contentTo: "export type PageType = {}\n",
    },
  ])
})

const STATES_ONE = "01a090e0-64d6-7e42-83f5-17e72764a3b6"

function rootWhereAGeneratorIsStated(stated: Record<string, unknown>): string {
  const root = scratch.rootFor("type-generating-")
  listedFiled(root, "page-type", "page-type", [{ path: AT, id: STATES_ONE }])
  valueAlsoFiled(root, "page-type", [
    {
      path: AT,
      value: { id: STATES_ONE, pageTypeSlug: "page-type", slug: "page-type", ...stated },
    },
  ])
  idFiled(root, STATES_ONE, [{ path: AT, id: STATES_ONE }])
  return root
}

function askingOver(root: string): Change {
  return { root, changed: [], before: () => null, after: () => null }
}

test("a page type stating no type generator is asked nothing", () => {
  let asked = 0
  const said = turnsFor(askingOver(rootWhereAGeneratorIsStated({})), () => {
    asked += 1
    return { missing: "never reached" }
  })
  expect(asked).toBe(0)
  expect(said).toBe(false)
})

test("a generator saying nothing about what a change turns is run", () => {
  const root = rootWhereAGeneratorIsStated(STATED)

  expect(turnsFor(askingOver(root), () => ({ generating: () => [] }))).toBe(true)
})

test("a generator that could not be loaded is run rather than passed over", () => {
  const root = rootWhereAGeneratorIsStated(STATED)

  expect(turnsFor(askingOver(root), () => ({ missing: "no such file or directory" }))).toBe(true)
})

test("a generator saying the change turns nothing is not run", () => {
  const root = rootWhereAGeneratorIsStated(STATED)
  const said = turnsFor(askingOver(root), () => ({ generating: () => [], turning: () => false }))

  expect(said).toBe(false)
})

test("a generator saying the change turns nothing writes no type for that change", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
    turning: () => false,
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

const GENERATOR = generatorAt(AT) as string

const LEFT = "the body the change leaves\n"

test("a generator is handed the body the change leaves at that generator's path", () => {
  const handed: (string | null)[] = []
  typedOver(
    changeOver(new Map([[GENERATOR, LEFT]])),
    shadowOf(only(STATED)),
    (_change, _at, body) => {
      handed.push(body)
      return { generating: () => [] }
    }
  )
  expect(handed).toEqual([LEFT])
})

test("a generator the change leaves alone is handed no body", () => {
  const handed: (string | null)[] = []
  typedOver(changeOver(new Map()), shadowOf(only(STATED)), (_change, _at, body) => {
    handed.push(body)
    return { generating: () => [] }
  })
  expect(handed).toEqual([null])
})

test("what a change could turn is asked of the body the change leaves", () => {
  const handed: (string | null)[] = []
  const change: Change = {
    root: rootWhereAGeneratorIsStated(STATED),
    changed: [GENERATOR],
    before: () => null,
    after: (path) => (path === GENERATOR ? BYTES.encode(LEFT) : null),
  }
  turnsFor(change, (_change, _at, body) => {
    handed.push(body)
    return { generating: () => [] }
  })
  expect(handed).toEqual([LEFT])
})

const EXTENDS_TYPE_AT = "page/type/properties/extends-type.multi-relation-property.types.ts"

const EXTENDS_TYPE = [
  'import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"',
  'import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"',
  "",
  "export type ExtendsType = List<Slug>",
  "",
].join("\n")

test("a property of a kind extending the relation property has its type written", () => {
  const root = rootOf(import.meta.dir)
  const written = generateTypes(root, shadowAt(root)).find((one) => one.path === EXTENDS_TYPE_AT)
  expect(written?.content).toBe(EXTENDS_TYPE)
})

const HOLDING_AT = "page/scratch/properties/reached.computed-property.ts"

const SLUG_PAGE_AT = "page/properties/slug.text-property.ts"

function shadowHolding(value: Record<string, unknown>): Shadow {
  const pages = new Map<string, Record<string, unknown>>([
    [HOLDING_AT, value],
    [SLUG_PAGE_AT, { slug: "slug", types: "ts" }],
  ])
  const index = {
    kindsUnder: (kind: string) => new Set(kind === "page-property" ? ["computed-property"] : []),
    everyOfType: (kind: string) =>
      kind === "computed-property" ? [{ path: HOLDING_AT, id: HOLDING_AT }] : [],
    listedAt: (kind: string, slug: string) =>
      kind === "text-property" && slug === "slug" ? [{ path: SLUG_PAGE_AT, id: SLUG_PAGE_AT }] : [],
  } as never
  return { ...shadowOf(pages), index, before: () => index }
}

test("a calculation holding a relation has the type a relation property has", () => {
  const shadow = shadowHolding({ slug: "reached", holds: "relation", types: "ts" })
  expect(generateTypes(ROOT, shadow)).toEqual([
    {
      kind: "add",
      path: "page/scratch/properties/reached.computed-property.types.ts",
      content: [
        'import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"',
        "",
        "export type Reached = Slug",
        "",
      ].join("\n"),
    },
  ])
})

const ENTRY_AT = "page/scratch/properties/stretches.page-property-entry.ts"

const LABEL_AT = "text-property/scratch-label"

const RATE_AT = "number-property/scratch-rate"

const FIELDS = new Map<string, string>([
  [`${textProperty.slug}/${idPage.slug}`, "page/properties/id.text-property.ts"],
  [LABEL_AT, "page/scratch/properties/scratch-label.text-property.ts"],
  [RATE_AT, "page/scratch/properties/scratch-rate.number-property.ts"],
])

function fieldShape(named: string): Shape {
  const [kind = "", slug = ""] = named.split("/")
  const none = { targetPageTypeSlug: null, unique: null, uniquePropertySlug: null }
  return { ...none, pageTypeSlug: kind, slug, propertySlug: slug, fileName: null, folderName: null }
}

function shadowOfEntry(value: Record<string, unknown>): Shadow {
  const pages = new Map<string, Record<string, unknown>>([[ENTRY_AT, value]])
  for (const [named, path] of FIELDS) pages.set(path, { slug: fieldShape(named).slug, types: "ts" })
  const index = {
    kindsUnder: (kind: string) => new Set(kind === "page-property" ? ["page-property-entry"] : []),
    everyOfType: (kind: string) =>
      kind === "page-property-entry" ? [{ path: ENTRY_AT, id: ENTRY_AT }] : [],
    listedAt: (kind: string, slug: string) => {
      const path = FIELDS.get(`${kind}/${slug}`)
      return path === undefined ? [] : [{ path, id: path }]
    },
    shapesAt: () => new Map([...FIELDS.keys()].map((named) => [named, fieldShape(named)])),
  } as never
  return { ...shadowOf(pages), index, before: () => index }
}

test("a page property entry has a row type written from the fields that entry declares", () => {
  const shadow = shadowOfEntry({
    slug: "stretches",
    types: "ts",
    properties: [
      { pageProperty: LABEL_AT, required: true, many: false },
      { pageProperty: RATE_AT, required: false, many: false },
    ],
  })
  expect(generateTypes(ROOT, shadow)[0]?.content).toBe(
    [
      'import type { Id } from "akasha/page/properties/id.text-property.types.ts"',
      'import type { ScratchLabel } from "akasha/page/scratch/properties/scratch-label.text-property.types.ts"',
      'import type { ScratchRate } from "akasha/page/scratch/properties/scratch-rate.number-property.types.ts"',
      "",
      'export type Stretches = "jsonl"',
      "",
      "export type StretchesRow = {",
      "  id: Id",
      "  scratchLabel: ScratchLabel",
      "  scratchRate?: ScratchRate",
      "}",
      "",
    ].join("\n")
  )
})

test("that row type holds the id an entry declares once", () => {
  const idAt = `${textProperty.slug}/${idPage.slug}`
  const properties = [{ pageProperty: idAt, required: true, many: false }]
  const shadow = shadowOfEntry({ slug: "stretches", types: "ts", properties })
  const said = generateTypes(ROOT, shadow)[0]?.content ?? ""
  expect(said.split("\n").filter((line) => line === "  id: Id")).toHaveLength(1)
})

test("a page property entry declaring no fields has only the type of its key written", () => {
  const shadow = shadowOfEntry({ slug: "stretches", types: "ts" })
  expect(generateTypes(ROOT, shadow)[0]?.content).toBe('export type Stretches = "jsonl"\n')
})
