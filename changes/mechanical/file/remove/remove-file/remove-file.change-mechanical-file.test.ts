import { expect, test } from "bun:test"
import {
  refusalOf,
  worldOf,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./remove-file.change-mechanical-file.code.ts"

const AT = "akasha/one.held.ts"

test("a path holding no body is refused where the edit is replayed", () => {
  const world = worldOf({})

  expect(refusalOf(runChange(world, { at: AT }), world.base)).toMatch(/holds no body/)
})

test("the path alone is stated rather than the body that path holds", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "remove", path: AT }])
})
