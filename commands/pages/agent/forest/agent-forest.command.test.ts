import { expect, test } from "bun:test"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import type { SubagentPage } from "@akasha/seat-system/agent-page-reading"
import type { ForestRow } from "@akasha/seat-system/seat-forest"
import {
  SEAT_TURN_STATES,
  type SeatTurnReading,
  type SeatTurnState,
} from "@akasha/seat-system/seat-turn-state"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import {
  agentForest,
  type ForestSaid,
  forestOver,
  type Reading,
  saidOf,
} from "./agent-forest.command.code.ts"

const ROOT = "/nowhere"

function givenIn(root: string): Given {
  return { root, calledAs: "akasha agent-forest", from: root, writer: null, agentId: null }
}

const ASTRA: ForestRow = {
  id: "01a00000-0000-7000-8000-00000000000a",
  name: "astra",
  parent_agent_id: null,
  principal: "alan",
  launch: "opened",
  mode: "acceptEdits",
  live: true,
}

const BOREA: ForestRow = {
  id: "01a00000-0000-7000-8000-00000000000b",
  name: "borea",
  parent_agent_id: ASTRA.id,
  principal: "agent",
  launch: "spawned",
  mode: null,
  live: false,
}

const SUBAGENT: SubagentPage = {
  seat: "astra",
  own: "0123456789abcdef0",
  at: "akasha/seat-system/subagents/pages/astra--0123456789abcdef0.subagent.ts",
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
      { [ASTRA.id]: "akasha/seat-system/seats/pages/astra.seat.ts" }
    )
  )

  expect(said.rows[0]).toEqual({
    ...ASTRA,
    state: "working",
    waitingOn: null,
    color: "green",
    at: "akasha/seat-system/seats/pages/astra.seat.ts",
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

test("what is said is one object carrying the repo, the rows and the subagent pages", () => {
  const said: ForestSaid = forestOver("/repo", reading([ASTRA], {}))

  expect(Object.keys(JSON.parse(saidOf(said)))).toEqual(["repo", "rows", "subagents"])
  expect(JSON.parse(saidOf(said)).subagents).toEqual([SUBAGENT])
  expect(JSON.parse(saidOf(said)).repo).toBe("/repo")
})

test("a subagent page carries the kind that subagent was dispatched as", () => {
  const said: ForestSaid = forestOver("/repo", reading([ASTRA], {}))

  expect(said.subagents[0]?.dispatchedAs).toBe("general-purpose")
})

test("a fleet holding no seat answers an empty list rather than nothing at all", () => {
  const said = JSON.parse(saidOf(forestOver("/repo", reading([], {}))))

  expect(said.rows).toEqual([])
})

test("a word this does not take refuses as a fault in the call", async () => {
  const said = await agentForest(["--json"], givenIn(ROOT))

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--json`")
})

test("a forest that cannot be read is a throw carried out as a refusal", () => {
  const held: Reading = {
    ...reading([], {}),
    forest: () => {
      throw new Error("no seat page akasha holds could be read")
    },
  }

  expect(() => forestOver("/repo", held)).toThrow("no seat page akasha holds could be read")
})

test("a call naming nothing answers the forest the fleet holds now", async () => {
  const said = await agentForest([], givenIn(akashaRoot()))

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  const held = JSON.parse(said.report[0] ?? "")

  expect(held.repo).toBe(akashaRoot())
  expect(Array.isArray(held.rows)).toBe(true)
  expect(Array.isArray(held.subagents)).toBe(true)
  for (const one of held.rows) {
    expect(typeof one.id).toBe("string")
    expect(typeof one.live).toBe("boolean")
    expect(SEAT_TURN_STATES).toContain(one.state)
    expect(Object.hasOwn(one, "waitingOn")).toBe(true)
    expect(Object.hasOwn(one, "color")).toBe(true)
    expect(Object.hasOwn(one, "at")).toBe(true)
  }
})
