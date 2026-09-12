import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Asked,
  type Filing,
  filedBy,
  readIn,
  slotFrom,
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

function filing(wrote: readonly string[], thrown: Error): Filing {
  return async (_read, _given, done) => {
    for (const one of wrote) done.push(one)
    throw thrown
  }
}

test("an account named twice over is refused", () => {
  const read = readIn(["one", "two", "--email", "a@b.c"])
  if (!("refused" in read)) throw new Error("this was taken")
  expect(read.refused[0] ?? "").toContain("one account and no more")
})

test("a slot another account holds is refused rather than shared", () => {
  expect(slotFrom(new Map([["other", 3]]), 3)).toContain("held by")
})

test("a run that threw after the commit landed names that commit", async () => {
  const said = await filedBy(ASKED, HERE, filing([LANDED], new Error("the tree would not move")))

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([LANDED])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain(LANDED)
})

test("a run that threw before the commit landed says nothing of a commit", async () => {
  const said = await filedBy(ASKED, HERE, filing([], new Error("the index would not open")))

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a run that threw names each thing it did in the order it did them", async () => {
  const said = await filedBy(
    ASKED,
    HERE,
    filing([LANDED, SWEPT], new Error("the answer would not compose"))
  )

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(LANDED)).toBeLessThan(refused.indexOf(SWEPT))
  expect(refused).toContain("thrown at")
})

test("a run that threw carries the kind that throw names rather than one spelled here", async () => {
  const thrown = new InputError("the address is no address")

  const said = await filedBy(ASKED, HERE, filing([LANDED], thrown))

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})
