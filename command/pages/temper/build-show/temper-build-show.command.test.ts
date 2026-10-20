import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  CHARACTER_HASH as CHARACTER,
  DESIGN_HASH as DESIGN,
} from "akasha/command/pages/temper/build-show/modules/build-show-gaps/build-show-gaps.module.test-fixtures.ts"
import { temperBuildShow } from "akasha/command/pages/temper/build-show/temper-build-show.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()
holdCompanionCatalogFromCheckout()

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper build-show",
  from: ROOT,
  writer: null,
  agentId: null,
}

async function shown(argv: readonly string[]): ReturnType<typeof temperBuildShow> {
  return await temperBuildShow(argv, GIVEN, async () => undefined)
}

test("a call naming no build is refused", async () => {
  const said = await shown([])

  expect(said.code).toBe(INPUT)
})

test("a build is not both set against another and checked for gaps", async () => {
  const said = await shown([DESIGN, "--gaps", CHARACTER, "--compare", DESIGN])

  expect(said.code).toBe(INPUT)
})

test("a word naming nothing that does not decode is refused", async () => {
  const said = await shown(["nothing-at-all"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "`nothing-at-all` names no build page, character or reading, and is no build hash"
  )
})

test("a build hash shows its stats for each bar", async () => {
  const said = await shown([DESIGN])

  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("stats (Temper): back bar")
})

test("a build set against itself differs nowhere", async () => {
  const said = await shown(["--build", DESIGN, "--compare", DESIGN])

  expect(said.report).toContain("0 differences")
})

test("a character's gaps from a design hash name no target stat and show the totals", async () => {
  const said = await shown([DESIGN, "--gaps", CHARACTER])

  expect(said.refusals).toEqual([])
  expect(said.report).toContain("target stat: none found, so every stat that changes")
  expect(said.report).toContain("totals (Temper)")
  expect(said.report.some((line) => line.trimStart().startsWith("food or drink"))).toBe(true)
})
