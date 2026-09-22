import { expect, test } from "bun:test"
import {
  ASIDE,
  inputIn,
  judgingCommandHook,
  LET_THROUGH,
  payloadIn,
  REFUSED,
  refusing,
  rewriting,
  toolInputIn,
  UNREADABLE,
  unreadable,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"

const HOOK = "a-hook"

const judged = judgingCommandHook(HOOK, import.meta.path, (command) =>
  command === "" ? null : command
)

function commanded(command: string): Record<string, unknown> {
  return { tool_name: "Bash", tool_input: { command } }
}

test("the command is read out of the tool input", () => {
  expect(judged(commanded("git stash")).err).toBe("git stash")
})

test("a payload carrying no call is stood aside from", () => {
  expect(judged({})).toEqual(LET_THROUGH)
  expect(judged({ tool_input: {} })).toEqual(LET_THROUGH)
  expect(judged({ tool_name: "Bash" })).toEqual(LET_THROUGH)
})

test("what is said of an unreadable payload says the dispatch refuses the call", () => {
  const held = unreadable(HOOK, "the hook payload would not read")
  expect(held.code).toBe(UNREADABLE)
  expect(held.err).toContain("the dispatch refuses the call")
  expect(held.err).not.toContain("the call was not refused")
  expect(held.out).toBe("")
})

test("a tool input that is not an object is answered as unreadable", () => {
  const said = judged({ tool_input: "git stash" })
  expect(said.code).toBe(UNREADABLE)
  expect(said.err).toContain("not an object")
})

test("a field holding no text is read as the text of what it holds", () => {
  expect(toolInputIn({ tool_input: { command: 3 } }, "command")).toBe("3")
  expect(toolInputIn({ tool_input: { command: null } }, "command")).toBe("")
  expect(toolInputIn({ tool_input: { command: false } }, "command")).toBe("")
})

test("a refusal is one JSON object on standard output, and its code is 2", () => {
  const said = refusing("no")
  expect(said.code).toBe(REFUSED)
  expect(JSON.parse(said.out)).toEqual({ decision: "block", reason: "no" })
})

test("a refusal carries its reason to standard error as well", () => {
  expect(refusing("the reason").err).toBe("the reason")
})

test("standing aside says nothing and its code is 0", () => {
  expect(LET_THROUGH).toEqual({ out: "", err: "", code: ASIDE })
})

test("a reason carrying newlines and quotes survives being made JSON", () => {
  const reason = 'one\ntwo "three"\n  four'
  expect(JSON.parse(refusing(reason).out)).toEqual({ decision: "block", reason })
})

test("a payload is read whole where a hook needs more of it than the tool input", () => {
  const held = { agent_id: "one", tool_input: { command: "ls" } }
  expect(payloadIn(JSON.stringify(held))).toEqual(held)
})

test("a payload that is not an object of its own reads as nothing", () => {
  for (const one of ["{ not json", "[]", '["one"]', "null", '"one"', "3", "true", ""]) {
    expect(payloadIn(one)).toBeNull()
  }
})

test("the tool input is read whole where a hook is to hand it back changed", () => {
  const held = { command: "ls", description: "list" }
  expect(inputIn({ tool_input: held })).toEqual(held)
})

test("a tool input that is not an object of its own reads as nothing", () => {
  for (const one of ["ls", ["ls"], 3, null, undefined, true]) {
    expect(inputIn({ tool_input: one })).toBeNull()
  }
  expect(inputIn({})).toBeNull()
})

test("a call handed back with its input changed is one JSON object, and its code is 0", () => {
  const held = { command: "ls" }
  const said = rewriting("PreToolUse", held)
  expect(said.code).toBe(ASIDE)
  expect(said.err).toBe("")
  expect(JSON.parse(said.out)).toEqual({
    hookSpecificOutput: { hookEventName: "PreToolUse", updatedInput: held },
  })
})

test("the event a changed call is answered at is the one handed in", () => {
  expect(JSON.parse(rewriting("PostToolUse", {}).out).hookSpecificOutput.hookEventName).toBe(
    "PostToolUse"
  )
})
