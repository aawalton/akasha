import { expect, test } from "bun:test"
import { lastAskedIn, lastSaidIn } from "akasha/seat-system/last-said/last-said.module.code.ts"

function said(text: string, more: Record<string, unknown> = {}): string {
  return JSON.stringify({
    type: "assistant",
    message: { content: [{ type: "text", text }] },
    ...more,
  })
}

function called(name: string): string {
  return JSON.stringify({
    type: "assistant",
    message: { content: [{ type: "tool_use", name, input: {} }] },
  })
}

test("the last words the agent wrote are the answer", () => {
  expect(lastSaidIn([said("first"), said("second")].join("\n"))).toBe("second")
})

test("a tool call carries no words", () => {
  expect(lastSaidIn([said("first"), called("Bash")].join("\n"))).toBe("first")
})

test("a subagent's words are no part of the answer", () => {
  expect(lastSaidIn([said("mine"), said("theirs", { isSidechain: true })].join("\n"))).toBe("mine")
})

test("a tool result carries no words", () => {
  const result = JSON.stringify({
    type: "user",
    message: { content: [{ type: "tool_result", content: "output" }] },
  })
  expect(lastSaidIn([said("mine"), result].join("\n"))).toBe("mine")
})

test("a line opening partway through is passed over", () => {
  expect(lastSaidIn(['e":"text","text":"broken"}]}}', said("whole")].join("\n"))).toBe("whole")
})

test("every text block of one message is joined", () => {
  const two = JSON.stringify({
    type: "assistant",
    message: {
      content: [
        { type: "text", text: "one" },
        { type: "tool_use", name: "Bash", input: {} },
        { type: "text", text: "two" },
      ],
    },
  })
  expect(lastSaidIn(two)).toBe("one\ntwo")
})

test("a tail with no words in it answers nothing", () => {
  expect(lastSaidIn("")).toBeNull()
  expect(lastSaidIn(called("Bash"))).toBeNull()
  expect(lastSaidIn(said("   "))).toBeNull()
})

function asked(text: string, more: Record<string, unknown> = {}): string {
  return JSON.stringify({
    type: "user",
    origin: { kind: "human" },
    message: { role: "user", content: text },
    ...more,
  })
}

test("the last words the person wrote are the answer", () => {
  expect(lastAskedIn([asked("first"), said("mine"), asked("second")].join("\n"))).toBe("second")
})

test("what the person wrote is read past what the agent wrote after it", () => {
  expect(lastAskedIn([asked("hold there"), said("holding")].join("\n"))).toBe("hold there")
})

test("a user line the person did not write carries no words", () => {
  const reminder = JSON.stringify({
    type: "user",
    message: { role: "user", content: [{ type: "text", text: "<system-reminder>" }] },
  })
  expect(lastAskedIn([asked("mine"), reminder].join("\n"))).toBe("mine")
})

test("a tool result carries no words the person wrote", () => {
  const result = JSON.stringify({
    type: "user",
    message: { content: [{ type: "tool_result", content: "output" }] },
  })
  expect(lastAskedIn([asked("mine"), result].join("\n"))).toBe("mine")
})

test("a person's words inside a subagent are no part of the answer", () => {
  expect(lastAskedIn([asked("mine"), asked("theirs", { isSidechain: true })].join("\n"))).toBe(
    "mine"
  )
})

test("a person's words held as blocks are joined", () => {
  const two = JSON.stringify({
    type: "user",
    origin: { kind: "human" },
    message: {
      role: "user",
      content: [
        { type: "text", text: "one" },
        { type: "text", text: "two" },
      ],
    },
  })
  expect(lastAskedIn(two)).toBe("one\ntwo")
})

test("a tail the person wrote nothing in answers nothing", () => {
  expect(lastAskedIn("")).toBeNull()
  expect(lastAskedIn(said("mine"))).toBeNull()
  expect(lastAskedIn(asked("   "))).toBeNull()
})
