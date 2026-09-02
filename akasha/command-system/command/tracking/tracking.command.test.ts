import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { NO_GLASS, outsideTracked, strayIn, TRACKED_AT, tracking } from "./tracking.command.code.ts"

const ROOT = "/nowhere"

const AT = `${TRACKED_AT}day-2026-09-01.daily-tracking.ts`

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha tracking", from: ROOT, writer: null, agentId: null }
}

test("a path under the tracked days is no stray", () => {
  expect(strayIn(ROOT, ["--file-path", AT, "--content-file", "held"])).toEqual([])
})

test("a path elsewhere under akasha is a stray", () => {
  const said = strayIn(ROOT, [
    "--file-path",
    "akasha/command-system/command/write/write.command.ts",
  ])
  expect(said).toEqual([outsideTracked("akasha/command-system/command/write/write.command.ts")])
})

test("a path outside akasha altogether is a stray", () => {
  expect(strayIn(ROOT, ["--remove", "tools/lib/tracking/akasha-day.ts"]).length).toBe(1)
})

test("a value belonging to another flag is not read as a path", () => {
  expect(strayIn(ROOT, ["--message", "--file-path", "--file-path", AT])).toEqual([])
})

test("the glass is no flag this takes", () => {
  const said = tracking(["--file-path", AT, "--break-the-glass", "because"], givenIn())
  expect(said.refusals).toEqual([NO_GLASS])
  expect(said.code).toBe(1)
})

test("a stray path is refused before anything is composed", () => {
  const said = tracking(["--file-path", "akasha/alan/alan.person.ts"], givenIn())
  expect(said.refusals).toEqual([outsideTracked("akasha/alan/alan.person.ts")])
})
