import { expect, test } from "bun:test"
import type { Given } from "../calling/calling.module.code.ts"
import { TERMINAL } from "../piping/piping.module.test-fixtures.ts"
import { askedFor, filing } from "./mechanical-filing.module.code.ts"

const GIVEN: Given = {
  root: "/repo",
  calledAs: "akasha track",
  from: "/repo",
  writer: null,
  agentId: null,
}

const AT = "akasha/one/one.held.ts"

test("a body to write goes in through the change adding a file of any kind", () => {
  const asked = askedFor([{ kind: "add", path: AT, content: "alpha\n" }])

  expect(asked).toEqual([
    { at: "change-mechanical/add-file-of-any-kind", given: { at: AT, body: "alpha\n" } },
  ])
})

test("a path to take away goes through the change removing a file", () => {
  const asked = askedFor([{ kind: "remove", path: AT }])

  expect(asked).toEqual([{ at: "change-mechanical-file/remove-file", given: { at: AT } }])
})

test("a refusal the reading answers with is passed back untouched", async () => {
  const said = await filing([], GIVEN, TERMINAL)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("asks for nothing")
})

test("a call refused lands nothing and reports nothing", async () => {
  const said = await filing(["--content-file", "body.txt"], GIVEN, TERMINAL)
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})
