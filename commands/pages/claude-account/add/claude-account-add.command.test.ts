import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Asked,
  claudeAccountAdd,
  filedBy,
  slotFrom,
  wrongIn,
} from "akasha/commands/pages/claude-account/add/claude-account-add.command.code.ts"

const ASKED: Asked = { account: "tempereso", email: "a@b.c", alias: null }

const HERE: Given = {
  root: "/nowhere",
  calledAs: "akasha claude-account add",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const LANDED = "committed as 346ea7067fc"

const SWEPT = "moved the tree it landed onto"

test("an account named twice over is refused", async () => {
  const said = await claudeAccountAdd(["one", "two", "--email", "a@b.c"], HERE)

  expect(said.refusals.join(" ")).toContain("takes 1 word and this call says 2 words")
})

test("an alias slot below one is refused", () => {
  expect(wrongIn("tempereso", "a@b.c", 0)[0] ?? "").toContain("a whole number from one up")
})

test("a slot another account holds is refused rather than shared", () => {
  expect(slotFrom(new Map([["other", 3]]), 3)).toContain("held by")
})

test("a run that threw after the commit landed names that commit", async () => {
  const held = throwingAfter([LANDED], new Error("the tree would not move"))

  const said = await filedBy(ASKED, HERE, held)

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([LANDED])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain(LANDED)
})

test("a run that threw before the commit landed says nothing of a commit", async () => {
  const held = throwingAfter([], new Error("the index would not open"))

  const said = await filedBy(ASKED, HERE, held)

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a run that threw names each thing it did in the order it did them", async () => {
  const held = throwingAfter([LANDED, SWEPT], new Error("the answer would not compose"))

  const said = await filedBy(ASKED, HERE, held)

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(LANDED)).toBeLessThan(refused.indexOf(SWEPT))
  expect(refused).toContain("thrown at")
})

test("a run that threw carries the kind that throw names rather than one spelled here", async () => {
  const thrown = new InputError("the address is no address")

  const said = await filedBy(ASKED, HERE, throwingAfter([LANDED], thrown))

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})
