import { afterAll, expect, test } from "bun:test"
import { renamePageType } from "akasha/change/mechanical/page-type/rename-page-type/rename-page-type.change-mechanical-page-type.code.ts"
import { OWNED_LANDS_AT } from "akasha/change/mechanical/page-type/rename-page-type/rename-page-type.change-mechanical-page-type.test-fixtures.ts"
import {
  type Answer,
  type Bodies,
  pathsIn,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn, worldAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const CARRIED = "carried"

const KEPT_TYPE = "akasha/kept.page-type.ts"

const TYPE_LANDS = "akasha/carried.page-type.ts"

const ONE_PAGE = "akasha/kept/one.kept.ts"

const ONE_LANDS = "akasha/kept/one.carried.ts"

const ONE_CODE = "akasha/kept/one.kept.code.ts"

const ONE_CODE_LANDS = "akasha/kept/one.carried.code.ts"

const SPELLER_PAGE = "akasha/speller.module.ts"

const SPELLER_CODE = "akasha/speller.module.code.ts"

const BARE_TYPE = "akasha/bare.page-type.ts"

const BARE_LANDS = "akasha/spare.page-type.ts"

const TYPE_BODY = `export type Kept = { readonly id: string }

${pageOf({
  id: idOf("d"),
  pageTypeSlug: "page-type",
  slug: "kept",
  pluralSlug: "kepts",
  extends: [PAGE_AT],
  properties: [{ pagePropertySlug: "file-property/code", required: false, many: false }],
})}`

const ONE_BODY = `import type { Kept } from "../kept.page-type.ts"

export const one = {
  id: "${idOf("e")}",
  pageTypeSlug: "kept",
  slug: "one",
  code: "ts",
} as const satisfies Kept
`

const ONE_CODE_BODY = `import { one } from "./one.kept.ts"

export const held = one.slug
`

const BARE_BODY = `export type Bare = { readonly id: string }

${pageOf({
  id: idOf("c"),
  pageTypeSlug: "page-type",
  slug: "bare",
  pluralSlug: "bares",
  extends: [PAGE_AT],
})}`

function repoIn(): string {
  return indexedRepo({
    [KEPT_TYPE]: TYPE_BODY,
    [BARE_TYPE]: BARE_BODY,
    [ONE_PAGE]: ONE_BODY,
    [ONE_CODE]: ONE_CODE_BODY,
    [SPELLER_PAGE]: pageOf({
      id: idOf("f"),
      pageTypeSlug: "module",
      slug: "speller",
      code: "ts",
    }),
    [SPELLER_CODE]: `export const at = "kept/one"\n`,
  })
}

const KEPT_ROOT = repoIn()

const KEPT_WORLD = worldAt(KEPT_ROOT, textIn(KEPT_ROOT))

const ASKED = { at: KEPT_TYPE, to: CARRIED }

let kept: Answer | null = null

function keptSaid(): Answer {
  kept ??= renamePageType(KEPT_WORLD, ASKED)
  return kept
}

function keptBodies(): Bodies {
  return bodiesIn(keptSaid(), KEPT_WORLD.base)
}

test("a path naming no page type is refused here", () => {
  const said = renamePageType(KEPT_WORLD, { at: ONE_PAGE, to: CARRIED })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page type/)
})

test("the page type's own file and each file its pages hold carry the new slug", () => {
  const paths = pathsIn(keptSaid())

  expect(keptSaid().refused).toBe(null)
  expect(paths).toContain(TYPE_LANDS)
  expect(paths).toContain(ONE_LANDS)
  expect(paths).toContain(ONE_CODE_LANDS)
})

test("the page type a page states is restated at the path that page landed at", () => {
  const body = keptBodies().get(ONE_LANDS) ?? ""

  expect(keptSaid().refused).toBe(null)
  expect(body).toContain(`pageTypeSlug: "${CARRIED}"`)
  expect(body).toContain("satisfies Carried")
})

test("the slug the page type states is restated where it landed", () => {
  const body = keptBodies().get(TYPE_LANDS) ?? ""

  expect(keptSaid().refused).toBe(null)
  expect(body).toContain(`"slug": "${CARRIED}"`)
  expect(body).toContain(`export const ${CARRIED} =`)
  expect(body).toContain("export type Carried")
})

test("a body spelling a page's old address spells that page's new address", () => {
  expect(keptSaid().refused).toBe(null)
  expect(keptBodies().get(SPELLER_CODE) ?? "").toContain(`"${CARRIED}/one"`)
})

