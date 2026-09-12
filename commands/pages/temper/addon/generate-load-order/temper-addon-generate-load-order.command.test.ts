import { expect, test } from "bun:test"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Named,
  temperAddonGenerateLoadOrder,
  writtenBy,
} from "akasha/commands/pages/temper/addon/generate-load-order/temper-addon-generate-load-order.command.code.ts"

const NAMED: Named = {
  root: "/nowhere",
  dir: "/nowhere/temper/addons/one",
  canonicalName: "TemperOne",
}

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper addon generate-load-order",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const UNDER = "/nowhere/temper/addon-build/dist/TemperOne"

const STOPPED = new Error("neither tsconfig declares a luaCompiler.luaBundle")

test("a run that wrote before it threw names what it had written", async () => {
  const wrote = `wrote ${UNDER}/build-id.lua`
  const said = await writtenBy(NAMED, throwingAfter([wrote], STOPPED))

  expect(said.report).toEqual([wrote])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it wrote anything says the fault and where it was thrown", async () => {
  const said = await writtenBy(NAMED, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("neither tsconfig declares a luaCompiler.luaBundle")
  expect(said.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote the stamp and the manifest names each of them in turn", async () => {
  const wrote = [`wrote ${UNDER}/build-id.lua`, `wrote ${UNDER}/TemperOne.txt`]
  const said = await writtenBy(NAMED, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote.join("; ")}. ` +
      "Nothing after that ran."
  )
})

test("a call naming no addon is refused rather than answered with a default", async () => {
  const said = await temperAddonGenerateLoadOrder([], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("takes `--addon`, and nothing said it")
})

test("two addons named in one call are refused rather than the first one written", async () => {
  const said = await temperAddonGenerateLoadOrder(
    ["--addon", "TemperOne", "--addon", "TemperTwo"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--addon` is said twice, and one call says it once")
})

test("a flag this takes no argument for is refused rather than passed over", async () => {
  const said = await temperAddonGenerateLoadOrder(["--addon", "TemperOne", "--json"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})
