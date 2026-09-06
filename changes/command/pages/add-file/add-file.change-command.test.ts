import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { addFileCommand } from "./add-file.change-command.code.ts"

const AT = "akasha/one.held.ts"

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

test("the arguments naming a path and a body are answered as one edit", () => {
  const said = addFileCommand(worldOf({}), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: null, body: "alpha\n" }])
})

test("arguments holding no path are refused by the name of the argument", () => {
  const said = addFileCommand(worldOf({}), { body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no body are refused by the name of the argument", () => {
  const said = addFileCommand(worldOf({}), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`body`/)
})
