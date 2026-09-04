import { expect, test } from "bun:test"
import { holderIn, nameOf } from "@akasha/seat-system/seat-reading"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { seat } from "./seat.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming what it takes", async () => {
  const said = await seat([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("supervisor")
})

test("a subject it does not act on is refused", async () => {
  expect((await seat(["page"], given("/nowhere"))).code).toBe(1)
})

test("a supervisor named with no act is refused", async () => {
  const said = await seat(["supervisor"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("restart")
  expect(said.refusals[0]).toContain("stop")
})

test("an act it does not do is refused", async () => {
  expect((await seat(["supervisor", "sleep"], given("/nowhere"))).code).toBe(1)
})

test("a restart reaching no seats is refused", async () => {
  expect((await seat(["supervisor", "restart"], given("/nowhere"))).code).toBe(1)
})

test("a flag it does not take is refused", async () => {
  expect((await seat(["supervisor", "restart", "--some"], given("/nowhere"))).code).toBe(1)
})

test("a second word after the reach is refused", async () => {
  expect((await seat(["supervisor", "restart", "--all", "--all"], given("/nowhere"))).code).toBe(1)
})

test("a stop naming no seat is refused", async () => {
  const said = await seat(["supervisor", "stop"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the seat to stop")
})

test("a stop given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seat(["supervisor", "stop", "--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is a flag")
})

test("a stop carrying a flag it does not take is refused", async () => {
  const said = await seat(["supervisor", "stop", "athena", "--wat"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a name no seat holds a page for is a data refusal, apart from a word it does not take", async () => {
  const said = await seat(["supervisor", "stop", "nobody-here"], given("/nowhere"))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("nobody-here")
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
