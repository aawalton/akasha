import { expect, test } from "bun:test"
import { runChange as changeFile } from "../../../mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { refusing, replayed } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
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

function landedIn(held: Readonly<Record<string, string>>, said: Answer): string {
  const after = replayed(said, (path) => held[path] ?? null)
  if ("refused" in after) throw new Error(after.refused)
  const body = after.get(AT)
  return typeof body === "string" ? body : ""
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

test("a passage ending mid-line drops the newline its fence left and lands", async () => {
  const held = { [AT]: "export const one = { a: 1, b: 2 }\n" }
  const said = await changeFileCommand(worldOf(held), { at: AT, old: "a: 1\n", new: "a: 9\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "a: 1", contentTo: "a: 9" },
  ])
  expect(landedIn(held, said)).toBe("export const one = { a: 9, b: 2 }\n")
})

test("a passage of whole lines lands with the lines around it as they were", async () => {
  const held = { [AT]: "one\ntwo\nthree\nfour\n" }
  const said = await changeFileCommand(worldOf(held), {
    at: AT,
    old: "two\nthree\n",
    new: "2\n3\n",
  })

  expect(said.refused).toBeNull()
  expect(landedIn(held, said)).toBe("one\n2\n3\nfour\n")
})

test("a passage whose fence closed with no-newline loses no second character", async () => {
  const held = { [AT]: "export const one = { a: 1, b: 2 }\n" }
  const said = await changeFileCommand(worldOf(held), { at: AT, old: "a: 1", new: "a: 9" })

  expect(said.refused).toBeNull()
  expect(landedIn(held, said)).toBe("export const one = { a: 9, b: 2 }\n")
})
