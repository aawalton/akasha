import { expect, test } from "bun:test"
import { widened } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { worldOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./remove-file.change-mechanical-file.code.ts"

const AT = "akasha/one.held.ts"

function ranOn(held: Readonly<Record<string, string>>): Answer {
  const world = worldOf(held)
  return widened(runChange(world, { at: AT }), world.textOf)
}

test("a path the tree holds a body for is answered as one edit taking that path away", () => {
  const said = ranOn({ [AT]: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: "alpha\n", body: null }])
})

test("a path holding no body is refused and answers no edit", () => {
  const said = ranOn({})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("the path alone is stated rather than the body that path holds", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT })

  expect(said.edits).toEqual([{ kind: "remove", path: AT }])
})
