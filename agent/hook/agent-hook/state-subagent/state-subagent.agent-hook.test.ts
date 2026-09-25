import { expect, test } from "bun:test"
import {
  actIn,
  askedOf,
  filedWithin,
  SCOPE,
  WAITED_AT_MOST,
} from "akasha/agent/hook/agent-hook/state-subagent/state-subagent.agent-hook.code.ts"
import { SEAT_NAMED } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { HOOK_SECONDS } from "akasha/agent/seat/supervisor/seat-agent-start/modules/agent-hook-registration/agent-hook-registration.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const SEAT = "01a05844-6e60-7000-b54c-4b14559df70b"

const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

const OWN = "a38f63805f9b94edf"

const SEATED: Readonly<Record<string, string>> = { [SEAT_NAMED]: SEAT }

function payloadOf(said: Record<string, unknown>): string {
  return JSON.stringify(said)
}

function worldNaming(rootFor: (prefix: string) => string, path: string | null): string {
  const root = rootFor("state-subagent-")
  if (path === null) pageFiled(root, ANOTHER, "akasha/agent/seat/pages/thea.seat.ts")
  else pageFiled(root, SEAT, path)
  return root
}

test("a start names the subagent and the kind it was dispatched as", () => {
  expect(actIn({ hook_event_name: "SubagentStart", agent_id: OWN, agent_type: "Explore" })).toEqual(
    { act: "put", own: OWN, dispatchedAs: "Explore" }
  )
})

test("a stop names the subagent alone", () => {
  expect(actIn({ hook_event_name: "SubagentStop", agent_id: OWN })).toEqual({
    act: "take",
    own: OWN,
  })
})

test("a payload naming no subagent asks for nothing", () => {
  expect(actIn({ hook_event_name: "SubagentStart", agent_type: "Explore" })).toBe(null)
})

test("a start naming no kind asks for nothing", () => {
  expect(actIn({ hook_event_name: "SubagentStart", agent_id: OWN })).toBe(null)
})

test("an event this hook is not registered at asks for nothing", () => {
  expect(actIn({ hook_event_name: "SessionStart", agent_id: OWN, agent_type: "Explore" })).toBe(
    null
  )
})

test("a payload that will not read asks for nothing", () => {
  const world = scratchWorld()
  try {
    expect(askedOf(SEATED, "{", worldNaming(world.rootFor, null))).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a seat the index carries no page for asks for nothing", () => {
  const world = scratchWorld()
  try {
    const root = worldNaming(world.rootFor, null)
    const raw = payloadOf({ hook_event_name: "SubagentStop", agent_id: OWN })
    expect(askedOf(SEATED, raw, root)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a call under no seat asks for nothing", () => {
  const world = scratchWorld()
  try {
    const root = worldNaming(world.rootFor, "akasha/agent/seat/pages/akasha.seat.ts")
    const raw = payloadOf({ hook_event_name: "SubagentStop", agent_id: OWN })
    expect(askedOf({}, raw, root)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a stop under a named seat asks for the page to go", () => {
  const world = scratchWorld()
  try {
    const root = worldNaming(world.rootFor, "akasha/agent/seat/pages/akasha.seat.ts")
    const raw = payloadOf({ hook_event_name: "SubagentStop", agent_id: OWN })
    expect(askedOf(SEATED, raw, root)).toEqual({
      seatName: "akasha",
      seatId: SEAT,
      act: { act: "take", own: OWN },
    })
  } finally {
    world.sweep()
  }
})

test("a start under a named seat carries the seat's id rather than its name alone", () => {
  const world = scratchWorld()
  try {
    const root = worldNaming(world.rootFor, "akasha/agent/seat/pages/akasha.seat.ts")
    const raw = payloadOf({
      hook_event_name: "SubagentStart",
      agent_id: OWN,
      agent_type: "Explore",
    })
    expect(askedOf(SEATED, raw, root)?.seatId).toBe(SEAT)
  } finally {
    world.sweep()
  }
})

test("the scope says what the hook leaves alone", () => {
  expect(SCOPE.join("\n")).toContain("WHAT IS LEFT ALONE")
})

function filedAfter(asks: number): { readonly filed: () => boolean; readonly asked: () => number } {
  let asked = 0
  return {
    filed: () => {
      asked += 1
      return asked > asks
    },
    asked: () => asked,
  }
}

function never(): boolean {
  return false
}

test("a start waits less than a hook is given", () => {
  expect(WAITED_AT_MOST).toBeGreaterThan(0)
  expect(WAITED_AT_MOST).toBeLessThan(HOOK_SECONDS * 1_000)
})

test("a page already filed lets the subagent begin at once", async () => {
  const page = filedAfter(0)
  expect(await filedWithin(page.filed, never, 5_000)).toBe(true)
  expect(page.asked()).toBe(1)
})

test("a start waits until the index files the page", async () => {
  const page = filedAfter(3)
  expect(await filedWithin(page.filed, never, 5_000)).toBe(true)
  expect(page.asked()).toBe(4)
})

test("a landing that ended with no page filed stops the wait before its bound", async () => {
  const began = Date.now()
  expect(await filedWithin(never, () => true, 5_000)).toBe(false)
  expect(Date.now() - began).toBeLessThan(1_000)
})

test("a landing that ended having filed the page answers that it is filed", async () => {
  const page = filedAfter(1)
  expect(await filedWithin(page.filed, () => true, 5_000)).toBe(true)
})

test("a page never filed lets the subagent begin once the wait is spent", async () => {
  const began = Date.now()
  expect(await filedWithin(never, never, 250)).toBe(false)
  expect(Date.now() - began).toBeGreaterThanOrEqual(250)
})
