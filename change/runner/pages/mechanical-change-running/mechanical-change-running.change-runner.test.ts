import { expect, test } from "bun:test"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import {
  refusing,
  type Answer as Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { ledgerAt, type Reaching } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asking,
  foldedOver,
  keptFolded,
  landingFaults,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { EXIT } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"

const ADD = `${changeMechanicalFile.slug}/${addFile.slug}` as const

const MOVE = `${changeMechanicalFile.slug}/${moveFile.slug}` as const

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
  expect(said).toEqual({
    refusals: ["no change was named, so nothing is run and nothing lands"],
    code: EXIT.INPUT,
  })
})

test("kept edits come first, and each change reads the world with them landed", async () => {
  const seen: string[] = []
  const world = ledgerAt(
    "/nowhere",
    () => null,
    (one) => {
      seen.push(one.textOf(ONE) ?? "nothing")
      return Promise.resolve(stating([{ kind: "move", pathFrom: ONE, pathTo: TWO }]))
    }
  )
  const said = await keptFolded(world, [{ kind: "add", path: ONE, content: "one\n" }], [MOVING])
  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "add", path: ONE, content: "one\n" },
    { kind: "move", pathFrom: ONE, pathTo: TWO },
  ])
  expect(seen).toEqual(["one\n"])
})

test("a kept edit that will not land refuses the whole landing and runs no change", async () => {
  const ran: string[] = []
  const world = ledgerAt(
    "/nowhere",
    () => null,
    (_one, at) => {
      ran.push(at)
      return Promise.resolve(stating([]))
    }
  )
  const stale = { kind: "replace", path: ONE, contentFrom: "was\n", contentTo: "now\n" } as const
  const said = await keptFolded(world, [stale], [ADDING])
  expect(said.refused).not.toBeNull()
  expect(ran).toEqual([])
  const landed = await runMechanicalChange("/nowhere", [ADDING], "held", { kept: [stale] })
  expect("refusals" in landed && landed.code).toBe(EXIT.DATA)
})

test("a landing carrying kept edits is refused where a body it leaves passes its byte ceiling", () => {
  const big = { kind: "add", path: "big.ts", content: `${"x".repeat(15_001)}\n` } as const
  const small = { kind: "add", path: "small.ts", content: "small\n" } as const
  const judges = { letOff: () => false, judge: () => [] }
  const faults = landingFaults(() => null, [small, big], [big], judges)
  expect(faults.join("\n")).toContain(
    "`big.ts` would be 15,002 bytes, over the 15,000 byte ceiling"
  )
  expect(landingFaults(() => null, [small], [small], judges)).toEqual([])
  expect(landingFaults(() => null, [big], [big], { ...judges, letOff: () => true })).toEqual([])
})

test("every change stating no edit gathers to no edit and refuses nothing", async () => {
  const said = await foldedOver(over({ [ADD]: stating([]), [MOVE]: stating([]) }), [ADDING, MOVING])

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})
