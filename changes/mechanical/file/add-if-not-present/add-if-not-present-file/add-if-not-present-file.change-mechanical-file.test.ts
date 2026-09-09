import { expect, test } from "bun:test"
import { worldOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./add-if-not-present-file.change-mechanical-file.code.ts"

const AT = "akasha/one.held.ts"

test("a path already holding the body given states no edit and refuses nothing", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
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
