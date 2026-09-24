import { afterAll, expect, test } from "bun:test"
import {
  judgedIn,
  reasonsFor,
  UNOWNED,
} from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import {
  AWAY_AT,
  AWAY_ENDED_AT,
  CODE_AT,
  ENDED_AT,
  FILED_AT,
  NAMED_AT,
  NOWHERE_AT,
  PAGE_AT,
  STRAY_AT,
  UNDER_AT,
  whole,
} from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.test-fixtures.ts"
import { bodiesIn } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = whole()

const HELD = shadowAt(ROOT)

const given = bodiesIn(ROOT)

afterAll(scratch.sweep)

test("a page owns the file that page is written in", () => {
  expect(reasonsFor(PAGE_AT, HELD)).toEqual([])
})

test("a file whose name carries a page type is owned by the page that name states", () => {
  expect(reasonsFor(CODE_AT, HELD)).toEqual([])
})

test("a file a page type names is owned by a page of that type in that folder", () => {
  expect(reasonsFor(NAMED_AT, HELD)).toEqual([])
})

test("a file beneath a folder a page type names is owned by the page naming that folder", () => {
  expect(reasonsFor(UNDER_AT, HELD)).toEqual([])
})

test("a file closing with an extension a page type names is owned by the page naming it", () => {
  expect(reasonsFor(ENDED_AT, HELD)).toEqual([])
})

test("those same names where no page of the type sits are owned by nothing", () => {
  expect(reasonsFor(AWAY_AT, HELD)).toEqual([UNOWNED])
  expect(reasonsFor(AWAY_ENDED_AT, HELD)).toEqual([UNOWNED])
})

test("a file no page owns at all is refused", () => {
  expect(reasonsFor(STRAY_AT, HELD)).toEqual([UNOWNED])
})

test("nothing under the index is judged", () => {
  expect(reasonsFor(FILED_AT, HELD)).toEqual([])
})

test("a file whose name states a page that is nowhere is let through", () => {
  expect(reasonsFor(NOWHERE_AT, HELD)).toEqual([])
})

test("a body is judged by its path rather than by what that body holds", () => {
  expect(judgedIn(given(STRAY_AT, "nothing\n"), HELD)).toEqual([UNOWNED])
  expect(judgedIn(given(NAMED_AT, "nothing\n"), HELD)).toEqual([])
})
