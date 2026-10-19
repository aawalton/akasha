import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperStatCompare } from "akasha/command/pages/temper/stat-compare/temper-stat-compare.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper stat-compare",
  from: ROOT,
  writer: null,
  agentId: null,
}

test("a character is named as a word, and one naming no page is refused", async () => {
  const said = await temperStatCompare(["nobody-at-all"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a character is named at its flag as well", async () => {
  const said = await temperStatCompare(["--character", "nobody-at-all"], GIVEN)

  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a call naming no character is refused", async () => {
  const said = await temperStatCompare([], GIVEN)

  expect(said.code).toBe(INPUT)
})

test("a count of readings that is no whole number is refused", async () => {
  const said = await temperStatCompare(["nobody-at-all", "--last", "some"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})

test("a reading named both by when it was captured and by its id is refused", async () => {
  const said = await temperStatCompare(
    ["nobody-at-all", "--captured-at", "1760896298", "--id", "01a155"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})
