import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { generatedBy } from "akasha/commands/pages/temper/addon/data-generate/temper-addon-data-generate.command.code.ts"

const ROOT = "/nowhere"

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
