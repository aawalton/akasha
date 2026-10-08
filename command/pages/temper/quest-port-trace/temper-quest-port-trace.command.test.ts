import { expect, test } from "bun:test"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperQuestPortTrace } from "akasha/command/pages/temper/quest-port-trace/temper-quest-port-trace.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper quest-port-trace",
  from: ".",
  writer: null,
  agentId: null,
}

test("a flag this takes no argument for is refused before a capture is read", () => {
  const said = temperQuestPortTrace(["--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("the path said twice is refused rather than read as the first saying", () => {
  const said = temperQuestPortTrace(["--file-path", "/nowhere", "--file-path", "/nowhere"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--file-path` is said twice")
})

test("a path carrying no capture is refused rather than reported empty", () => {
  const said = temperQuestPortTrace(["--file-path", "/nowhere/TemperWorld.lua"], GIVEN)

  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain("no capture is at /nowhere/TemperWorld.lua")
})
