import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  generatedBy,
  temperAddonDataGenerate,
} from "akasha/commands/pages/temper/addon/data-generate/temper-addon-data-generate.command.code.ts"

const ROOT = "/nowhere"

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper addon data-generate",
  from: ROOT,
  writer: null,
  agentId: null,
}

const STOPPED = new Error("the mappings would not be read back")

test("a run that wrote before it threw names what it had written", async () => {
  const wrote = "wrote 41 addon data file(s)"
  const said = await generatedBy(ROOT, throwingAfter([wrote], STOPPED))

  expect(said.report).toEqual([wrote])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it wrote anything says the fault and where it was thrown", async () => {
  const said = await generatedBy(ROOT, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the mappings would not be read back")
  expect(said.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote more than one thing names each of them in turn", async () => {
  const wrote = ["wrote 41 addon data file(s)", "wrote the inventory summary"]
  const said = await generatedBy(ROOT, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote.join("; ")}. ` +
      "Nothing after that ran."
  )
})

test("a flag this takes no argument for is refused before anything is written", async () => {
  const said = await temperAddonDataGenerate(["--json"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})

test("the checkout said twice is refused rather than read as the first saying", async () => {
  const said = await temperAddonDataGenerate(["--code-root", ROOT, "--code-root", ROOT], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--code-root` is said twice")
})

test("the checkout flag with nothing after it is refused rather than read as unsaid", async () => {
  const said = await temperAddonDataGenerate(["--code-root"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("takes a value, and none follows it")
})
