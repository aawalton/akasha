import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { portedBy } from "akasha/commands/pages/temper/upstream/data-port/temper-upstream-data-port.command.code.ts"

const ROOT = "/nowhere"

const STOPPED = new Error("geoDataReferenceTable missing")

test("a run that wrote before it threw names what it had written", async () => {
  const wrote = "wrote /nowhere/src/generated/zone-data.generated.ts"
  const said = await portedBy("lib-zone", ROOT, throwingAfter([wrote], STOPPED))

  expect(said.report).toEqual([wrote])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it wrote anything says the fault and where it was thrown", async () => {
  const said = await portedBy("lib-zone", ROOT, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("geoDataReferenceTable missing")
  expect(said.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote more than one file names each of them in turn", async () => {
  const wrote = [
    "cleared 4 generated file(s) under /nowhere/src/ptf/data/generated",
    "wrote /nowhere/src/ptf/data/generated/library-data-eu.generated.ts",
  ]
  const said = await portedBy("housing", ROOT, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote.join("; ")}. ` +
      "Nothing after that ran."
  )
})
