import { expect, test } from "bun:test"
import {
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { mobileSimLongPressDrag } from "akasha/commands/pages/mobile/sim/long-press-drag/mobile-sim-long-press-drag.command.code.ts"

const CORNERS = ["--x", "1", "--y", "2", "--to-x", "3", "--to-y", "4"]

const SWITCHED = "the sim session sess-4 was switched onto the webview context WEBVIEW_3"

const HALF_DONE = new Error("the actions call timed out with the finger still down")

test("a gesture that timed out half way says the session was already switched", async () => {
  const said = await mobileSimLongPressDrag(CORNERS, throwingAfter([SWITCHED], HALF_DONE))

  expect(said.report).toEqual([SWITCHED])
  expect(said.refusals.at(-1)).toBe(partWay([SWITCHED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a gesture refused before the session was reached names nothing it did", async () => {
  const said = await mobileSimLongPressDrag(CORNERS, throwingAfter([], HALF_DONE))

  expect(said.report).toEqual([])
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
  expect(said.refusals[0]).toContain("the finger still down")
})

test("each thing the gesture did before it stopped is named in turn", async () => {
  const wrote = [SWITCHED, "the finger went down", "the finger was dragged part way"]
  const said = await mobileSimLongPressDrag(CORNERS, throwingAfter(wrote, HALF_DONE))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(partWay(wrote)[0])
})
