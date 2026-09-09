import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  askedFor,
  DAYS_AT,
  FOOD_ENTRIES_AT,
  outsideTracked,
} from "../../../../alan/track/landing/track-landing.module.code.ts"
import { MECHANICAL } from "../../../modules/asking/asking.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { builtIn } from "../../../modules/file-arguing/file-arguing.module.code.ts"
import { scratch } from "../../../modules/landing/landing.module.test-fixtures.ts"
import { inputIn } from "../../../modules/piping/piping.module.code.ts"
import { alanTracking, NO_GLASS, strayIn } from "./alan-tracking.command.code.ts"

const ROOT = "/nowhere"

const AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.ts`

const ROWS_AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.sessions.jsonl`

const FOOD_AT = `${FOOD_ENTRIES_AT}2026-08-22-banana/food-entry-2026-08-22-banana.food-entry.ts`

const ADDS = "change-mechanical/add-file-of-any-kind"

const DAY = "the day this call composed\n"

const ROW = '{"title":"Slept","startTime":"2026-09-01T12:00:00.000Z"}\n'

const BANANA = "one banana\n"

afterAll(scratch.sweep)

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha alan tracking", from: ROOT, writer: null, agentId: null }
}

function servingIn(root: string): Given {
  return { ...givenIn(), root, from: root, changeKind: MECHANICAL }
}

function bodyAt(root: string, named: string, body: string): string {
  const at = join(root, named)
  writeFileSync(at, body)
  return at
}

test("a path under the tracked days is no stray", () => {
  expect(strayIn(ROOT, ["--file-path", AT, "--content-file", "held"])).toEqual([])
})

test("a path under the food entries is no stray", () => {
  expect(strayIn(ROOT, ["--file-path", FOOD_AT, "--content-file", "held"])).toEqual([])
})

test("a path elsewhere under akasha is a stray", () => {
  const at = "commands/pages/alan/tracking/alan-tracking.command.ts"
  const said = strayIn(ROOT, ["--file-path", at])
  expect(said).toEqual([outsideTracked(at)])
})

test("a path beside the food entries rather than under them is a stray", () => {
  expect(
    strayIn(ROOT, ["--file-path", "akasha/alan/track/food-entries/food-entry.page-type.ts"]).length
  ).toBe(1)
})

test("a path outside akasha altogether is a stray", () => {
  expect(
    strayIn(ROOT, ["--remove", "akasha/alan/track/daily/akasha-day/akasha-day.module.code.ts"])
      .length
  ).toBe(1)
})

test("a value belonging to another flag is not read as a path", () => {
  expect(strayIn(ROOT, ["--message", "--file-path", "--file-path", AT])).toEqual([])
})

test("the glass is no flag this takes", async () => {
  const said = await alanTracking(["--file-path", AT, "--break-the-glass", "because"], givenIn())
  expect(said.refusals).toEqual([NO_GLASS])
  expect(said.code).toBe(1)
})

test("a stray path is refused before anything is composed", async () => {
  const said = await alanTracking(["--file-path", "akasha/alan/alan.person.ts"], givenIn())
  expect(said.refusals).toEqual([outsideTracked("akasha/alan/alan.person.ts")])
})

test("a day and the rows beside it are named as the change adding a file, with the message said", () => {
  const root = scratch.rootFor("akasha-tracking-")
  const built = builtIn(
    [
      "--file-path",
      AT,
      "--content-file",
      bodyAt(root, "day.txt", DAY),
      "--file-path",
      ROWS_AT,
      "--content-file",
      bodyAt(root, "rows.txt", ROW),
      "--message",
      "held",
    ],
    servingIn(root),
    inputIn
  )
  if ("code" in built) throw new Error(built.refusals.join("\n"))
  expect(built.message).toBe("held")
  expect(askedFor(built.changes)).toEqual({
    asked: [
      { at: ADDS, given: { at: AT, body: DAY } },
      { at: ADDS, given: { at: ROWS_AT, body: ROW } },
    ],
  })
})

test("a food entry is named as the change adding a file at its path", () => {
  const root = scratch.rootFor("akasha-tracking-")
  const built = builtIn(
    [
      "--file-path",
      FOOD_AT,
      "--content-file",
      bodyAt(root, "food.txt", BANANA),
      "--message",
      "ate",
    ],
    servingIn(root),
    inputIn
  )
  if ("code" in built) throw new Error(built.refusals.join("\n"))
  expect(built.message).toBe("ate")
  expect(askedFor(built.changes)).toEqual({
    asked: [{ at: ADDS, given: { at: FOOD_AT, body: BANANA } }],
  })
})
