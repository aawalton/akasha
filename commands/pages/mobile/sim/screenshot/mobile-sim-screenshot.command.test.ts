import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  mobileSimScreenshot,
  pathIn,
} from "akasha/commands/pages/mobile/sim/screenshot/mobile-sim-screenshot.command.code.ts"

const CONTEXT = "the sim session sess-2 was switched onto the webview context WEBVIEW_1"

const NO_PICTURE = new Error("the sim answered a non-base64 value")

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha mobile sim screenshot",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a picture that could not be taken still says the context was switched", async () => {
  const said = await mobileSimScreenshot([], GIVEN, throwingAfter([CONTEXT], NO_PICTURE))

  expect(said.report).toEqual([CONTEXT])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${CONTEXT}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run reaching no session at all refuses with the fault and where it was thrown", async () => {
  const said = await mobileSimScreenshot([], GIVEN, throwingAfter([], NO_PICTURE))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("non-base64")
  expect(said.refusals[1]).toContain("thrown at ")
})

test("two things done before the throw are named in the order they were done", async () => {
  const wrote = [CONTEXT, "the picture was put at /tmp/one.png"]
  const said = await mobileSimScreenshot([], GIVEN, throwingAfter(wrote, NO_PICTURE))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${CONTEXT}; the picture was put at /tmp/one.png`)
})

test("a flag this takes no argument at is refused before the session is reached", async () => {
  const said = await mobileSimScreenshot(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--output")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileSimScreenshot(["shot.png"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("shot.png")
})

test("a flag naming a value with nothing after it is refused", async () => {
  const said = await mobileSimScreenshot(["--output"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--output")
})

test("a call naming no path names one for the moment that call was called at", () => {
  expect(pathIn(undefined, 1_700_000_000_000)).toEndWith("mobile-sim-1700000000000.png")
})

test("a path said is the path the picture goes to", () => {
  expect(pathIn("shot.png", 1)).toBe("shot.png")
})
