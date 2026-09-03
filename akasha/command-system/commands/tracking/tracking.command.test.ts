import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import {
  DAYS_AT,
  FOOD_ENTRIES_AT,
  NO_GLASS,
  outsideTracked,
  strayIn,
  tracking,
} from "./tracking.command.code.ts"

const ROOT = "/nowhere"

const AT = `${DAYS_AT}2026-09-01/wake-day-2026-09-01.wake-day.ts`

const FOOD_AT = `${FOOD_ENTRIES_AT}2026-08-22-banana/food-entry-2026-08-22-banana.food-entry.ts`

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha tracking", from: ROOT, writer: null, agentId: null }
}

test("a path under the tracked days is no stray", () => {
  expect(strayIn(ROOT, ["--file-path", AT, "--content-file", "held"])).toEqual([])
})

test("a path under the food entries is no stray", () => {
  expect(strayIn(ROOT, ["--file-path", FOOD_AT, "--content-file", "held"])).toEqual([])
})

test("a path elsewhere under akasha is a stray", () => {
  const said = strayIn(ROOT, [
    "--file-path",
    "akasha/command-system/commands/write/write.command.ts",
  ])
  expect(said).toEqual([outsideTracked("akasha/command-system/commands/write/write.command.ts")])
})

test("a path beside the food entries rather than under them is a stray", () => {
  expect(
    strayIn(ROOT, ["--file-path", "akasha/alan/tracking/food-entries/food-entry.page-type.ts"])
      .length
  ).toBe(1)
})

test("a path outside akasha altogether is a stray", () => {
  expect(strayIn(ROOT, ["--remove", "tools/lib/tracking/akasha-day.ts"]).length).toBe(1)
})

test("a value belonging to another flag is not read as a path", () => {
  expect(strayIn(ROOT, ["--message", "--file-path", "--file-path", AT])).toEqual([])
})

test("the refusal names every tree this lands under", () => {
  const said = outsideTracked("akasha/alan/alan.person.ts")
  expect(said).toContain(DAYS_AT)
  expect(said).toContain(FOOD_ENTRIES_AT)
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
