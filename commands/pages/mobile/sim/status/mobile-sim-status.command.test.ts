import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileSimStatus } from "akasha/commands/pages/mobile/sim/status/mobile-sim-status.command.code.ts"

const CALLED_AS = "akasha mobile sim status"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a flag is refused by a command that takes none, and no session is read", async () => {
  const said = await mobileSimStatus(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--bogus")
})

test("a command taking nothing says so rather than naming an empty list of flags", async () => {
  const said = await mobileSimStatus(["--bogus"], GIVEN)

  expect(said.refusals[0]).toBe(
    `\`--bogus\` is no argument \`${CALLED_AS}\` takes, and it takes none`
  )
})

test("a bare word is refused by a command that takes none", async () => {
  const said = await mobileSimStatus(["stray"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
