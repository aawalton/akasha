import { expect, test } from "bun:test"
import { widened } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { worldOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { type Asked, runChange } from "./change-file-content.change-mechanical-file-content.code.ts"

const AT = "akasha/one.held.ts"

function ranOn(held: Readonly<Record<string, string>>, given: Asked): Answer {
  const world = worldOf(held)
  return widened(runChange(world, given), world.textOf)
}

test("a passage the body holds once is answered as one edit holding the body after", () => {
  const said = ranOn({ [AT]: "one two three\n" }, { at: AT, old: "two", new: "four" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: "one two three\n", body: "one four three\n" }])
})

test("a passage the body holds twice is refused and answers no edit", () => {
  const said = ranOn({ [AT]: "two and two\n" }, { at: AT, old: "two", new: "four" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/twice or more/)
})

test("a passage the body holds nowhere is refused and answers no edit", () => {
  const said = ranOn({ [AT]: "one\n" }, { at: AT, old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/holds no such passage/)
})

test("a path holding no body is refused and answers no edit", () => {
  const said = ranOn({}, { at: AT, old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a passage of no characters is refused and answers no edit", () => {
  const said = ranOn({ [AT]: "one\n" }, { at: AT, old: "", new: "four" })

  expect(said.refused).toBe("a passage of no characters names no place in a body")
})

test("a passage replaced by itself is refused and answers no edit", () => {
  const said = ranOn({ [AT]: "one two\n" }, { at: AT, old: "two", new: "two" })

  expect(said.refused ?? "").toMatch(/reads the same/)
})

test("the passage alone is stated rather than the body the change works out", () => {
  const said = runChange(worldOf({ [AT]: "one two three\n" }), {
    at: AT,
    old: "two",
    new: "four",
  })

  expect(said.edits).toEqual([{ kind: "replace", path: AT, contentFrom: "two", contentTo: "four" }])
})
