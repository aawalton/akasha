import { expect, test } from "bun:test"
import { addBinaryFileCommand } from "akasha/changes/agent/file/add-binary-file/add-binary-file.change-agent.code.ts"
import { NOT_TEXT } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Held } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const BYTES = "temper/collections-addon/Icons/book1.dds"

const TEXT = "akasha/one/notes.md"

function worldOf(held: Readonly<Record<string, Held>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
    textOf: () => null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

test("the argument naming a path is answered as one edit bringing that path in", () => {
  const said = addBinaryFileCommand(worldOf({ [BYTES]: NOT_TEXT }), { at: BYTES })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "bring", path: BYTES }])
})

test("a body that reads as text is brought in as a body of bytes is", () => {
  const said = addBinaryFileCommand(worldOf({ [TEXT]: "alpha\n" }), { at: TEXT })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "bring", path: TEXT }])
})

test("the edit answered names no body, whatever the tree holds", () => {
  const said = addBinaryFileCommand(worldOf({ [BYTES]: NOT_TEXT }), { at: BYTES })

  expect(Object.keys(said.edits[0] ?? {}).sort()).toEqual(["kind", "path"])
})

test("arguments holding no path are refused by the name of the argument", () => {
  const said = addBinaryFileCommand(worldOf({}), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("a path the tree holds no body at is refused", () => {
  const said = addBinaryFileCommand(worldOf({}), { at: BYTES })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})
