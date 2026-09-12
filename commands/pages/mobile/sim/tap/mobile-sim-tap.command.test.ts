import { expect, test } from "bun:test"
import {
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Read } from "akasha/commands/pages/mobile/sim/tap/mobile-sim-tap.command.code.ts"
import { mobileSimTap } from "akasha/commands/pages/mobile/sim/tap/mobile-sim-tap.command.code.ts"

const AT_A_POINT = ["--x", "10", "--y", "20"]

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha mobile sim tap",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const SWITCHED = "the sim session sess-3 was switched onto the webview context WEBVIEW_2"

const NO_ELEMENT = new Error("the selector matched nothing")

test("a selector matching nothing no longer reads as though nothing happened", async () => {
  const said = await mobileSimTap(AT_A_POINT, GIVEN, throwingAfter([SWITCHED], NO_ELEMENT))

  expect(said.code).toBe(OPERATIONAL)
  expect(said.report).toEqual([SWITCHED])
  expect(said.refusals.at(-1)).toContain(SWITCHED)
})

test("a tap that never reached the sim says only the fault it threw", async () => {
  const said = await mobileSimTap(AT_A_POINT, GIVEN, throwingAfter([], NO_ELEMENT))

  expect(said.report).toEqual([])
  expect(said.refusals.every((one) => !one.includes("stopped part way"))).toBe(true)
  expect(said.refusals[0]).toContain("the selector matched nothing")
})

test("the context switch and the tap are named apart rather than as one thing", async () => {
  const wrote = [SWITCHED, "the element was tapped"]
  const said = await mobileSimTap(AT_A_POINT, GIVEN, throwingAfter(wrote, NO_ELEMENT))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${SWITCHED}; the element was tapped`)
})

test("a call naming neither an element nor a point is refused", async () => {
  const said = await mobileSimTap([], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--selector")
  expect(said.refusals[0]).toContain("--x")
})

test("an across with no down is refused rather than tapped at half a point", async () => {
  const said = await mobileSimTap(["--x", "10"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--y")
})

test("a down with no across is refused rather than tapped at half a point", async () => {
  const said = await mobileSimTap(["--y", "20"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--x")
})

test("an element and a point named together are refused rather than chosen between", async () => {
  const said = await mobileSimTap(["--selector", "#go", "--x", "10"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--selector")
  expect(said.refusals[0]).toContain("--x")
})

test("an across that is no whole number is refused", async () => {
  const said = await mobileSimTap(["--x", "over", "--y", "20"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--x")
  expect(said.refusals[0]).toContain("over")
})

test("a down that is no whole number is refused", async () => {
  const said = await mobileSimTap(["--x", "10", "--y", "down"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--y")
  expect(said.refusals[0]).toContain("down")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileSimTap(["#go"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("#go")
})

test("a point is handed over as numbers rather than as the words said", async () => {
  const seen: Read[] = []
  const tapping = (_done: string[], read: Read) => {
    seen.push(read)
    return Promise.resolve(told([]))
  }

  await mobileSimTap(["--x", "10", "--y", "20"], GIVEN, tapping)
  expect(seen).toEqual([{ x: 10, y: 20 }])
})

test("an element is handed over as the selector said", async () => {
  const seen: Read[] = []
  const tapping = (_done: string[], read: Read) => {
    seen.push(read)
    return Promise.resolve(told([]))
  }

  await mobileSimTap(["--selector", "#go"], GIVEN, tapping)
  expect(seen).toEqual([{ selector: "#go" }])
})
