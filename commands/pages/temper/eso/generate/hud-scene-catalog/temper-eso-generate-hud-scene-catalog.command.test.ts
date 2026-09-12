import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Answering, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  cataloging,
  temperEsoGenerateHudSceneCatalog,
} from "akasha/commands/pages/temper/eso/generate/hud-scene-catalog/temper-eso-generate-hud-scene-catalog.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso generate hud-scene-catalog",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const BROKE = new Error("the catalog landed and the parse of the scene source broke after")

test("the world reaches this where the dispatcher hands it, rather than the test seam", () => {
  const answers: Answering = temperEsoGenerateHudSceneCatalog

  expect(answers.length).toBe(2)
})

test("an argument this command does not take is refused rather than passed over", async () => {
  const said = await cataloging(["--json"], GIVEN, throwingAfter([], BROKE))

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})

test("a run that landed the catalog and then threw names that commit", async () => {
  const said = await cataloging([], GIVEN, throwingAfter(["abc123"], BROKE))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw with no module landed names the fault and nothing else", async () => {
  const said = await cataloging([], GIVEN, throwingAfter([], BROKE))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the parse of the scene source broke after")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote three modules names all three where it stopped", async () => {
  const wrote = ["hud-fragment-group", "hud-scene-fragments", "hud-controls"]
  const said = await cataloging([], GIVEN, throwingAfter(wrote, BROKE))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "hud-fragment-group; hud-scene-fragments; hud-controls. Nothing after that ran."
  )
})
