import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mobileTestflightStatus } from "akasha/commands/pages/mobile/testflight-status/mobile-testflight-status.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha mobile testflight-status",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a flag this takes no argument at is refused before Apple is reached", async () => {
  const said = await mobileTestflightStatus(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--wait")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileTestflightStatus(["alanwalton"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("alanwalton")
})

test("an app slug no page carries is refused rather than defaulted", async () => {
  const said = await mobileTestflightStatus(["--app", "nosuch"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nosuch")
})

test("a flag naming a value with nothing after it is refused", async () => {
  const said = await mobileTestflightStatus(["--app"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--app")
})
