import { expect, test } from "bun:test"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  CHOSEN,
  changeDraft,
  drafted,
} from "akasha/commands/pages/change/draft/change-draft.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change draft",
  from: "test",
  writer: null,
  agentId: null,
}

test("the help flag is answered before anything is piped in", async () => {
  const said = await changeDraft(["--help"], OUTSIDE)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(OUTSIDE.calledAs)
})

test("a draft keeps the edits rather than landing them", () => {
  expect(CHOSEN.drafts).toBe(true)
})

test("a draft bars the key saying what a commit is for", () => {
  expect(CHOSEN.barred).toContain("message")
})

test("a draft bars the key the word naming it already says", () => {
  expect(CHOSEN.barred).toContain("draft")
})

test("a draft names itself in the refusal a barred key draws", () => {
  expect(CHOSEN.said).toBe("draft")
})

const AGENT = "held.seat.ts"

const KEPT = "the edits are kept at held.jsonl, and `akasha change apply` lands them"

const COSTED = "what the run cost was recorded"

test("a draft that kept its edits before it threw names them in the refusal", async () => {
  const said = await drafted(AGENT, ["remove-page"], OUTSIDE, async (done) => {
    done.push(KEPT)
    throw new Error("the cost would not be recorded")
  })

  expect(said.report).toEqual([KEPT])
  expect(said.refusals.join(" ")).toContain("held.jsonl")
  expect(said.refusals.join(" ")).toContain("stopped part way")
})

test("a draft that threw before keeping anything says nothing of what it kept", async () => {
  const said = await drafted(AGENT, ["remove-page"], OUTSIDE, async () => {
    throw new Error("the change would not load")
  })

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
  expect(said.refusals[0] ?? "").toContain("would not load")
})

test("a draft names each thing it did in the order it did them", async () => {
  const said = await drafted(AGENT, ["remove-page"], OUTSIDE, async (done) => {
    done.push(KEPT)
    done.push(COSTED)
    throw new Error("the answer would not compose")
  })

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([KEPT, COSTED])
  expect(refused.indexOf(KEPT)).toBeLessThan(refused.indexOf(COSTED))
})

test("a draft that threw nothing is answered as that draft answered", async () => {
  const said = await drafted(AGENT, ["remove-page"], OUTSIDE, async () => told([KEPT]))

  expect(said.code).toBe(0)
  expect(said.report).toEqual([KEPT])
  expect(said.refusals).toEqual([])
})
