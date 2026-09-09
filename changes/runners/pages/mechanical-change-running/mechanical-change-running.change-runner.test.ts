import { expect, test } from "bun:test"
import { refusing, stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer as Said } from "../../../modules/answer/change-answer.module.types.ts"
import { ledgerAt, type Reaching } from "../../../modules/shadow/change-shadow.module.code.ts"
import {
  type Asking,
  foldedOver,
  runMechanicalChange,
} from "./mechanical-change-running.change-runner.code.ts"

const ADD = "change-mechanical-file/add-file"

const MOVE = "change-mechanical-file/move-file"

const ONE = "one.md"

const TWO = "two.md"

function reaching(answers: Readonly<Record<string, Said>>): Reaching {
  return (_world, at) =>
    Promise.resolve(answers[at] ?? refusing(`\`${at}\` is reached by nothing here`))
}

function over(answers: Readonly<Record<string, Said>>): ReturnType<typeof ledgerAt> {
  return ledgerAt("/nowhere", () => null, reaching(answers))
}

const ADDING: Asking = { at: ADD, given: { at: ONE, body: "one\n" } }

const MOVING: Asking = { at: MOVE, given: { from: ONE, to: TWO } }

test("the changes named are run in order and their edits gathered into one answer", async () => {
  const said = await foldedOver(
    over({
      [ADD]: stating([{ kind: "add", path: ONE, content: "one\n" }]),
      [MOVE]: stating([{ kind: "move", pathFrom: ONE, pathTo: TWO }]),
    }),
    [ADDING, MOVING]
  )
  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "add", path: ONE, content: "one\n" },
    { kind: "move", pathFrom: ONE, pathTo: TWO },
  ])
})

test("a change reads the world as every change before it had already landed", async () => {
  const seen: string[] = []
  const world = ledgerAt(
    "/nowhere",
    () => null,
    (one, at) => {
      seen.push(one.textOf(ONE) ?? "nothing")
      return Promise.resolve(
        at === ADD
          ? stating([{ kind: "add", path: ONE, content: "one\n" }])
          : stating([{ kind: "move", pathFrom: ONE, pathTo: TWO }])
      )
    }
  )
  await foldedOver(world, [ADDING, MOVING])
  expect(seen).toEqual(["nothing", "one\n"])
})

test("a change that refuses stops the fold, so no change after that change runs", async () => {
  const ran: string[] = []
  const world = ledgerAt(
    "/nowhere",
    () => null,
    (_one, at) => {
      ran.push(at)
      return Promise.resolve(at === ADD ? refusing("nothing doing") : stating([]))
    }
  )
  const said = await foldedOver(world, [ADDING, MOVING])
  expect(said.refused).toBe("nothing doing")
  expect(ran).toEqual([ADD])
})

test("a call naming no change lands nothing and says so", async () => {
  const said = await runMechanicalChange("/nowhere", [], "held")
  expect(said).toEqual({ refusals: ["no change was named, so nothing is run and nothing lands"] })
})

test("every change stating no edit gathers to no edit and refuses nothing", async () => {
  const said = await foldedOver(over({ [ADD]: stating([]), [MOVE]: stating([]) }), [ADDING, MOVING])

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})
