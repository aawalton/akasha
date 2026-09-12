import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { seatReset } from "akasha/commands/pages/seat/reset/seat-reset.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat reset", from: root, writer: null, agentId: null }
}

test("a reset naming no seat is refused, and the refusal names the seat by its placeholder", async () => {
  const said = await seatReset([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("`akasha seat reset` takes `<name>`, and nothing said it")
})

test("a reset given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seatReset(["--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`--force` is no argument `akasha seat reset` takes — it takes `<name>`"
  )
})

test("a reset carrying anything past the seat is refused", async () => {
  const said = await seatReset(["athena", "--force"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--force")
})
