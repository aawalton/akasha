import { expect, test } from "bun:test"
import type { SeatPresence } from "akasha/agents/seats/modules/proc-key/seat-proc-key.module.code.ts"
import {
  readSeatTurn,
  type SeatTurnRecords,
} from "akasha/agents/seats/modules/turn-state/seat-turn-state.module.code.ts"

const AT = Date.parse("2026-09-04T00:00:00.000Z")

const OFF = { value: false, at: AT } as const

const ON = { value: true, at: AT } as const

function kept(over: Partial<SeatTurnRecords> = {}): SeatTurnRecords {
  return {
    presence: "present" as SeatPresence,
    pending: { "live-subagent": OFF },
    working: { activeTurn: false },
    onCallRole: false,
    ...over,
  }
}

test("a seat holding no record at all is stopped", () => {
  const read = readSeatTurn({
    presence: "present",
    pending: {},
    working: {},
    onCallRole: false,
  })

  expect(read.state).toBe("stopped")
})

test("a seat whose process is gone is stopped whatever the records say", () => {
  expect(readSeatTurn(kept({ presence: "absent" })).state).toBe("stopped")
  expect(readSeatTurn(kept({ presence: "absent", working: { activeTurn: true } })).state).toBe(
    "stopped"
  )
  expect(readSeatTurn(kept({ presence: "absent", pending: { "live-subagent": ON } })).state).toBe(
    "stopped"
  )
})

test("a seat whose process cannot be read is not stopped for being unreadable", () => {
  expect(readSeatTurn(kept({ presence: "unknown" })).state).toBe("idle")
  expect(readSeatTurn(kept({ presence: "unknown", working: { activeTurn: true } })).state).toBe(
    "working"
  )
})

test("a working seat is read as working before what the seat waits on is read", () => {
  const read = readSeatTurn(
    kept({ working: { activeTurn: true }, pending: { "live-subagent": ON } })
  )

  expect(read.state).toBe("working")
  expect(read.waitingOn).toBeNull()
})

test("a seat waiting on something is waiting, and names what for", () => {
  const read = readSeatTurn(kept({ pending: { compacting: ON } }))

  expect(read.state).toBe("idle-pending")
  expect(read.waitingOn).toBe("compacting")
})

test("a seat waiting on nothing is idle rather than waiting", () => {
  expect(readSeatTurn(kept()).state).toBe("idle")
})

test("a seat in an on-call role is ready for work sent to it rather than idle", () => {
  const read = readSeatTurn(kept({ onCallRole: true }))

  expect(read.state).toBe("ready")
  expect(read.waitingOn).toBe("work sent to it")
})

test("a seat in a role that is not on call is idle rather than ready", () => {
  expect(readSeatTurn(kept({ onCallRole: false })).state).toBe("idle")
})

test("a seat ready for work is told apart from one waiting on a turn it arranged", () => {
  expect(readSeatTurn(kept({ onCallRole: true })).state).not.toBe("idle-pending")
})

test("an on-call seat is ready though a turn it arranged is still to come", () => {
  const read = readSeatTurn(kept({ onCallRole: true, pending: { "live-subagent": ON } }))

  expect(read.state).toBe("ready")
})

test("what an on-call seat already waits on is named over the work sent to it", () => {
  const read = readSeatTurn(kept({ onCallRole: true, pending: { compacting: ON } }))

  expect(read.state).toBe("ready")
  expect(read.waitingOn).toBe("compacting")
})

test("a seat off call waiting on a turn it arranged is waiting rather than ready", () => {
  const read = readSeatTurn(kept({ onCallRole: false, pending: { "live-subagent": ON } }))

  expect(read.state).toBe("idle-pending")
  expect(read.waitingOn).toBe("live-subagent")
})

test("an on-call role is read as working while the seat works", () => {
  expect(readSeatTurn(kept({ onCallRole: true, working: { activeTurn: true } })).state).toBe(
    "working"
  )
})

test("an on-call role whose process is gone is stopped", () => {
  expect(readSeatTurn(kept({ onCallRole: true, presence: "absent" })).state).toBe("stopped")
})

test("a seat that has taken no turn at all is stopped whatever its role", () => {
  const read = readSeatTurn({
    presence: "present",
    pending: {},
    working: {},
    onCallRole: true,
  })

  expect(read.state).toBe("stopped")
})
