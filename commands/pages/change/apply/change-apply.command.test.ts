import { expect, test } from "bun:test"
import {
  CHOSEN,
  changeApply,
} from "akasha/commands/pages/change/apply/change-apply.command.code.ts"

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change apply",
  from: "test",
  writer: null,
  agentId: null,
}

test("the help flag is answered before anything is piped in", async () => {
  const said = await changeApply(["--help"], OUTSIDE)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(OUTSIDE.calledAs)
})

test("an apply lands rather than keeps", () => {
  expect(CHOSEN.drafts).toBe(false)
})

test("an apply bars the key that would keep the edits back", () => {
  expect(CHOSEN.barred).toEqual(["draft"])
})

test("an apply takes the key saying what the commit is for", () => {
  expect(CHOSEN.barred).not.toContain("message")
})

test("an apply names itself in the refusal a barred key draws", () => {
  expect(CHOSEN.said).toBe("apply")
})
