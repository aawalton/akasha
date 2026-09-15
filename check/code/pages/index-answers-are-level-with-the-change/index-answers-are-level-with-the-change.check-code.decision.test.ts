import { afterAll, expect, test } from "bun:test"
import {
  LEFT_OUT,
  refusalsOver,
  UNASKED,
} from "akasha/check/code/pages/index-answers-are-level-with-the-change/index-answers-are-level-with-the-change.check-code.decision.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  AT,
  AWAY_AT,
  changeWith,
  LINE,
  shadowOf,
  worldOf,
} from "akasha/page/index/modules/carrying/index-carrying.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldHeld(value: object): string {
  return worldOf(scratch.rootFor("akasha-index-answers-level-"), value)
}

test("an answer the files turn that the change lands nothing for refuses the change", () => {
  const root = worldHeld({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map()), shadow)).toEqual([
    { path: AT, reason: LEFT_OUT },
  ])
})

test("an answer the change lands that the files turn nothing at refuses the change", () => {
  const root = worldHeld({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map())
  expect(refusalsOver(changeWith(root, new Map([[AT, LINE]]), [AT]), shadow)).toEqual([
    { path: AT, reason: UNASKED },
  ])
})

test("an answer the change takes away that the files turn nothing at is swept rather than refused", () => {
  const root = worldHeld({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map())
  expect(refusalsOver(changeWith(root, new Map(), [AT]), shadow)).toEqual([])
})

test("an answer the change lands that its own files turn is let through", () => {
  const root = worldHeld({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map(), [AT]), shadow)).toEqual([])
})

test("an answer already holding what the change leaves is judged by nothing", () => {
  const root = worldHeld({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map([[AT, LINE]])), shadow)).toEqual([])
})

test("an answer under an index git holds none of is judged by nothing", () => {
  const root = worldHeld({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AWAY_AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map(), [AWAY_AT]), shadow)).toEqual([])
})

test("a change is let through where git holds no index at all", () => {
  const root = worldHeld({ name: "page" })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map(), [AT]), shadow)).toEqual([])
})
