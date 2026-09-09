import { expect, test } from "bun:test"
import {
  refusalOf,
  worldOf,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { type Asked, runChange } from "./change-file-content.change-mechanical-file-content.code.ts"

const AT = "akasha/one.held.ts"

function whyOf(held: Readonly<Record<string, string>>, given: Asked): string {
  const world = worldOf(held)
  return refusalOf(runChange(world, given), world.base)
}

test("a passage the body holds twice is refused where the edit is replayed", () => {
  expect(whyOf({ [AT]: "two and two\n" }, { at: AT, old: "two", new: "four" })).toMatch(
    /twice or more/
  )
})

test("a passage the body holds nowhere is refused where the edit is replayed", () => {
  expect(whyOf({ [AT]: "one\n" }, { at: AT, old: "two", new: "four" })).toMatch(
    /holds no such passage/
  )
})

test("a path holding no body is refused where the edit is replayed", () => {
  expect(whyOf({}, { at: AT, old: "two", new: "four" })).toMatch(/holds no body/)
})

test("a passage of no characters is refused where the edit is replayed", () => {
  expect(whyOf({ [AT]: "one\n" }, { at: AT, old: "", new: "four" })).toBe(
    "a passage of no characters names no place in a body"
  )
})

test("a passage replaced by itself is refused where the edit is replayed", () => {
  expect(whyOf({ [AT]: "one two\n" }, { at: AT, old: "two", new: "two" })).toMatch(/reads the same/)
})

test("the passage alone is stated rather than the body the change works out", () => {
  const said = runChange(worldOf({ [AT]: "one two three\n" }), {
    at: AT,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "replace", path: AT, contentFrom: "two", contentTo: "four" }])
})
