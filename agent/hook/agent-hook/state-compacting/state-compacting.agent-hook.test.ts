import { expect, test } from "bun:test"
import {
  compactingIn,
  SCOPE,
  stated,
  worthWriting,
} from "akasha/agent/hook/agent-hook/state-compacting/state-compacting.agent-hook.code.ts"
import { stateCompacting } from "akasha/agent/hook/agent-hook/state-compacting/state-compacting.agent-hook.ts"

const OPENED = JSON.stringify({ hook_event_name: "PreCompact" })

test("the first event opens a compaction and the second closes it", () => {
  expect(compactingIn({ hook_event_name: "PreCompact" })).toBe(true)
  expect(compactingIn({ hook_event_name: "PostCompact" })).toBe(false)
})

test("a turn ending or a prompt arriving closes a compaction whose second event never came", () => {
  expect(compactingIn({ hook_event_name: "Stop" })).toBe(false)
  expect(compactingIn({ hook_event_name: "UserPromptSubmit" })).toBe(false)
})

test("every event the page runs at is answered", () => {
  for (const event of stateCompacting.runsAt) {
    expect(compactingIn({ hook_event_name: event })).not.toBeNull()
  }
})

test("a value is written only where the seat holds another", () => {
  expect(worthWriting(true, false)).toBe(true)
  expect(worthWriting(false, true)).toBe(true)
  expect(worthWriting(false, false)).toBe(false)
  expect(worthWriting(true, true)).toBe(false)
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
