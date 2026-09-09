import { expect, test } from "bun:test"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { seatReset } from "./seat-reset.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat reset", from: root, writer: null, agentId: null }
}

test("a reset naming no seat is refused", async () => {
  const said = await seatReset([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the seat to reset")
})

test("a reset given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seatReset(["--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is a flag")
})

test("a reset carrying anything past the seat is refused", async () => {
  const said = await seatReset(["athena", "--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--force")
})
