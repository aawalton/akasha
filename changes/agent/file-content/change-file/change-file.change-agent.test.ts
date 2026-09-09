import { expect, test } from "bun:test"
import { runChange as changeFile } from "../../../mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { changeFileCommand } from "./change-file.change-agent.code.ts"

const AT = "akasha/one.held.ts"

type Passage = { at: string; old: string; new: string }

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/change-file-content-of-any-kind") {
    return Promise.resolve(changeFile(world, given as Passage))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: RUNS,
  }
}

test("the arguments naming a path and two passages are answered as one edit", async () => {
  const said = await changeFileCommand(worldOf({ [AT]: "one two\n" }), {
    at: AT,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "replace", path: AT, contentFrom: "two", contentTo: "four" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no passage are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { at: AT, new: "four" })

  expect(said.refused ?? "").toMatch(/`old`/)
})

test("arguments saying nothing the passage becomes are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { at: AT, old: "two" })

  expect(said.refused ?? "").toMatch(/`new`/)
})

test("the passage this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await changeFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, old: "two", new: "four" }
  )

  expect(reached).toBe("change-mechanical-file-content/change-file-content-of-any-kind")
  expect(said.refused).toBeNull()
})
