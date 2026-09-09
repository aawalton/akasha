import { expect, test } from "bun:test"
import {
  refusalOf,
  worldOf,
} from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { type Asked, runChange } from "./move-file.change-mechanical-file.code.ts"

const FROM = "akasha/one.held.ts"

const TO = "akasha/two.held.ts"

function whyOf(held: Readonly<Record<string, string>>, given: Asked): string {
  const world = worldOf(held)
  return refusalOf(runChange(world, given), world.base)
}

test("a path holding no body is refused where the edit is replayed", () => {
  expect(whyOf({}, { from: FROM, to: TO })).toMatch(/holds no body/)
})

test("a path a body already stands at is refused rather than written over", () => {
  const held = { [FROM]: "alpha\n", [TO]: "beta\n" }

  expect(whyOf(held, { from: FROM, to: TO })).toMatch(/holds a body already/)
})

test("the path a file already sits at is refused rather than answered as a move", () => {
  const said = runChange(worldOf({ [FROM]: "alpha\n" }), { from: FROM, to: FROM })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already sits at/)
})

test("the two paths alone are stated rather than the body carried between them", () => {
  const said = runChange(worldOf({ [FROM]: "alpha\n" }), { from: FROM, to: TO })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "move", pathFrom: FROM, pathTo: TO }])
})
