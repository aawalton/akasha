import { expect, test } from "bun:test"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { seatResume } from "./seat-resume.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat resume", from: root, writer: null, agentId: null }
}

test("a resume naming no seat is refused", async () => {
  const said = await seatResume([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the seat to resume")
})

test("a resume given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seatResume(["--prompt"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is a flag")
})

test("a resume carrying a flag it does not take is refused", async () => {
  const said = await seatResume(["athena", "--json"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--json")
})

test("a resume reading a flag past a value it does not take is refused", async () => {
  const said = await seatResume(["athena", "--start-mode", "headless", "--now"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--now")
})
