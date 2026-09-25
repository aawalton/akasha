import { expect, test } from "bun:test"
import {
  recordsOf,
  TURN_STATE,
  work,
} from "akasha/agent/seat/properties/working-color.computed-property.code.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const ON_CALL = "rank/on-call"

const OFF_CALL = "rank/off-call"

const PAGES: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  [ON_CALL]: { onCall: true },
  [OFF_CALL]: { onCall: false },
  [`${TURN_STATE}working`]: { color: "hue/working" },
  [`${TURN_STATE}idle`]: { color: "hue/idle" },
  [`${TURN_STATE}idle-pending`]: { color: "hue/idle-pending" },
  [`${TURN_STATE}ready`]: { color: "hue/ready" },
  [`${TURN_STATE}stopped`]: { color: "hue/stopped" },
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

test("a working seat is drawn in the working state's color", () => {
  const page = {
    role: OFF_CALL,
    supervisorProcess: HELD,
    turnPending: OFF,
    turnWorking: { activeTurn: true },
  }

  expect(work(page, REACH)).toBe("hue/working")
})

test("a seat off call between turns is drawn in the idle state's color", () => {
  const page = {
    role: OFF_CALL,
    supervisorProcess: HELD,
    turnPending: OFF,
    turnWorking: { activeTurn: false },
  }

  expect(work(page, REACH)).toBe("hue/idle")
})

test("a seat waiting on a subagent it ran is drawn in the waiting state's color", () => {
  const page = {
    role: OFF_CALL,
    supervisorProcess: HELD,
    turnPending: { ...OFF, liveSubagent: true },
    turnWorking: { activeTurn: false },
  }

  expect(work(page, REACH)).toBe("hue/idle-pending")
})

test("a seat whose role is on call is drawn ready between turns", () => {
  const page = {
    role: ON_CALL,
    supervisorProcess: HELD,
    turnPending: OFF,
    turnWorking: { activeTurn: false },
  }

  expect(work(page, REACH)).toBe("hue/ready")
})

test("a seat naming no process is drawn stopped", () => {
  const page = { role: OFF_CALL, turnPending: OFF, turnWorking: { activeTurn: true } }

  expect(work(page, REACH)).toBe("hue/stopped")
})

test("a seat that kept no record is drawn stopped", () => {
  expect(work({ role: OFF_CALL, supervisorProcess: HELD }, REACH)).toBe("hue/stopped")
})

test("a seat naming a process is not taken as gone, since no process is read here", () => {
  expect(recordsOf({ supervisorProcess: HELD }, false).presence).toBe("unknown")
  expect(recordsOf({}, false).presence).toBe("absent")
})

test("each kept component is read under the name the seat's page keeps it by", () => {
  const read = recordsOf(
    { turnPending: { compacting: true, liveShell: false, sendInFlight: true } },
    false
  )

  expect(read.pending).toEqual({
    compacting: { value: true },
    "live-shell": { value: false },
    "send-in-flight": { value: true },
  })
})

test("a turn state whose page names no color draws nothing", () => {
  const bare = {
    target: () => null,
    through: () => null,
    naming: () => [],
    file: () => null,
    folder: () => null,
  } as Reach

  expect(work({ supervisorProcess: HELD, turnWorking: { activeTurn: true } }, bare)).toBeNull()
})
