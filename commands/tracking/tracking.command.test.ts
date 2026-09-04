import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { MECHANICAL } from "../../command-system/asking/asking.module.code.ts"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { baseOf } from "../../command-system/landing/landing.module.code.ts"
import { repoWith, scratch } from "../../command-system/landing/landing.module.test-fixtures.ts"
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

const ROWS_AT = `${DAYS_AT}2026-09-01/wake-day-2026-09-01.wake-day.sessions.jsonl`

const FOOD_AT = `${FOOD_ENTRIES_AT}2026-08-22-banana/food-entry-2026-08-22-banana.food-entry.ts`

const BEFORE = "the day before this call\n"

const DAY = "the day this call composed\n"

const ROW = '{"title":"Slept","startTime":"2026-09-01T12:00:00.000Z"}\n'

const BANANA = "one banana\n"

afterAll(scratch.sweep)

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha tracking", from: ROOT, writer: null, agentId: null }
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
  expect(
    strayIn(ROOT, ["--remove", "akasha/alan/tracking/daily/akasha-day/akasha-day.module.code.ts"])
      .length
  ).toBe(1)
})

test("a value belonging to another flag is not read as a path", () => {
  expect(strayIn(ROOT, ["--message", "--file-path", "--file-path", AT])).toEqual([])
})

test("the refusal names every tree this lands under", () => {
  const said = outsideTracked("akasha/alan/alan.person.ts")
  expect(said).toContain(DAYS_AT)
  expect(said).toContain(FOOD_ENTRIES_AT)
})

test("the glass is no flag this takes", async () => {
  const said = await tracking(["--file-path", AT, "--break-the-glass", "because"], givenIn())
  expect(said.refusals).toEqual([NO_GLASS])
  expect(said.code).toBe(1)
})

test("a stray path is refused before anything is composed", async () => {
  const said = await tracking(["--file-path", "akasha/alan/alan.person.ts"], givenIn())
  expect(said.refusals).toEqual([outsideTracked("akasha/alan/alan.person.ts")])
})

test("a day and the rows beside it land in one commit under no agent id and no reading", async () => {
  const root = repoWith({ [AT]: BEFORE })
  const was = baseOf(root)
  const said = await tracking(
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
    servingIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, AT), "utf8")).toBe(DAY)
  expect(readFileSync(join(root, ROWS_AT), "utf8")).toBe(ROW)
  expect(baseOf(root)).not.toBe(was)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held")
})

test("a food entry lands under no agent id and no reading", async () => {
  const root = repoWith({ [AT]: BEFORE })
  const was = baseOf(root)
  const said = await tracking(
    [
      "--file-path",
      FOOD_AT,
      "--content-file",
      bodyAt(root, "food.txt", BANANA),
      "--message",
      "ate",
    ],
    servingIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, FOOD_AT), "utf8")).toBe(BANANA)
  expect(baseOf(root)).not.toBe(was)
})
