import { expect, test } from "bun:test"
import { answerFor } from "akasha/agents/hooks/agent-hooks/weigh-bash-call/weigh-bash-call.agent-hook.code.ts"
import { LET_THROUGH } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"

test("a bash call is handed back as the agent wrote it", () => {
  expect(answerFor()).toBe(LET_THROUGH)
})

test("nothing is said on either stream", () => {
  expect(answerFor().out).toBe("")
})
