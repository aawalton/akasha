import { expect, test } from "bun:test"
import type { Given } from "../calling/calling.module.code.ts"
import { TERMINAL } from "../piping/piping.module.test-fixtures.ts"
import { filing } from "./mechanical-filing.module.code.ts"

const GIVEN: Given = {
  root: "/repo",
  calledAs: "akasha track",
  from: "/repo",
  writer: null,
  agentId: null,
}

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
