import { expect, test } from "bun:test"
import { mobileSimStatus } from "akasha/commands/pages/mobile/sim/status/mobile-sim-status.command.code.ts"

test("a flag is refused by a command that takes none, and no session is read", async () => {
  const said = await mobileSimStatus(["--bogus"])

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--bogus")
})

test("what a command taking nothing names as what it takes is held here", async () => {
  const said = await mobileSimStatus(["--bogus"])

  expect(said.refusals[0]).toBe("`--bogus` is no flag this takes — it takes ")
})

test("a bare word is refused by a command that takes none", async () => {
  const said = await mobileSimStatus(["stray"])

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
