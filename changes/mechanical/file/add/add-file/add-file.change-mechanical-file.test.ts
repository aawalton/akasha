import { expect, test } from "bun:test"
import { worldOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addFile } from "./add-file.change-mechanical-file.code.ts"

const AT = "akasha/one.held.ts"

test("a path holding no body is answered as one edit adding that body", () => {
  const said = addFile(worldOf({}), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: null, body: "alpha\n" }])
})

test("a path holding another body is answered as one edit writing over that body", () => {
  const said = addFile(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "beta\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: "alpha\n", body: "beta\n" }])
})

test("a path already holding the body given is refused and answers no edit", () => {
  const said = addFile(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already holds this body/)
})
