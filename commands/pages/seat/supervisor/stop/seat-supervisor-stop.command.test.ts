import { expect, test } from "bun:test"
import type { Given } from "../../../../modules/calling/calling.module.code.ts"
import { seatSupervisorStop } from "./seat-supervisor-stop.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat supervisor stop", from: root, writer: null, agentId: null }
}

test("a stop naming no seat is refused", async () => {
  const said = await seatSupervisorStop([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the seat to stop")
})

test("a stop given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seatSupervisorStop(["--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is a flag")
})

test("a stop carrying a flag it does not take is refused", async () => {
  const said = await seatSupervisorStop(["athena", "--wat"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a name no seat holds a page for is a data refusal, apart from a word it does not take", async () => {
  const said = await seatSupervisorStop(["nobody-here"], given("/nowhere"))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("nobody-here")
})
