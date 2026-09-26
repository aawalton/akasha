import { expect, test } from "bun:test"
import {
  attentionIn,
  SCOPE,
} from "akasha/agent/hook/agent-hook/inference-hook/state-needs-attention/state-needs-attention.inference-hook.code.ts"
import { stateNeedsAttention } from "akasha/agent/hook/agent-hook/inference-hook/state-needs-attention/state-needs-attention.inference-hook.ts"

test("a model answering yes on its last line asks Alan for something", () => {
  expect(attentionIn(['"Shall I land the hook?"\nKEPT\n\nYES'])).toBe(true)
})

test("a model answering no on its last line asks Alan for nothing", () => {
  expect(attentionIn(["NOTHING TO QUOTE\n\nNO"])).toBe(false)
})

test("no answer from a model settles nothing", () => {
  expect(attentionIn(null)).toBeNull()
  expect(attentionIn([])).toBeNull()
  expect(attentionIn([null])).toBeNull()
})

test("the hook runs where a turn ends and where a prompt arrives", () => {
  expect(stateNeedsAttention.runsAt).toEqual(["Stop", "UserPromptSubmit"])
})

test("what this hook says about itself names what it does not reach", () => {
  const said = SCOPE.join("\n")

  expect(said).toContain("NOT REACHED")
  expect(said).toContain("refuses nothing")
})