test("a body that moved names its own imports by the paths its new name reaches", () => {
  expect(keptSaid().refused).toBe(null)
  expect(keptBodies().get(ONE_CODE_LANDS) ?? "").toContain(`"./one.${CARRIED}.ts"`)
})

const OWNED_TYPE = "akasha/days/long-day.page-type.ts"

const OWNED_WORKED = "akasha/days/long-day.page-type.worked.ts"

const OWNED_LANDS = OWNED_LANDS_AT

const OWNED_PAGE = "akasha/days/pages/one/long-day-one.long-day.ts"

const OWNED_PAGE_LANDS = "akasha/days/pages/one/long-day-one.day.ts"

const OWNED_WORKED_LANDS = "akasha/days/day.page-type.worked.ts"

const OWNED_READER_PAGE = "akasha/reader.module.ts"

const OWNED_READER_CODE = "akasha/reader.module.code.ts"

const WORKED_PROPERTY = "akasha/worked.file-property.ts"

const OWNED_TYPE_BODY = `export type LongDay = { readonly id: string }

${pageOf({
  id: idOf("a"),
  pageTypeSlug: "page-type",
  slug: "long-day",
  pluralSlug: "long-days",
  extends: [PAGE_AT],
  worked: "ts",
})}`

const OWNED_PAGE_BODY = `import type { LongDay } from "../../long-day.page-type.ts"

export const longDayOne = {
  id: "${idOf("b")}",
  pageTypeSlug: "long-day",
  slug: "long-day-one",
} as const satisfies LongDay
`

const OWNED_READER_BODY = `import type { WorkedLongDay } from "./days/long-day.page-type.worked.ts"

export function idIn(one: WorkedLongDay): string {
  return one.id
}
`

const TYPES_AT = "akasha/page-type.page-type.ts"

const TYPES_BODY = bodyOf({
  id: idOf("2"),
  pageTypeSlug: "page-type",
  slug: "page-type",
  extends: [DOMAIN_AT],
  properties: [{ pagePropertySlug: "file-property/worked", required: false, many: false }],
})

function ownedRepo(): string {
  return indexedRepo({
    [TYPES_AT]: TYPES_BODY,
    [WORKED_PROPERTY]: pageOf({
      id: idOf("9"),
      pageTypeSlug: "file-property",
      slug: "worked",
      propertySlug: "worked",
    }),
    [OWNED_TYPE]: OWNED_TYPE_BODY,
    [OWNED_WORKED]: "export type WorkedLongDay = { readonly id: string }\n",
    [OWNED_PAGE]: OWNED_PAGE_BODY,
    [OWNED_READER_PAGE]: pageOf({
      id: idOf("h"),
      pageTypeSlug: "module",
      slug: "reader",
      code: "ts",
    }),
    [OWNED_READER_CODE]: OWNED_READER_BODY,
  })
}

const OWNED_ROOT = ownedRepo()

const OWNED_WORLD = worldAt(OWNED_ROOT, textIn(OWNED_ROOT))

const OWNED_ASKED = { at: OWNED_TYPE, to: "day" }

let owned: Answer | null = null

function ownedSaid(): Answer {
  owned ??= renamePageType(OWNED_WORLD, OWNED_ASKED)
  return owned
}

test("a page type whose folder already names its new plural keeps that folder", () => {
  const paths = pathsIn(ownedSaid())

  expect(ownedSaid().refused).toBe(null)
  expect(paths).toContain(OWNED_LANDS)
  expect(paths).toContain(OWNED_PAGE_LANDS)
})

test("the type a page type's worked file exports is spelled from the new slug", () => {
  const bodies = bodiesIn(ownedSaid(), OWNED_WORLD.base)

  expect(ownedSaid().refused).toBe(null)
  expect(bodies.get(OWNED_WORKED_LANDS) ?? "").toContain("export type WorkedDay")
  expect(bodies.get(OWNED_READER_CODE) ?? "").toContain("WorkedDay")
  expect(bodies.get(OWNED_READER_CODE) ?? "").not.toContain("WorkedLongDay")
})

test("a page type carrying no page is renamed all the same", () => {
  const said = renamePageType(KEPT_WORLD, { at: BARE_TYPE, to: "spare" })

  expect(said.refused).toBe(null)
  expect(pathsIn(said)).toContain(BARE_LANDS)
})
