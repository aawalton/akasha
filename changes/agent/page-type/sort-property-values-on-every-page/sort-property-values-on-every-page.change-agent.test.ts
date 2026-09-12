import { expect, test } from "bun:test"
import {
  carriedIn,
  runChange,
  sortPropertyValuesOnEveryPage,
} from "akasha/changes/agent/page-type/sort-property-values-on-every-page/sort-property-values-on-every-page.change-agent.code.ts"
import { runChange as putValue } from "akasha/changes/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.code.ts"
import { runChange as dropValue } from "akasha/changes/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldOfType } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import type { Shape } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Carried as Declared } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ADD = "change-mechanical-file-content/add-property-value"

const REMOVE = "change-mechanical-file-content/remove-property-value"

const REACHES: Reaching = (world, at, given) => {
  if (at === ADD) return Promise.resolve(putValue(world, given as Parameters<typeof putValue>[1]))
  if (at === REMOVE) {
    return Promise.resolve(dropValue(world, given as Parameters<typeof dropValue>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ONE_AT = "alan/books/one.book-section.ts"

const TWO_AT = "alan/books/two.book-section.ts"

const KEY = "partOfSlugs"

function sectionAt(slug: string, held: readonly string[]): string {
  const values = held.map((one) => JSON.stringify(one)).join(", ")
  return `export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  ${KEY}: [${values}],
} as const satisfies BookSection
`
}

const SORTED: Shape = {
  pageTypeSlug: "relation-property",
  targetPageTypeSlug: null,
  unique: null,
  uniquePropertySlug: null,
  slug: "part-of-slugs",
  propertySlug: "part-of-slugs",
  fileName: null,
  folderName: null,
  sorted: true,
}

const SHAPES = new Map([["relation-property/part-of-slugs", SORTED]])

const DECLARED: Declared = {
  pagePropertySlug: "part-of-slugs",
  pageTypeSlug: "relation-property",
  propertySlug: "part-of-slugs",
  key: KEY,
  unique: null,
  declaredBy: "book-section",
  required: false,
  many: true,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

type Files = Readonly<Record<string, string>>

function valued(held: Readonly<Record<string, readonly string[]>>): ReadonlyMap<string, Value> {
  const found = new Map<string, Value>()
  for (const [path, one] of Object.entries(held)) found.set(path, { [KEY]: [...one] })
  return found
}

function worldFor(
  bodies: Files,
  values: ReadonlyMap<string, Value>,
  carried: readonly Declared[] | null = [DECLARED]
): World {
  return worldOfType("book-section", bodies, carried, values, REACHES, SHAPES)
}

const OUT_OF_ORDER = ["beta", "alpha"]

const BODIES: Files = {
  [ONE_AT]: sectionAt("one", OUT_OF_ORDER),
  [TWO_AT]: sectionAt("two", OUT_OF_ORDER),
}

const VALUES = valued({ [ONE_AT]: OUT_OF_ORDER, [TWO_AT]: OUT_OF_ORDER })

test("every page holding the key out of order has those values put in order", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`"alpha", "beta"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`"alpha", "beta"`)
})

test("a page whose values are already in order is passed over", async () => {
  const held = { ...BODIES, [TWO_AT]: sectionAt("two", ["alpha", "beta"]) }
  const world = worldFor(held, valued({ [ONE_AT]: OUT_OF_ORDER, [TWO_AT]: ["alpha", "beta"] }))

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("the values left in place are the longest run already in order", () => {
  expect(carriedIn(["alpha", "delta", "beta", "echo"])).toEqual(["delta"])
})

test("a list already in order carries nothing", () => {
  expect(carriedIn(["alpha", "beta"])).toEqual([])
})

test("a key holding no list is passed over rather than refused", async () => {
  const world = worldFor(BODIES, new Map([[ONE_AT, { [KEY]: "alpha" } as Value]]))

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no `book-section` holds `partOfSlugs` out of the order it sorts in")
})

test("a page type the index does not name is refused", async () => {
  const world = worldFor(BODIES, VALUES, null)

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a count handed in holds how many pages one run carries values on", async () => {
  const world = worldFor(BODIES, VALUES)

  const said = await sortPropertyValuesOnEveryPage(world, {
    pageType: "book-section",
    key: KEY,
    atMost: 1,
  })

  expect(said.refused).toBeNull()
  expect([...new Set(pathsIn(said))]).toEqual([ONE_AT])
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const world = worldFor({ ...BODIES, [TWO_AT]: "const two = 1\n" }, VALUES)

  const said = await sortPropertyValuesOnEveryPage(world, { pageType: "book-section", key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldFor(BODIES, VALUES), { key: KEY })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
