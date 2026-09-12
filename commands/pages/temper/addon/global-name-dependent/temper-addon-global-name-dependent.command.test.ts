import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperAddonGlobalNameDependent } from "akasha/commands/pages/temper/addon/global-name-dependent/temper-addon-global-name-dependent.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper addon global-name-dependent",
  from: ".",
  writer: null,
  agentId: null,
}

test("a flag this takes no argument for is refused rather than passed over", () => {
  const said = temperAddonGlobalNameDependent(["--outdated"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--outdated` is no argument")
})

test("a second word is refused rather than the first read as the global", () => {
  const said = temperAddonGlobalNameDependent(["ALPHA_GLOBAL", "BETA_GLOBAL"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("takes 1 word and this call says 2")
})

test("the global said at its flag and as a word is refused rather than one taken", () => {
  const said = temperAddonGlobalNameDependent(["--global", "ALPHA_GLOBAL", "BETA_GLOBAL"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("and one call says it one way")
})

test("the global said twice is refused rather than read as the first saying", () => {
  const said = temperAddonGlobalNameDependent(
    ["--global", "ALPHA_GLOBAL", "--global", "BETA_GLOBAL"],
    GIVEN
  )

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--global` is said twice")
})
