import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { mobileSimTap } from "akasha/commands/pages/mobile/sim/tap/mobile-sim-tap.command.code.ts"

const AT_A_POINT = ["--x", "10", "--y", "20"]

const SWITCHED = "the sim session sess-3 was switched onto the webview context WEBVIEW_2"

const NO_ELEMENT = new Error("the selector matched nothing")

test("a selector matching nothing no longer reads as though nothing happened", async () => {
  const said = await mobileSimTap(AT_A_POINT, throwingAfter([SWITCHED], NO_ELEMENT))

  expect(said.code).toBe(OPERATIONAL)
  expect(said.report).toEqual([SWITCHED])
  expect(said.refusals.at(-1)).toContain(SWITCHED)
})

test("a tap that never reached the sim says only the fault it threw", async () => {
  const said = await mobileSimTap(AT_A_POINT, throwingAfter([], NO_ELEMENT))

  expect(said.report).toEqual([])
  expect(said.refusals.every((one) => !one.includes("stopped part way"))).toBe(true)
  expect(said.refusals[0]).toContain("the selector matched nothing")
})

test("the context switch and the tap are named apart rather than as one thing", async () => {
  const wrote = [SWITCHED, "the element was tapped"]
  const said = await mobileSimTap(AT_A_POINT, throwingAfter(wrote, NO_ELEMENT))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${SWITCHED}; the element was tapped`)
})
