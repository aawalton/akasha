import { expect, test } from "bun:test"
import { decideReviveLaunch } from "./seat-revive-launch-decide.module.code.ts"

test("a seat with no session to resume is spawned", () => {
  const said = decideReviveLaunch({ sessionId: null, bootPrompt: "boot" })
  expect(said.status).toBe("spawned")
  expect(said.resumeSessionId).toBeUndefined()
  expect(said.materializeTranscript).toBe(false)
})

test("a spawning seat is handed the stated prompt over its boot prompt", () => {
  const said = decideReviveLaunch({ sessionId: null, prompt: "do this", bootPrompt: "boot" })
  expect(said.prompt).toBe("do this")
})

test("a spawning seat falls back to its boot prompt where nothing else is stated", () => {
  expect(decideReviveLaunch({ sessionId: null, bootPrompt: "boot" }).prompt).toBe("boot")
})

test("a spawning seat with neither prompt is handed nothing", () => {
  expect(decideReviveLaunch({ sessionId: null }).prompt).toBe("")
})

test("a seat with a session resumes it and has its transcript materialised", () => {
  const said = decideReviveLaunch({ sessionId: "sess-1", prompt: "carry on" })
  expect(said.status).toBe("revived")
  expect(said.resumeSessionId).toBe("sess-1")
  expect(said.materializeTranscript).toBe(true)
  expect(said.prompt).toBe("carry on")
})

test("a reviving seat is handed no boot prompt, having already been booted", () => {
  expect(decideReviveLaunch({ sessionId: "sess-1", bootPrompt: "boot" }).prompt).toBe("")
})
