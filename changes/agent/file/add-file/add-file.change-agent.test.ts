import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { running } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { addFileCommand } from "./add-file.change-agent.code.ts"

const AT = "akasha/one.held.ts"

const PLAIN = "akasha/one/notes.md"

const REACHES = "change-mechanical/add-file-of-any-kind"

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: running(REACHES),
  }
}

test("the arguments naming a path and a body are answered as one edit", async () => {
  const said = await addFileCommand(worldOf({}), { at: PLAIN, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: PLAIN, content: "alpha\n" }])
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

test("the arguments this change hands on are reached through the runner the world carries", async () => {
  let reached = ""
  let carried: unknown = null
  const said = await addFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at, given) => {
        reached = at
        carried = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, body: "alpha\n", id: "auto" }
  )

  expect(reached).toBe(REACHES)
  expect(carried).toEqual({ at: AT, body: "alpha\n", id: "auto" })
  expect(said.refused).toBeNull()
})
