import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import { shadowAt } from "../../../shadow/shadow.module.code.ts"
import { matchingIn } from "./format-reaching.module.code.ts"

const REPO_AT = rootOf(import.meta.dir)

const COMMITTED = shadowAt(REPO_AT).index

const KEBAB = "name-format/lower-kebab-case"

const ID = "01a04eba-7459-7284-8c06-c79e5963387d"

test("a format reached by slug judges a name by its own code", () => {
  const matching = matchingIn(REPO_AT, COMMITTED)(KEBAB)
  expect(matching("some-slug")).toBe(true)
  expect(matching("Some Slug")).toBe(false)
})

test("a format asked for twice is loaded once and the same judgement is handed back", () => {
  const formatting = matchingIn(REPO_AT, COMMITTED)
  expect(formatting(KEBAB)).toBe(formatting(KEBAB))
})

test("a name format given by id reaches nothing, because a format is reached by slug", () => {
  expect(() => matchingIn(REPO_AT, COMMITTED)(ID)).toThrow("names a name format by id")
})

test("a slug no format carries is refused, because nothing would judge the value", () => {
  expect(() => matchingIn(REPO_AT, COMMITTED)("name-format/no-such-format")).toThrow(
    "no name format carries the slug `no-such-format`"
  )
})
