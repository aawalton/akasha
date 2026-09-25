import { expect, test } from "bun:test"
import { TURN_STATE } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { work } from "akasha/agent/seat/properties/turn-state.computed-property.code.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const ON_CALL = "rank/on-call"

const OFF_CALL = "rank/off-call"

const PAGES: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  [ON_CALL]: { onCall: true },
  [OFF_CALL]: { onCall: false },
}

const REACH = {
  target: (slug: string) => PAGES[slug] ?? null,
  through: () => null,
  naming: () => [],
  file: () => null,
  folder: () => null,
} as Reach

const HELD = "803755-43274178"

const OFF = { compacting: false, liveShell: false, liveSubagent: false, sendInFlight: false }

test("a working seat states the working turn state", () => {
  const page = {
    role: OFF_CALL,
    supervisorProcess: HELD,
    turnPending: OFF,
    turnWorking: { activeTurn: true },
  }

  expect(work(page, REACH)).toBe(`${TURN_STATE}working`)
})

test("a seat off call between turns states the idle turn state", () => {
  const page = {
    role: OFF_CALL,
    supervisorProcess: HELD,
    turnPending: OFF,
    turnWorking: { activeTurn: false },
  }

  expect(work(page, REACH)).toBe(`${TURN_STATE}idle`)
})

test("a seat waiting on a subagent it ran states the waiting turn state", () => {
  const page = {
    role: OFF_CALL,
    supervisorProcess: HELD,
    turnPending: { ...OFF, liveSubagent: true },
    turnWorking: { activeTurn: false },
  }

  expect(work(page, REACH)).toBe(`${TURN_STATE}idle-pending`)
})

test("a seat whose role is on call states the ready turn state between turns", () => {
  const page = {
    role: ON_CALL,
    supervisorProcess: HELD,
    turnPending: OFF,
    turnWorking: { activeTurn: false },
  }

  expect(work(page, REACH)).toBe(`${TURN_STATE}ready`)
})

test("a seat naming no process states the stopped turn state", () => {
  const page = { role: OFF_CALL, turnPending: OFF, turnWorking: { activeTurn: true } }

  expect(work(page, REACH)).toBe(`${TURN_STATE}stopped`)
})

test("a seat that kept no record states the stopped turn state", () => {
  expect(work({ role: OFF_CALL, supervisorProcess: HELD }, REACH)).toBe(`${TURN_STATE}stopped`)
})
