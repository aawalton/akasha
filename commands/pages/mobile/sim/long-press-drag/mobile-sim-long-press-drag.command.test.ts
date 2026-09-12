import { expect, test } from "bun:test"
import {
  OPERATIONAL,
  partWay,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Read } from "akasha/commands/pages/mobile/sim/long-press-drag/mobile-sim-long-press-drag.command.code.ts"
import { mobileSimLongPressDrag } from "akasha/commands/pages/mobile/sim/long-press-drag/mobile-sim-long-press-drag.command.code.ts"

const CORNERS = ["--x", "1", "--y", "2", "--to-x", "3", "--to-y", "4"]

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha mobile sim long-press-drag",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const SWITCHED = "the sim session sess-4 was switched onto the webview context WEBVIEW_3"

const HALF_DONE = new Error("the actions call timed out with the finger still down")

test("a gesture that timed out half way says the session was already switched", async () => {
  const said = await mobileSimLongPressDrag(CORNERS, GIVEN, throwingAfter([SWITCHED], HALF_DONE))

  expect(said.report).toEqual([SWITCHED])
  expect(said.refusals.at(-1)).toBe(partWay([SWITCHED])[0])
  expect(said.code).toBe(OPERATIONAL)
})

test("a gesture refused before the session was reached names nothing it did", async () => {
  const said = await mobileSimLongPressDrag(CORNERS, GIVEN, throwingAfter([], HALF_DONE))

  expect(said.report).toEqual([])
  expect(said.refusals.at(-1)).not.toContain("stopped part way")
  expect(said.refusals[0]).toContain("the finger still down")
})

test("each thing the gesture did before it stopped is named in turn", async () => {
  const wrote = [SWITCHED, "the finger went down", "the finger was dragged part way"]
  const said = await mobileSimLongPressDrag(CORNERS, GIVEN, throwingAfter(wrote, HALF_DONE))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(partWay(wrote)[0])
})

test("a call naming no corner at all is refused before the session is reached", async () => {
  const said = await mobileSimLongPressDrag([], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--x")
})

test("a call naming where the finger goes down and not where it ends is refused", async () => {
  const said = await mobileSimLongPressDrag(["--x", "1", "--y", "2", "--to-x", "3"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--to-y")
})

test("a hold that is no whole number is refused", async () => {
  const said = await mobileSimLongPressDrag([...CORNERS, "--hold-ms", "ages"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--hold-ms")
  expect(said.refusals[0]).toContain("ages")
})

test("a count of moves that is no whole number is refused", async () => {
  const said = await mobileSimLongPressDrag([...CORNERS, "--steps", "many"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--steps")
  expect(said.refusals[0]).toContain("many")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileSimLongPressDrag(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--to-x")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileSimLongPressDrag(["1"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("1")
})

const SEEN: Read[] = []

const DRAGGING = (_done: string[], read: Read) => {
  SEEN.push(read)
  return Promise.resolve(told([]))
}

test("a call naming corners alone holds 800ms, takes 12 moves and waits 30ms", async () => {
  SEEN.length = 0

  await mobileSimLongPressDrag(CORNERS, GIVEN, DRAGGING)
  expect(SEEN).toEqual([{ x: 1, y: 2, toX: 3, toY: 4, holdMs: 800, steps: 12, stepMs: 30 }])
})

test("a hold, a count of moves and a wait said are each read as numbers", async () => {
  SEEN.length = 0
  const said = [...CORNERS, "--hold-ms", "50", "--steps", "3", "--step-ms", "7"]

  await mobileSimLongPressDrag(said, GIVEN, DRAGGING)
  expect(SEEN).toEqual([{ x: 1, y: 2, toX: 3, toY: 4, holdMs: 50, steps: 3, stepMs: 7 }])
})
