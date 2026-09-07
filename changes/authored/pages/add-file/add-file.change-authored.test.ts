import { expect, test } from "bun:test"
import { addFile } from "../../../mechanical/pages/add-file/add-file.change-mechanical.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { addFileCommand } from "./add-file.change-authored.code.ts"

const AT = "akasha/one.held.ts"

const PLAIN = "akasha/one/notes.md"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical/add-file") {
    return Promise.resolve(addFile(world, given as { at: string; body: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
    textOf: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: RUNS,
  }
}

test("the arguments naming a path and a body are answered as one edit", async () => {
  const said = await addFileCommand(worldOf({}), { at: PLAIN, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: PLAIN, was: null, body: "alpha\n" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await addFileCommand(worldOf({}), { body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no body are refused by the name of the argument", async () => {
  const said = await addFileCommand(worldOf({}), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`body`/)
})

test("the body this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await addFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, body: "alpha\n" }
  )

  expect(reached).toBe("change-mechanical/add-code-file")
  expect(said.refused).toBeNull()
})
