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
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const AT = "thrumming/moots/moot.page-type.ts"

const TO = "thrumming/moots/moot.page-type.types.ts"

const ABOVE_AT = "thrumming/twigs/twig.page-type.ts"

const OPENING = `export const moot = {
  type: "page-type",
  slug: "moot",
} as const satisfies PageType
`

const PAGE = `${OPENING}
export type Moot = {
  name: string
}
`

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
  type: "page-type",
  slug: "moot",
  types: "ts",
} as const satisfies PageType
`

const ABOVE_PAGE = `export const twig = {
  type: "page-type",
  slug: "twig",
} as const satisfies PageType

export type Twig = {
  names: readonly string[]
}
`

const TYPES_BODY = "export const held = 1\n"

type Held = Record<string, unknown>

const MOOT: Held = { type: `${pageType.slug}/${pageType.slug}`, slug: "moot" }

const REACHED: string[] = []

type Holding = {
  readonly bodies?: Readonly<Record<string, string>>
  readonly pages?: Readonly<Record<string, Held>>
}

function worldFor(holding: Holding = {}): World {
  const bodies: Readonly<Record<string, string>> = holding.bodies ?? {
    [AT]: PAGE,
    [TO]: TYPES_BODY,
  }
  const pages: Readonly<Record<string, Held>> = holding.pages ?? { [AT]: MOOT }
  return {
    root: "/nowhere",
    index: {
      pageByPath: (path: string) => pages[path] ?? null,
      listedAt: (_kind: string, slug: string) => (slug === "twig" ? [{ path: ABOVE_AT }] : []),
      importersOf: () => [],
      manifestsBeside: () => new Map(),
      fileKeysAt: () => new Set(),
    } as never,
    textOf: (path: string) => bodies[path] ?? null,
    bodyOf: (path: string) => bodies[path] ?? null,
    under: () => [],
    base: (path: string) => bodies[path] ?? null,
    over: NOTHING_OVER,
    reaching: listing(REACHED),
  }
}

test("the key naming the file and the move of the type are one answer", () => {
  const world = worldFor()

  const said = addPageTypeTypes(world, { at: AT })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(AT) ?? "").toContain(`types: "ts",`)
  expect(bodies.get(AT) ?? "").not.toContain("export type Moot")
  expect(bodies.get(TO) ?? "").toContain("export type Moot")
})

test("the file the type lands at is the `types` file beside the page type", () => {
  expect([...pathsIn(addPageTypeTypes(worldFor(), { at: AT }))]).toContain(TO)
})

test("a page type declaring no type of that name gains the key and nothing is moved", () => {
  const world = worldFor({ bodies: { [AT]: OPENING, [TO]: TYPES_BODY } })

  const said = addPageTypeTypes(world, { at: AT })

  expect(said.refused).toBeNull()
  expect([...pathsIn(said)]).toEqual([AT])
  expect(bodiesIn(said, world.base).get(AT) ?? "").toContain(`types: "ts",`)
})

test("a types file holding no body is refused rather than written", () => {
  const said = addPageTypeTypes(worldFor({ bodies: { [AT]: PAGE } }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("divide-file-code")
})

test("a path naming no page is refused before any body is worked out", () => {
  const said = addPageTypeTypes(worldFor({ pages: {} }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page")
})

test("a page that is no page type is refused before any body is worked out", () => {
  const held: Readonly<Record<string, Held>> = {
    [AT]: { type: `${pageType.slug}/record-property`, slug: "moot" },
  }

  const said = addPageTypeTypes(worldFor({ pages: held }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no page type")
})

test("a page type stating no slug is refused", () => {
  const said = addPageTypeTypes(
    worldFor({ pages: { [AT]: { type: `${pageType.slug}/${pageType.slug}` } } }),
    {
      at: AT,
    }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("states no slug")
})

test("a page type stating that key already is refused by its path", () => {
  const said = runChange(worldFor({ bodies: { [AT]: STATED, [TO]: TYPES_BODY } }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("is a restatement")
})

test("a page type whose type spells a key as a list of another type is refused", () => {
  const said = addPageTypeTypes(worldFor({ bodies: { [AT]: LISTED, [TO]: TYPES_BODY } }), {
    at: AT,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`names`")
  expect(said.refused ?? "").toContain("a list of another type")
})

test("a page type whose type spells a key as a union of other types is refused", () => {
  const said = addPageTypeTypes(worldFor({ bodies: { [AT]: UNIONED, [TO]: TYPES_BODY } }), {
    at: AT,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`name`")
  expect(said.refused ?? "").toContain("a union of other types")
})

test("a page type is refused for that shape spelled in a type it extends", () => {
  const said = addPageTypeTypes(
    worldFor({
      bodies: { [AT]: PAGE, [TO]: TYPES_BODY, [ABOVE_AT]: ABOVE_PAGE },
      pages: {
        [AT]: { ...MOOT, extends: ["page-type/twig"] },
        [ABOVE_AT]: { type: `${pageType.slug}/${pageType.slug}`, slug: "twig" },
      },
    }),
    { at: AT }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`names`")
  expect(said.refused ?? "").toContain(ABOVE_AT)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = addPageTypeTypes(worldFor(), { at: AT })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
