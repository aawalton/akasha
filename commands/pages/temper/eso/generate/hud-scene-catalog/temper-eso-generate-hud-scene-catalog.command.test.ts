import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { temperEsoGenerateHudSceneCatalog } from "akasha/commands/pages/temper/eso/generate/hud-scene-catalog/temper-eso-generate-hud-scene-catalog.command.code.ts"

const BROKE = new Error("the catalog landed and the parse of the scene source broke after")

test("a run that landed the catalog and then threw names that commit", async () => {
  const said = await temperEsoGenerateHudSceneCatalog([], throwingAfter(["abc123"], BROKE))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw with no module landed names the fault and nothing else", async () => {
  const said = await temperEsoGenerateHudSceneCatalog([], throwingAfter([], BROKE))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the parse of the scene source broke after")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote three modules names all three where it stopped", async () => {
  const wrote = ["hud-fragment-group", "hud-scene-fragments", "hud-controls"]
  const said = await temperEsoGenerateHudSceneCatalog([], throwingAfter(wrote, BROKE))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "hud-fragment-group; hud-scene-fragments; hud-controls. Nothing after that ran."
  )
})
