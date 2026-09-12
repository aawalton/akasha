import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { temperCommunityAddonInstall } from "akasha/commands/pages/temper/community/addon-install/temper-community-addon-install.command.code.ts"

test("a call naming no addon is refused before the community site is reached", async () => {
  const said = await temperCommunityAddonInstall([])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("nothing here names the community addon installed")
})

test("two addons named in one call are refused rather than the first one installed", async () => {
  const said = await temperCommunityAddonInstall(["Votans", "Srendarr"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "an install names one addon, and Votans, Srendarr names 2"
  )
})
