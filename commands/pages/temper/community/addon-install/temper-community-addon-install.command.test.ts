import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperCommunityAddonInstall } from "akasha/commands/pages/temper/community/addon-install/temper-community-addon-install.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper community addon-install",
  from: ".",
  writer: null,
  agentId: null,
}

test("a call naming no addon is refused before the community site is reached", async () => {
  const said = await temperCommunityAddonInstall([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("takes `<name>`, and nothing said it")
})

test("two addons named in one call are refused rather than the first one installed", async () => {
  const said = await temperCommunityAddonInstall(["Votans", "Srendarr"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("takes 1 word and this call says 2")
})

test("a flag this takes no argument for is refused rather than passed over", async () => {
  const said = await temperCommunityAddonInstall(["Votans", "--outdated"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--outdated` is no argument")
})
