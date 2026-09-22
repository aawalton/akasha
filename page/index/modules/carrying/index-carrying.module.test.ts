import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  carriedOver,
  heldByGit,
} from "akasha/page/index/modules/carrying/index-carrying.module.code.ts"
import {
  AT,
  AWAY_AT,
  changeWith,
  LINE,
  shadowOf,
  worldOf,
} from "akasha/page/index/modules/carrying/index-carrying.module.test-fixtures.ts"
import { indexAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldWith(value: object): string {
  return worldOf(scratch.rootFor("akasha-index-carrying-"), value)
}

test("the indexes git holds are the ones whose own pages say so", () => {
  const root = worldWith({ name: "page", tracked: true })
  expect(heldByGit(shadowAt(root))).toEqual([indexAt("page")])
})

test("an index saying nothing about git is held by git nowhere", () => {
  const root = worldWith({ name: "page" })
  expect(heldByGit(shadowAt(root))).toEqual([])
})

test("an answer the base commit holds at no body is carried as an addition", () => {
  const root = worldWith({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([
    { kind: "add", path: AT, content: LINE },
  ])
})

test("an answer whose body moved is carried as a replacement", () => {
  const root = worldWith({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  const change = changeWith(root, new Map([[AT, "was\n"]]))
  expect(carriedOver(change, shadow).edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "was\n", contentTo: LINE },
  ])
})

test("an answer already holding what the change leaves is carried by no row", () => {
  const root = worldWith({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map([[AT, LINE]])), shadow).edits).toEqual([])
})

test("an answer the change empties is carried as a removal", () => {
  const root = worldWith({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, null]]))
  const change = changeWith(root, new Map([[AT, LINE]]))
  expect(carriedOver(change, shadow).edits).toEqual([{ kind: "remove", path: AT }])
})

test("an answer filed under an index git holds none of is carried by nothing", () => {
  const root = worldWith({ name: "page", tracked: true })
  const shadow = shadowOf(root, new Map([[AWAY_AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([])
})

test("a change carries nothing where git holds no index at all", () => {
  const root = worldWith({ name: "page" })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([])
})
