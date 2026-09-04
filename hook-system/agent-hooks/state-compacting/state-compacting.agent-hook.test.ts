import { expect, test } from "bun:test"
import { compactingIn, SCOPE, stated } from "./state-compacting.agent-hook.code.ts"

const OPENED = JSON.stringify({ hook_event_name: "PreCompact" })

test("the first event opens a compaction and the second closes it", () => {
  expect(compactingIn({ hook_event_name: "PreCompact" })).toBe(true)
  expect(compactingIn({ hook_event_name: "PostCompact" })).toBe(false)
})

test("an event this does not run at is left alone", () => {
  expect(compactingIn({ hook_event_name: "SessionStart" })).toBeNull()
  expect(compactingIn({ hook_event_name: "PreToolUse" })).toBeNull()
  expect(compactingIn({})).toBeNull()
})

test("an event named as anything but text is left alone", () => {
  expect(compactingIn({ hook_event_name: 1 })).toBeNull()
  expect(compactingIn({ hook_event_name: null })).toBeNull()
})

test("a payload that will not parse states nothing", () => {
  expect(stated({}, "ba")).toBeNull()
  expect(stated({}, "")).toBeNull()
})

test("a call naming no seat states nothing", () => {
  expect(stated({}, OPENED)).toBeNull()
})

test("what this hook says about itself names what it does not reach", () => {
  const said = SCOPE.join("\n")

  expect(said).toContain("NOT REACHED")
  expect(said).toContain("PreCompact and PostCompact")
})
