import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
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

test("a build set against itself differs nowhere", async () => {
  const said = await temperBuildShow(
    ["--build", maxMaxStamina.slug, "--compare", maxMaxStamina.slug],
    GIVEN
  )

  expect(said.report).toContain("0 differences")
})
