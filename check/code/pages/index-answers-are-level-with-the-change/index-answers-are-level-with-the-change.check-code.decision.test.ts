import { afterAll, expect, test } from "bun:test"
import {
  LEFT_OUT,
  refusalsOver,
  UNASKED,
} from "akasha/check/code/pages/index-answers-are-level-with-the-change/index-answers-are-level-with-the-change.check-code.decision.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  AT,
  changeWith,
  LINE,
  OTHER_AT,
  shadowOf,
  worldOf,
} from "akasha/page/index/modules/carrying/index-carrying.change-generator.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function world(): string {
  return worldOf(scratch.rootFor("akasha-index-answers-level-"))
}

test("an answer the files turn that the change lands nothing for refuses the change", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map()), shadow)).toEqual([
    { path: AT, reason: LEFT_OUT },
  ])
})

test("an answer the change lands that the files turn nothing at refuses the change", () => {
  const root = world()
  const shadow = shadowOf(root, new Map())
  expect(refusalsOver(changeWith(root, new Map([[AT, LINE]]), [AT]), shadow)).toEqual([
    { path: AT, reason: UNASKED },
  ])
})

test("an answer the change takes away that the files turn nothing at is swept rather than refused", () => {
  const root = world()
  const shadow = shadowOf(root, new Map())
  expect(refusalsOver(changeWith(root, new Map(), [AT]), shadow)).toEqual([])
})

test("an answer the change lands that its own files turn is let through", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map(), [AT]), shadow)).toEqual([])
})

test("an answer already holding what the change leaves is judged by nothing", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map([[AT, LINE]])), shadow)).toEqual([])
})

test("an answer under any index is judged", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[OTHER_AT, LINE]]))
  expect(refusalsOver(changeWith(root, new Map()), shadow)).toEqual([
    { path: OTHER_AT, reason: LEFT_OUT },
  ])
})
