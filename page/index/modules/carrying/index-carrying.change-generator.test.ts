import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { carriedOver } from "akasha/page/index/modules/carrying/index-carrying.change-generator.code.ts"
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
  return worldOf(scratch.rootFor("akasha-index-carrying-"))
}

test("an answer the base commit holds at no body is carried as an addition", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([
    { kind: "add", path: AT, content: LINE },
  ])
})

test("an answer whose body moved is carried as a replacement", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  const change = changeWith(root, new Map([[AT, "was\n"]]))
  expect(carriedOver(change, shadow).edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "was\n", contentTo: LINE },
  ])
})

test("an answer already holding what the change leaves is carried by no row", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map([[AT, LINE]])), shadow).edits).toEqual([])
})

test("an answer the change empties is carried as a removal", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[AT, null]]))
  const change = changeWith(root, new Map([[AT, LINE]]))
  expect(carriedOver(change, shadow).edits).toEqual([{ kind: "remove", path: AT }])
})

test("an answer filed under any index is carried", () => {
  const root = world()
  const shadow = shadowOf(root, new Map([[OTHER_AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([
    { kind: "add", path: OTHER_AT, content: LINE },
  ])
})
