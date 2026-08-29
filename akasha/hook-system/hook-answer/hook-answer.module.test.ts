import { expect, test } from "bun:test"
import {
  ASIDE,
  commandIn,
  inputIn,
  payloadIn,
  REFUSED,
  refusing,
  rewriting,
  STANDING_ASIDE,
  toolInputIn,
  UNREADABLE,
} from "./hook-answer.module.code.ts"

const HOOK = "a-hook"

function commanded(command: string): string {
  return JSON.stringify({ tool_name: "Bash", tool_input: { command } })
}

test("the command is read out of the tool input", () => {
  expect(commandIn(commanded("git stash"), "command", HOOK)).toEqual({ command: "git stash" })
})

test("a payload naming another field of the tool input reads that field", () => {
  const raw = JSON.stringify({ tool_input: { file_path: "akasha/one.ts" } })
  expect(commandIn(raw, "file_path", HOOK)).toEqual({ command: "akasha/one.ts" })
})

test("an empty payload is no call, and is stood aside from", () => {
  expect(commandIn("", "command", HOOK)).toEqual({ command: "" })
  expect(commandIn("   \n", "command", HOOK)).toEqual({ command: "" })
})

test("a tool input carrying no such field is an empty command", () => {
  expect(commandIn(JSON.stringify({ tool_input: {} }), "command", HOOK)).toEqual({ command: "" })
})

test("a payload carrying no tool input is an empty command", () => {
  expect(commandIn(JSON.stringify({ tool_name: "Bash" }), "command", HOOK)).toEqual({ command: "" })
})

test("a payload that will not parse is answered as unreadable, and nothing is judged", () => {
  const said = commandIn("{ not json", "command", HOOK)
  expect(said).toHaveProperty("answer")
  if (!("answer" in said)) return
  expect(said.answer.code).toBe(UNREADABLE)
  expect(said.answer.err).toContain(HOOK)
  expect(said.answer.err).toContain("would not parse")
  expect(said.answer.out).toBe("")
})

test("a payload that is not an object is answered as unreadable", () => {
  for (const raw of ["[]", '"one"', "3", "null"]) {
    const said = commandIn(raw, "command", HOOK)
    expect(said).toHaveProperty("answer")
    if (!("answer" in said)) continue
    expect(said.answer.code).toBe(UNREADABLE)
    expect(said.answer.err).toContain("not an object")
  }
})

test("a tool input that is not an object is answered as unreadable", () => {
  const said = commandIn(JSON.stringify({ tool_input: "git stash" }), "command", HOOK)
  expect(said).toHaveProperty("answer")
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
  expect(STANDING_ASIDE).toEqual({ out: "", err: "", code: ASIDE })
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
