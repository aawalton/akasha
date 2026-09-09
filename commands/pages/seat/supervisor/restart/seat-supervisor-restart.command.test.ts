import { expect, test } from "bun:test"
import { holderIn, nameOf } from "@akasha/seat-system/seat-reading"
import type { Given } from "../../../../modules/calling/calling.module.code.ts"
import { seatSupervisorRestart } from "./seat-supervisor-restart.command.code.ts"

function given(root: string): Given {
  return {
    root,
    calledAs: "akasha seat supervisor restart",
    from: root,
    writer: null,
    agentId: null,
  }
}

test("a restart naming no reach is refused", () => {
  const said = seatSupervisorRestart([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--all")
})

test("a flag it does not take is refused", () => {
  expect(seatSupervisorRestart(["--some"], given("/nowhere")).code).toBe(1)
})

test("a second word after the reach is refused", () => {
  expect(seatSupervisorRestart(["--all", "--all"], given("/nowhere")).code).toBe(1)
})

test("a name is read off the page path", () => {
  expect(nameOf("seat-system/seats/pages/athena.seat.ts")).toBe("athena")
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
