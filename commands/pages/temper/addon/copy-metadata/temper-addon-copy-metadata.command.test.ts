import { expect, test } from "bun:test"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import {
  copiedBy,
  type Named,
  temperAddonCopyMetadata,
} from "akasha/commands/pages/temper/addon/copy-metadata/temper-addon-copy-metadata.command.code.ts"

const NAMED: Named = {
  root: "/nowhere",
  dir: "/nowhere/temper/addons/one",
  canonicalName: "TemperOne",
}

const UNDER = "/nowhere/temper/addon-build/dist/TemperOne"

const STOPPED = new Error("the manifest loads a file the build does not write")

test("a run that copied before it threw names what it had copied", async () => {
  const wrote = `wrote ${UNDER}/TemperOne.txt`
  const said = await copiedBy(NAMED, throwingAfter([wrote], STOPPED))

  expect(said.report).toEqual([wrote])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it copied anything says the fault and where it was thrown", async () => {
  const said = await copiedBy(NAMED, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the manifest loads a file the build does not write")
  expect(said.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote more than one file names each of them in turn", async () => {
  const wrote = [`wrote ${UNDER}/build-id.lua`, `copied ${UNDER}/art`]
  const said = await copiedBy(NAMED, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote.join("; ")}. ` +
      "Nothing after that ran."
  )
})

test("a call naming no addon is refused rather than answered with a default", async () => {
  const said = await temperAddonCopyMetadata([])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("name the addon whose metadata is copied with --addon")
})

test("two addons named in one call are refused rather than the first one copied", async () => {
  const said = await temperAddonCopyMetadata(["--addon", "TemperOne", "--addon", "TemperTwo"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "one addon's metadata is copied at a time, and TemperOne, TemperTwo names several"
  )
})
