import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import { mobileSimScreenshot } from "akasha/commands/pages/mobile/sim/screenshot/mobile-sim-screenshot.command.code.ts"

const CONTEXT = "the sim session sess-2 was switched onto the webview context WEBVIEW_1"

const NO_PICTURE = new Error("the sim answered a non-base64 value")

test("a picture that could not be taken still says the context was switched", async () => {
  const said = await mobileSimScreenshot([], throwingAfter([CONTEXT], NO_PICTURE))

  expect(said.report).toEqual([CONTEXT])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${CONTEXT}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run reaching no session at all refuses with the fault and where it was thrown", async () => {
  const said = await mobileSimScreenshot([], throwingAfter([], NO_PICTURE))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("non-base64")
  expect(said.refusals[1]).toContain("thrown at ")
})

test("two things done before the throw are named in the order they were done", async () => {
  const wrote = [CONTEXT, "the picture was put at /tmp/one.png"]
  const said = await mobileSimScreenshot([], throwingAfter(wrote, NO_PICTURE))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toContain(`${CONTEXT}; the picture was put at /tmp/one.png`)
})
