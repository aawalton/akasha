import { expect, test } from "bun:test"
import {
  addPageTypeTypes,
  runChange,
} from "akasha/change/mechanical/page-type/add/add-page-type-types/add-page-type-types.change-mechanical-page-type.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { graphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.ts"
import { property } from "akasha/graph/attribute/pages/property.graph-attribute.ts"
import { graphEdge } from "akasha/graph/edge/graph-edge.page-type.ts"
import { relation } from "akasha/graph/edge/pages/relation.graph-edge.ts"
import {
  bodyOf,
  graphedRepo,
  textIn,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const TREE = "akasha"

const AT = `${TREE}/thrumming/moots/moot.page-type.ts`

const TO = `${TREE}/thrumming/moots/moot.page-type.types.ts`

const ABOVE_AT = `${TREE}/thrumming/twigs/twig.page-type.ts`

const TYPE_AT = `${pageType.slug}/${pageType.slug}`

const heldId = (one: string): string => `01a04a4a-0012-7000-8000-00000000000${one}`

const openingOf = (above: readonly string[]): string => `export const moot = {
  id: "${heldId("3")}",
  type: "${TYPE_AT}",
  slug: "moot",
  definition: "a page type a test invented",
  extends: ${JSON.stringify(above)},
} as const satisfies PageType
`

const OPENING = openingOf([])

const NAMED = `
export type Moot = {
  name: string
}
`

const PAGE = `${OPENING}${NAMED}`

const EXTENDING = `${openingOf([`${pageType.slug}/twig`])}${NAMED}`

const LISTED = `${OPENING}
export type Moot = {
  names: readonly string[]
}
`

const UNIONED = `${OPENING}
export type Moot = {
  name: string | null
}
`

const STATED = `export const moot = {
  id: "${heldId("3")}",
  type: "${TYPE_AT}",
  slug: "moot",
  definition: "a page type a test invented",
  types: "ts",
} as const satisfies PageType
`

const ABOVE_PAGE = `export const twig = {
  id: "${heldId("4")}",
  type: "${TYPE_AT}",
  slug: "twig",
  definition: "a page type a test invented",
} as const satisfies PageType

export type Twig = {
  names: readonly string[]
}
`

const TYPES_BODY = "export const held = 1\n"

const GRAPHED: Readonly<Record<string, string>> = Object.fromEntries(
  [
    thePage({
      id: heldId("1"),
      type: `${pageType.slug}/${graphAttribute.slug}`,
      slug: property.slug,
      definition: property.definition,
    }),
    thePage({
      id: heldId("2"),
      type: `${pageType.slug}/${graphEdge.slug}`,
      slug: relation.slug,
      definition: relation.definition,
      attributes: [`${graphAttribute.slug}/${property.slug}`],
    }),
  ].map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])
)

const REACHED: string[] = []

function graphedWorld(
  bodies: Readonly<Record<string, string>> = { [AT]: PAGE, [TO]: TYPES_BODY }
): World {
  const root = graphedRepo({ ...GRAPHED, ...bodies })
  return worldAt(root, textIn(root), listing(REACHED))
}

type Held = Record<string, unknown>

function worldFor(pages: Readonly<Record<string, Held>>): World {
  return {
    root: "/nowhere",
    index: { pageByPath: (path: string) => pages[path] ?? null } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: listing(REACHED),
  }
}

test("the key naming the file and the move of the type are one answer", () => {
  const world = graphedWorld()

  const said = addPageTypeTypes(world, { at: AT })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(AT) ?? "").toContain(`types: "ts",`)
  expect(bodies.get(AT) ?? "").not.toContain("export type Moot")
  expect(bodies.get(TO) ?? "").toContain("export type Moot")
})

test("the file the type lands at is the `types` file beside the page type", () => {
  expect([...pathsIn(addPageTypeTypes(graphedWorld(), { at: AT }))]).toContain(TO)
})

test("a page type declaring no type of that name gains the key and nothing is moved", () => {
  const world = graphedWorld({ [AT]: OPENING, [TO]: TYPES_BODY })

  const said = addPageTypeTypes(world, { at: AT })

  expect(said.refused).toBeNull()
  expect([...pathsIn(said)]).toEqual([AT])
  expect(bodiesIn(said, world.base).get(AT) ?? "").toContain(`types: "ts",`)
})

test("a types file holding no body is refused rather than written", () => {
  const said = addPageTypeTypes(graphedWorld({ [AT]: PAGE }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("divide-file-code")
})

test("a path naming no page is refused before any body is worked out", () => {
  const said = addPageTypeTypes(worldFor({}), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page")
})

test("a page that is no page type is refused before any body is worked out", () => {
  const held: Readonly<Record<string, Held>> = {
    [AT]: { type: `${pageType.slug}/record-property`, slug: "moot" },
  }

  const said = addPageTypeTypes(worldFor(held), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no page type")
})

test("a page type stating no slug is refused", () => {
  const said = addPageTypeTypes(worldFor({ [AT]: { type: TYPE_AT } }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("states no slug")
})

test("a page type stating that key already is refused by its path", () => {
  const said = runChange(graphedWorld({ [AT]: STATED, [TO]: TYPES_BODY }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("is a restatement")
})

test("a page type whose type spells a key as a list of another type is refused", () => {
  const said = addPageTypeTypes(graphedWorld({ [AT]: LISTED, [TO]: TYPES_BODY }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`names`")
  expect(said.refused ?? "").toContain("a list of another type")
})

test("a page type whose type spells a key as a union of other types is refused", () => {
  const said = addPageTypeTypes(graphedWorld({ [AT]: UNIONED, [TO]: TYPES_BODY }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`name`")
  expect(said.refused ?? "").toContain("a union of other types")
})

test("a page type is refused for that shape spelled in a type it extends", () => {
  const bodies = { [AT]: EXTENDING, [TO]: TYPES_BODY, [ABOVE_AT]: ABOVE_PAGE }

  const said = addPageTypeTypes(graphedWorld(bodies), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`names`")
  expect(said.refused ?? "").toContain(ABOVE_AT)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = addPageTypeTypes(graphedWorld(), { at: AT })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
