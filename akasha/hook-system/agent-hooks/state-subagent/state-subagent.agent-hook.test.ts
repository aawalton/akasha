import { expect, test } from "bun:test"
import { SEAT_NAMED } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { pageFiled } from "@akasha/indexes/testing"
import { actIn, askedOf, SCOPE } from "./state-subagent.agent-hook.code.ts"

const SEAT = "01a05844-6e60-7000-b54c-4b14559df70b"

const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

const OWN = "a38f63805f9b94edf"

const SEATED: Readonly<Record<string, string>> = { [SEAT_NAMED]: SEAT }

function payloadOf(said: Record<string, unknown>): string {
  return JSON.stringify(said)
}

function worldNaming(rootFor: (prefix: string) => string, path: string | null): string {
  const root = rootFor("state-subagent-")
  if (path === null) pageFiled(root, ANOTHER, "akasha/seat-system/seats/pages/thea.seat.ts")
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
    const root = worldNaming(world.rootFor, "akasha/seat-system/seats/pages/akasha.seat.ts")
    const raw = payloadOf({ hook_event_name: "SubagentStop", agent_id: OWN })
    expect(askedOf({}, raw, root)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a stop under a named seat asks for the page to go", () => {
  const world = scratchWorld()
  try {
    const root = worldNaming(world.rootFor, "akasha/seat-system/seats/pages/akasha.seat.ts")
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
    const root = worldNaming(world.rootFor, "akasha/seat-system/seats/pages/akasha.seat.ts")
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
