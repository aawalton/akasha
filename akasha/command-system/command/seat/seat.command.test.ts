import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { holderIn, nameOf, seat } from "./seat.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming what it takes", () => {
  const said = seat([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("supervisor")
})

test("a subject it does not act on is refused", () => {
  expect(seat(["page"], given("/nowhere")).code).toBe(1)
})

test("a supervisor named with no act is refused", () => {
  const said = seat(["supervisor"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("restart")
})

test("an act it does not do is refused", () => {
  expect(seat(["supervisor", "stop"], given("/nowhere")).code).toBe(1)
})

test("a restart reaching no seats is refused", () => {
  expect(seat(["supervisor", "restart"], given("/nowhere")).code).toBe(1)
})

test("a flag it does not take is refused", () => {
  expect(seat(["supervisor", "restart", "--some"], given("/nowhere")).code).toBe(1)
})

test("a second word after the reach is refused", () => {
  expect(seat(["supervisor", "restart", "--all", "--all"], given("/nowhere")).code).toBe(1)
})

test("a name is read off the page path", () => {
  expect(nameOf("akasha/seat-system/seat/seats/athena.seat.ts")).toBe("athena")
})

test("a process is its pid and the start time joined by a hyphen", () => {
  expect(holderIn("3593837-58441972")).toEqual({ pid: 3593837, started: "58441972" })
})

test("a process stating no start time is no process", () => {
  expect(holderIn("3593837")).toBeNull()
  expect(holderIn("3593837--")).toBeNull()
  expect(holderIn("")).toBeNull()
  expect(holderIn(null)).toBeNull()
})
