import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  CHARACTER_HASH as CHARACTER,
  DESIGN_HASH as DESIGN,
} from "akasha/command/pages/temper/build-show/modules/build-show-gaps/build-show-gaps.module.test-fixtures.ts"
import { temperBuildShow } from "akasha/command/pages/temper/build-show/temper-build-show.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { maxMaxStamina } from "akasha/temper/player/character/character-build/pages/max-max-stamina/max-max-stamina.character-build.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper build-show",
  from: ROOT,
  writer: null,
  agentId: null,
}

test("a call naming no build is refused", async () => {
  const said = await temperBuildShow([], GIVEN)

  expect(said.code).toBe(INPUT)
})

test("a word naming nothing that does not decode is refused", async () => {
  const said = await temperBuildShow(["nothing-at-all"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "`nothing-at-all` names no build page, character or reading, and is no build hash"
  )
})

test("a build page decodes even though nothing read the catalogs before the call", async () => {
  const said = await temperBuildShow([maxMaxStamina.slug], GIVEN)
  const text = said.report.join("\n")

  expect(said.refusals).toEqual([])
  expect(text).toContain(`${maxMaxStamina.slug}: character-build ${maxMaxStamina.slug}`)
  expect(text).toContain("stats (Temper): back bar")
})

test("a character's gaps from a design hash name no target stat and show the totals", async () => {
  const said = await temperBuildShow([DESIGN, "--gaps", CHARACTER], GIVEN)

  expect(said.refusals).toEqual([])
  expect(said.report).toContain("target stat: none found, so every stat that changes")
  expect(said.report).toContain("totals (Temper)")
  expect(said.report.some((line) => line.trimStart().startsWith("food or drink"))).toBe(true)
})

test("a character's gaps answer as JSON", async () => {
  const said = await temperBuildShow([DESIGN, "--gaps", CHARACTER, "--json"], GIVEN)
  const answer = JSON.parse(said.report.join("\n")) as { gaps: { place: string }[] }

  expect(answer.gaps.map((one) => one.place)).toContain("food or drink")
})

test("a build is not both set against another and checked for gaps", async () => {
  const said = await temperBuildShow([DESIGN, "--gaps", CHARACTER, "--compare", DESIGN], GIVEN)

  expect(said.code).toBe(INPUT)
})

test("a build set against itself differs nowhere", async () => {
  const said = await temperBuildShow(
    ["--build", maxMaxStamina.slug, "--compare", maxMaxStamina.slug],
    GIVEN
  )

  expect(said.report).toContain("0 differences")
})
