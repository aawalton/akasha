import { expect, test } from "bun:test"
import { widened } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { worldOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { type Asked, runChange } from "./move-file.change-mechanical-file.code.ts"

const FROM = "akasha/one.held.ts"

const TO = "akasha/two.held.ts"

function ranOn(held: Readonly<Record<string, string>>, given: Asked): Answer {
  const world = worldOf(held)
  return widened(runChange(world, given), world.textOf)
}

test("a path the tree holds a body for is answered as one edit carrying it to another path", () => {
  const said = ranOn({ [FROM]: "alpha\n" }, { from: FROM, to: TO })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: TO, was: "alpha\n", body: "alpha\n", from: FROM }])
})

test("a path holding no body is refused and answers no edit", () => {
  const said = ranOn({}, { from: FROM, to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a path a body already stands at is refused rather than written over", () => {
  const said = ranOn({ [FROM]: "alpha\n", [TO]: "beta\n" }, { from: FROM, to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds a body already/)
})

test("the path a file already sits at is refused rather than answered as a move", () => {
  const said = ranOn({ [FROM]: "alpha\n" }, { from: FROM, to: FROM })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/already sits at/)
})

test("the two paths alone are stated rather than the body carried between them", () => {
  const said = runChange(worldOf({ [FROM]: "alpha\n" }), { from: FROM, to: TO })

  expect(said.edits).toEqual([{ kind: "move", pathFrom: FROM, pathTo: TO }])
})
