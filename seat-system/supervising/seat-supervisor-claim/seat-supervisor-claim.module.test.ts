import { expect, test } from "bun:test"
import {
  decideSeatSupervision,
  SeatSupervisionCollisionError,
} from "./seat-supervisor-claim.module.code.ts"

const SELF = "4242-998877"

test("a seat no supervisor holds is taken", () => {
  expect(
    decideSeatSupervision({ holderProcess: null, holderPresence: "unknown", selfProcess: SELF })
  ).toEqual({ kind: "unheld" })
})

test("a supervisor already holding a seat takes it again", () => {
  expect(
    decideSeatSupervision({ holderProcess: SELF, holderPresence: "present", selfProcess: SELF })
  ).toEqual({ kind: "held-by-self" })
})

test("a seat held by a process that has gone is taken over", () => {
  expect(
    decideSeatSupervision({ holderProcess: "7-1", holderPresence: "absent", selfProcess: SELF })
  ).toEqual({ kind: "took-over", goneProcess: "7-1" })
})

test("a holder still standing refuses the claim", () => {
  expect(
    decideSeatSupervision({ holderProcess: "7-1", holderPresence: "present", selfProcess: SELF })
  ).toEqual({ kind: "refuse", holderProcess: "7-1", holderPresence: "present" })
})

test("a holder whose presence cannot be read is treated as standing", () => {
  expect(
    decideSeatSupervision({ holderProcess: "7-1", holderPresence: "unknown", selfProcess: SELF })
      .kind
  ).toBe("refuse")
})

test("a refusal names the pid to kill where the key parses", () => {
  expect(new SeatSupervisionCollisionError("agent-a", "7-1", "present").holderPid).toBe(7)
  expect(new SeatSupervisionCollisionError("agent-a", "7.1", "present").holderPid).toBe(7)
})

test("a refusal names no pid where the key does not parse", () => {
  expect(new SeatSupervisionCollisionError("agent-a", "not-a-key", "present").holderPid).toBeNull()
  expect(new SeatSupervisionCollisionError("agent-a", "4242", "present").holderPid).toBeNull()
})
