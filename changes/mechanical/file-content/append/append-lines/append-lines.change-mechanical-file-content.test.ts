import { expect, test } from "bun:test"
import { worldOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./append-lines.change-mechanical-file-content.code.ts"

const AT = "akasha/one/held.jsonl"

test("the content is answered as an append at the path handed in", () => {
  const said = runChange(worldOf({}), { at: AT, content: "one\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "append", path: AT, content: "one\n" }])
})

test("content of many lines is answered as one append rather than as one each", () => {
  const said = runChange(worldOf({}), { at: AT, content: "one\ntwo\n" })

  expect(said.edits).toEqual([{ kind: "append", path: AT, content: "one\ntwo\n" }])
})

test("a path already holding a body is answered the same append", () => {
  const said = runChange(worldOf({ [AT]: "one\n" }), { at: AT, content: "two\n" })

  expect(said.edits).toEqual([{ kind: "append", path: AT, content: "two\n" }])
})
