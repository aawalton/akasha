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

const CARRIED_AT = "akasha/a.domain.carried.jsonl"

const MOVED_CARRIED_AT = "akasha/far/a.domain.carried.jsonl"

const CARRIED_LINE = '{"slug":"a"}\n'

test("a page that moves is carried as a removal where it was and an addition where it went", () => {
  const root = worldWith({ name: "page" })
  const shadow = shadowOf(
    root,
    new Map([
      [CARRIED_AT, null],
      [MOVED_CARRIED_AT, CARRIED_LINE],
    ])
  )
  const change = changeWith(root, new Map([[CARRIED_AT, CARRIED_LINE]]))

  expect(carriedOver(change, shadow).edits).toEqual([
    { kind: "remove", path: CARRIED_AT },
    { kind: "add", path: MOVED_CARRIED_AT, content: CARRIED_LINE },
  ])
})

test("a page stating one more key is carried as a replacement of what that page carries", () => {
  const root = worldWith({ name: "page" })
  const now = `${CARRIED_LINE}{"title":"the one"}\n`
  const shadow = shadowOf(root, new Map([[CARRIED_AT, now]]))
  const change = changeWith(root, new Map([[CARRIED_AT, CARRIED_LINE]]))

  expect(carriedOver(change, shadow).edits).toEqual([
    { kind: "replace", path: CARRIED_AT, contentFrom: CARRIED_LINE, contentTo: now },
  ])
})
