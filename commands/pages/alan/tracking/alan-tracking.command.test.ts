import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  askedFor,
  DAYS_AT,
  FOOD_ENTRIES_AT,
  outsideTracked,
} from "akasha/alan/track/landing/track-landing.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { MECHANICAL } from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import { builtIn } from "akasha/commands/modules/file-arguing/file-arguing.module.code.ts"
import { scratch } from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import {
  alanTracking,
  NO_GLASS,
  strayIn,
  trackedBy,
} from "akasha/commands/pages/alan/tracking/alan-tracking.command.code.ts"
import {
  BESIDE_FOOD_ENTRIES,
  OUTSIDE_AKASHA,
  STRAY_PAGE,
} from "akasha/commands/pages/alan/tracking/alan-tracking.command.test-fixtures.ts"

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
  return { ...givenIn(), root, from: root }
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
  const at = "commands/thrumming/thrum-tracking.command.ts"
  const said = strayIn(ROOT, ["--file-path", at])
  expect(said).toEqual([outsideTracked(at)])
})

test("a path beside the food entries rather than under them is a stray", () => {
  expect(strayIn(ROOT, ["--file-path", BESIDE_FOOD_ENTRIES]).length).toBe(1)
})

test("a path outside akasha altogether is a stray", () => {
  expect(strayIn(ROOT, ["--remove", OUTSIDE_AKASHA]).length).toBe(1)
})

test("a value belonging to another flag is not read as a path", () => {
  expect(strayIn(ROOT, ["--message", "--file-path", "--file-path", AT])).toEqual([])
})

test("the glass is no flag this takes", async () => {
  const said = await alanTracking(["--file-path", AT, "--break-the-glass", "because"], givenIn())
  expect(said.refusals).toEqual([NO_GLASS])
  expect(said.code).toBe(1)
})

test("the flags a stray flag is answered with name no flag this refuses", async () => {
  const said = await alanTracking(["--nope"], givenIn())
  expect(said.refusals).toEqual([
    "`--nope` is no flag this takes. `akasha alan tracking` takes `--file-path`, " +
      "`--content-file`, `--remove`, `--message`, `--message-file`, `--restated`.",
  ])
})

test("the restated flag is admitted, which is what holds two of this page's gaps open", async () => {
  const said = await alanTracking(["--restated"], givenIn())
  expect(said.refusals).toEqual([
    "this call names no --file-path to write and no --remove to take away, so it asks for nothing",
  ])
})

test("a stray path is refused before anything is composed", async () => {
  const said = await alanTracking(["--file-path", STRAY_PAGE], givenIn())
  expect(said.refusals).toEqual([outsideTracked(STRAY_PAGE)])
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
    inputIn,
    MECHANICAL
  )
  if ("code" in built) throw new Error(built.refusals.join("\n"))
  expect(built.message).toBe("held")
  expect(askedFor(built.changes)).toEqual([
    { at: ADDS, given: { at: AT, body: DAY } },
    { at: ADDS, given: { at: ROWS_AT, body: ROW } },
  ])
})

const WENT_WRONG = new Error("the commit was written and the push went wrong")

function askingIn(root: string): readonly string[] {
  return ["--file-path", AT, "--content-file", bodyAt(root, "threw.txt", DAY), "--message", "held"]
}

test("a run that landed the commit and then threw says that commit in its refusal", async () => {
  const root = scratch.rootFor("akasha-tracking-")
  const asking = askingIn(root)
  const said = await trackedBy(asking, servingIn(root), throwingAfter(["abc123"], WENT_WRONG))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it landed anything says the fault by itself", async () => {
  const root = scratch.rootFor("akasha-tracking-")
  const asking = askingIn(root)
  const said = await trackedBy(asking, servingIn(root), throwingAfter([], WENT_WRONG))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the commit was written and the push went wrong")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names each write in the order it happened", async () => {
  const root = scratch.rootFor("akasha-tracking-")
  const wrote = [`landed ${AT}`, "abc123"]
  const said = await trackedBy(askingIn(root), servingIn(root), throwingAfter(wrote, WENT_WRONG))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: landed ${AT}; abc123. ` +
      "Nothing after that ran."
  )
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
    inputIn,
    MECHANICAL
  )
  if ("code" in built) throw new Error(built.refusals.join("\n"))
  expect(built.message).toBe("ate")
  expect(askedFor(built.changes)).toEqual([{ at: ADDS, given: { at: FOOD_AT, body: BANANA } }])
})
