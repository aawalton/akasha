import { expect, test } from "bun:test"
import { stating } from "../../../changes/modules/answer/change-answer.module.code.ts"
import { owingIn } from "./edits-landing.module.code.ts"

const ONE = "one.md"

const TWO = "two.md"

test("a path an edit names carries whether its readers owe the reading again", () => {
  const said = stating([{ kind: "add", path: ONE, content: "one\n", readersOweReading: true }])
  expect([...owingIn(said)]).toEqual([[ONE, true]])
})

test("a move carries that owing at both the path it left and the path it reached", () => {
  const said = stating([{ kind: "move", pathFrom: ONE, pathTo: TWO, readersOweReading: true }])
  expect([...owingIn(said)].sort()).toEqual([
    [ONE, true],
    [TWO, true],
  ])
})

test("an edit saying nothing of its readers carries no owing for that path", () => {
  expect([...owingIn(stating([{ kind: "add", path: ONE, content: "one\n" }]))]).toEqual([])
})
