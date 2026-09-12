import { expect, test } from "bun:test"
import {
  CHOSEN,
  changeDraft,
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
