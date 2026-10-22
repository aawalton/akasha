import { expect, test } from "bun:test"
import {
  type SubagentPage,
  seatPageAt,
  subagentPagesHeld,
} from "akasha/agent/modules/page-reading/agent-page-reading.module.code.ts"
import {
  type ForestRow,
  readSeatForest,
} from "akasha/agent/seat/fleet/modules/seat-forest/seat-forest.module.code.ts"
import {
  type ForestSaid,
  forestOver,
  NOW,
  type Reading,
} from "akasha/agent/seat/fleet/modules/seat-forest-reading/seat-forest-reading.module.code.ts"
import { colorOfState } from "akasha/agent/seat/observation/seat-turn/modules/color/seat-turn-color.module.code.ts"
import type {
  SeatTurnReading,
  SeatTurnState,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { seatTurnStateOf } from "akasha/agent/seat/observation/seat-turn/modules/state/seat-turn-state.module.code.ts"

const ASTRA: ForestRow = {
  id: "01a00000-0000-7000-8000-00000000000a",
  name: "astra",
  parent_agent_id: null,
  principal: "alan",
  launch: "opened",
  mode: "acceptEdits",
  role: "definer",
  assignment: "domain/astra",
  live: true,
}

const BOREA: ForestRow = {
  id: "01a00000-0000-7000-8000-00000000000b",
  name: "borea",
  parent_agent_id: ASTRA.id,
  principal: "agent",
  launch: "spawned",
  mode: null,
  role: null,
  assignment: null,
  live: false,
}

const SUBAGENT: SubagentPage = {
  seat: "astra",
  own: "0123456789abcdef0",
  at: "akasha/agent/subagent/pages/astra--0123456789abcdef0.subagent.ts",
  dispatchedAs: "general-purpose",
}

function reading(
  rows: readonly ForestRow[],
  turns: Readonly<Record<string, SeatTurnReading>>,
  colors: Readonly<Record<string, string>> = {},
  places: Readonly<Record<string, string>> = {}
): Reading & { readonly rootsAsked: string[] } {
  const rootsAsked: string[] = []
  return {
    rootsAsked,
    forest: () => rows,
    turn: (agentId) => turns[agentId] ?? { state: "stopped", waitingOn: null },
    color: (state: SeatTurnState, root: string) => {
      rootsAsked.push(root)
      return colors[state] ?? null
    },
    pageAt: (agentId: string, root: string) => {
      rootsAsked.push(root)
      return places[agentId] ?? null
    },
    subagents: (root: string) => {
      rootsAsked.push(root)
      return [SUBAGENT]
    },
  }
}

test("each row carries the seat's page beside what the seat itself is doing", () => {
  const said = forestOver(
    "/repo",
    reading(
      [ASTRA, BOREA],
      {
        [ASTRA.id]: { state: "working", waitingOn: null },
        [BOREA.id]: { state: "idle-pending", waitingOn: "a subagent" },
      },
      { working: "green", "idle-pending": "yellow" },
      { [ASTRA.id]: "akasha/agent/seat/pages/astra.seat.ts" }
    )
  )

  expect(said.rows[0]).toEqual({
    ...ASTRA,
    state: "working",
    waitingOn: null,
    color: "green",
    at: "akasha/agent/seat/pages/astra.seat.ts",
  })
  expect(said.rows[1]).toEqual({
    ...BOREA,
    state: "idle-pending",
    waitingOn: "a subagent",
    color: "yellow",
    at: null,
  })
})

test("a seat keeping no turn record reads stopped and carries both keys", () => {
  const said = forestOver("/repo", reading([ASTRA], {}))

  expect(said.rows[0]?.state).toBe("stopped")
  expect(said.rows[0]?.waitingOn).toBe(null)
  expect(Object.hasOwn(said.rows[0] ?? {}, "waitingOn")).toBe(true)
})

test("a state naming no color reads null rather than dropping the key", () => {
  const said = forestOver(
    "/repo",
    reading([ASTRA], { [ASTRA.id]: { state: "idle", waitingOn: null } })
  )

  expect(said.rows[0]?.color).toBe(null)
  expect(Object.hasOwn(said.rows[0] ?? {}, "color")).toBe(true)
})

test("the one root is what every path, page and color was read against", () => {
  const held = reading([ASTRA, BOREA], {})
  forestOver("/repo", held)

  expect(new Set(held.rootsAsked)).toEqual(new Set(["/repo"]))
  expect(held.rootsAsked.length).toBe(5)
})

test("what is read is one object carrying the repo, the rows and the subagent pages", () => {
  const said: ForestSaid = forestOver("/repo", reading([ASTRA], {}))

  expect(Object.keys(said)).toEqual(["repo", "rows", "subagents"])
  expect(said.subagents).toEqual([SUBAGENT])
  expect(said.repo).toBe("/repo")
})

test("a subagent page carries the kind that subagent was dispatched as", () => {
  const said: ForestSaid = forestOver("/repo", reading([ASTRA], {}))

  expect(said.subagents[0]?.dispatchedAs).toBe("general-purpose")
})

test("a fleet holding no seat reads an empty list rather than nothing at all", () => {
  const said = forestOver("/repo", reading([], {}))

  expect(said.rows).toEqual([])
})

test("a forest that cannot be read throws rather than reading as no seat at all", () => {
  const held: Reading = {
    ...reading([], {}),
    forest: () => {
      throw new Error("no seat page akasha holds could be read")
    },
  }

  expect(() => forestOver("/repo", held)).toThrow("no seat page akasha holds could be read")
})

test("the fleet now is read through the real forest, turn, color, page and subagent readers", () => {
  expect(NOW.forest).toBe(readSeatForest)
  expect(NOW.turn).toBe(seatTurnStateOf)
  expect(NOW.color).toBe(colorOfState)
  expect(NOW.pageAt).toBe(seatPageAt)
  expect(NOW.subagents).toBe(subagentPagesHeld)
})
