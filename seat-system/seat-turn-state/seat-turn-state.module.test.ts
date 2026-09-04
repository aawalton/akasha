import { expect, test } from "bun:test"
import type { SeatPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"
import { readSeatTurn, type SeatTurnRecords } from "./seat-turn-state.module.code.ts"

const AT = Date.parse("2026-09-04T00:00:00.000Z")

const OFF = { value: false, at: AT } as const

const ON = { value: true, at: AT } as const

function kept(over: Partial<SeatTurnRecords> = {}): SeatTurnRecords {
  return {
    presence: "present" as SeatPresence,
    pending: { "live-subagent": OFF },
    working: { activeTurn: false },
    ...over,
  }
}

test("a seat holding no record at all is stopped", () => {
  const read = readSeatTurn({
    presence: "present",
    pending: {},
    working: {},
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
