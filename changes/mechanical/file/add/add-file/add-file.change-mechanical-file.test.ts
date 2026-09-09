import { expect, test } from "bun:test"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { worldOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { type Asked, runChange } from "./add-file.change-mechanical-file.code.ts"

const AT = "akasha/one.held.ts"

function ranOn(held: Readonly<Record<string, string>>, given: Asked): Answer {
  return runChange(worldOf(held), given)
}

test("a path already holding the body given is refused and answers no edit", () => {
  const said = ranOn({ [AT]: "alpha\n" }, { at: AT, body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already holds this body/)
})

test("a path holding no body states an add holding the path and the content", () => {
  const said = runChange(worldOf({}), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: AT, content: "alpha\n" }])
})

test("a path holding another body states a replace holding the whole body each side", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "beta\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "alpha\n", contentTo: "beta\n" },
  ])
})
