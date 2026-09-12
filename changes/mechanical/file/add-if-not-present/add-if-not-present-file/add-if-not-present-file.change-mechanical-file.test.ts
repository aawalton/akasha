import { expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file/add-if-not-present/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.code.ts"
import { worldOf } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "akasha/one.held.ts"

test("a path already holding the body given states no edit and refuses nothing", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a path holding no body states an add holding the path and the content", () => {
  const said = runChange(worldOf({}), { at: AT, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: AT, content: "alpha\n" }])
})

test("a path holding another body states a replace holding the whole body each side", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "beta\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "alpha\n", contentTo: "beta\n" },
  ])
})

test("a body composed against the body there states the replace as it would without", () => {
  const said = runChange(worldOf({ [AT]: "alpha\n" }), { at: AT, body: "beta\n", old: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "alpha\n", contentTo: "beta\n" },
  ])
})

test("a body composed against a body that is not there is refused and answers no edit", () => {
  const said = runChange(worldOf({ [AT]: "moved\n" }), { at: AT, body: "beta\n", old: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/moved since the body handed in was composed/)
})

test("a body composed against a body at a path holding nothing is refused", () => {
  const said = runChange(worldOf({}), { at: AT, body: "beta\n", old: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/moved since the body handed in was composed/)
})

test("a path already holding the body given is left alone though `old` is another body", () => {
  const said = runChange(worldOf({ [AT]: "beta\n" }), { at: AT, body: "beta\n", old: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})
