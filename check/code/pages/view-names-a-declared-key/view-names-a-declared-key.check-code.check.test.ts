import { afterAll, expect, test } from "bun:test"
import { viewNamesADeclaredKey } from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.check.code.ts"
import {
  HELD,
  listing,
  lists,
  PAGE_TYPE,
  paged,
  QUOIN,
  rooted,
  scratch,
  TEXT,
  VIEW,
  viewing,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  edging,
  landing,
  pathFor,
  shadowed,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const UNDER = "akasha-viewed-check-"

const PAGE_PROPERTY = "page-property"

const GEMEL = "gemel"

const WOLD = "wold"

const MOVED = "holding"

const SHOWN = "shown"

const LISTS_QUOIN = lists(QUOIN)

const HELD_BY_QUOIN = `${TEXT}/${HELD}`

const NEAR = 2

const FEW = 200

const MANY = 400

afterAll(scratch.sweep)

function judged(change: Change): readonly Judged[] {
  return viewNamesADeclaredKey(change, shadowed(change))
}

function narrowing(root: string, declares: readonly string[]): Change {
  typed(root, QUOIN, "page", declares)
  const at = pathFor(PAGE_TYPE, QUOIN)
  return landing(root, { [at]: onDisk(root)(at) })
}

function moving(root: string, propertySlug: string): Change {
  const at = paged(root, TEXT, HELD, { propertySlug })
  return landing(root, { [at]: onDisk(root)(at) })
}

function bodiesRead(change: Change): number {
  const shadow = shadowed(change)
  let read = 0
  const watched: Shadow = {
    ...shadow,
    pageOf: (path) => {
      read += 1
      return shadow.pageOf(path)
    },
  }
  viewNamesADeclaredKey(change, watched)
  return read
}

function apart(root: string, many: number): undefined {
  typed(root, WOLD, "page", [HELD_BY_QUOIN])
  const far: string[] = []
  for (let at = 0; at < many; at += 1) {
    far.push(viewing(root, `far-${at}`, { pageType: lists(WOLD), shown: [HELD] }))
  }
  listing(root, WOLD, far)
}

function readingOver(many: number): number {
  const root = rooted(UNDER)
  listing(root, QUOIN, [
    viewing(root, "near-one", { pageType: LISTS_QUOIN, shown: [HELD] }),
    viewing(root, "near-two", { pageType: LISTS_QUOIN, shown: [HELD] }),
  ])
  apart(root, many)
  return bodiesRead(narrowing(root, [HELD_BY_QUOIN]))
}

test("a change naming only a page type is judged over every view listing that page type", () => {
  const root = rooted(UNDER)
  const at = viewing(root, "looking", { pageType: LISTS_QUOIN, shown: [HELD] })
  listing(root, QUOIN, [at])

  const said = judged(narrowing(root, []))

  expect(said.map((one) => one.path)).toEqual([at])
  expect(said[0]?.reason ?? "").toContain("`held` at `shown[0]`")
})

test("a change leaving every key a view names declared is let through", () => {
  const root = rooted(UNDER)
  listing(root, QUOIN, [viewing(root, "looking", { pageType: LISTS_QUOIN, shown: [HELD] })])

  expect(judged(narrowing(root, [HELD_BY_QUOIN]))).toEqual([])
})

test("a view is a path this check takes", () => {
  const root = rooted(UNDER)
  const at = viewing(root, "looking", { pageType: LISTS_QUOIN })

  expect(viewNamesADeclaredKey.isInput(at, shadowed(landing(root, {})))).toBe(true)
})

test("a change reads the body of each view that change reaches and of no other view", () => {
  expect(readingOver(FEW)).toBe(NEAR)
})

test("twice as many views a change reaches none of are read no more often than half of them", () => {
  expect(readingOver(MANY)).toBe(readingOver(FEW))
})

test("a change writing a property of the view page type reaches a view listing that page nowhere", () => {
  const root = rooted(UNDER)
  viewing(root, "looking", { pageType: LISTS_QUOIN, shown: [HELD] })
  viewing(root, "other", { pageType: LISTS_QUOIN, shown: [HELD] })
  const at = paged(root, TEXT, SHOWN, { propertySlug: SHOWN, namesAPropertyKey: true })
  edging(root, `id-${SHOWN}`, PAGE_PROPERTY, `id-${VIEW}`, pathFor(PAGE_TYPE, VIEW))

  expect(bodiesRead(landing(root, { [at]: onDisk(root)(at) }))).toBe(NEAR)
})

test("a change writing one page property refuses a stale view that change names nowhere", () => {
  const root = rooted(UNDER)
  paged(root, TEXT, HELD, { propertySlug: HELD })
  typed(root, GEMEL, QUOIN)
  edging(root, `id-${HELD}`, PAGE_PROPERTY, `id-${QUOIN}`, pathFor(PAGE_TYPE, QUOIN))
  const one = viewing(root, "looking", { pageType: LISTS_QUOIN, shown: [HELD] })
  const two = viewing(root, "deeper", { pageType: lists(GEMEL), shown: [HELD] })
  listing(root, QUOIN, [one])
  listing(root, GEMEL, [two])

  const said = judged(moving(root, MOVED))

  expect(said.map((each) => each.path).sort()).toEqual([one, two].sort())
  expect(said[0]?.reason ?? "").toContain("`held` at `shown[0]`")
})
