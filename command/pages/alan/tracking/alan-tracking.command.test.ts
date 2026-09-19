import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  askedFor,
  DAYS_AT,
  FOOD_ENTRIES_AT,
  outsideTracked,
} from "akasha/alan/track/modules/landing/track-landing.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { MECHANICAL } from "akasha/command/modules/calling/calling.module.test-fixtures.ts"
import { builtIn } from "akasha/command/modules/file-arguing/file-arguing.module.code.ts"
import { scratch } from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import {
  alanTracking,
  strayIn,
  type Taken,
  trackedBy,
} from "akasha/command/pages/alan/tracking/alan-tracking.command.code.ts"
import {
  BESIDE_FOOD_ENTRIES,
  OUTSIDE_AKASHA,
  STRAY_PAGE,
} from "akasha/command/pages/alan/tracking/alan-tracking.command.test-fixtures.ts"

const ROOT = "/nowhere"

const AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.ts`

const ROWS_AT = `${DAYS_AT}2026-09-01/day-2026-09-01.day.sessions.jsonl`

const FOOD_AT = `${FOOD_ENTRIES_AT}2026-08-22-banana/food-entry-2026-08-22-banana.food-entry.ts`

const ADDS = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const DAY = "the day this call composed\n"

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
  expect(strayIn(ROOT, { filePath: AT, contentFile: "held", removePath: [] })).toEqual([])
})

test("a path under the food entries is no stray", () => {
  expect(strayIn(ROOT, { filePath: FOOD_AT, contentFile: "held", removePath: [] })).toEqual([])
})

test("a path elsewhere under akasha is a stray", () => {
  const at = "command/thrumming/thrum-tracking.command.ts"
  const said = strayIn(ROOT, { filePath: at, removePath: [] })
  expect(said).toEqual([outsideTracked(at)])
})

test("a path beside the food entries rather than under them is a stray", () => {
  expect(strayIn(ROOT, { filePath: BESIDE_FOOD_ENTRIES, removePath: [] }).length).toBe(1)
})

test("a path outside akasha altogether is a stray", () => {
  expect(strayIn(ROOT, { removePath: [OUTSIDE_AKASHA] }).length).toBe(1)
})

test("a flag where a value belongs is refused rather than read as that value", async () => {
  const said = await alanTracking(["--message", "--file-path", AT], givenIn())
  expect(said.refusals).toEqual(["`--message` takes a value, and none follows it"])
})

test("the glass is answered as a flag this takes no spelling of", async () => {
  const said = await alanTracking(["--file-path", AT, "--break-the-glass"], givenIn())
  expect(said.refusals[0] ?? "").toContain("`--break-the-glass` is no argument")
  expect(said.code).toBe(1)
})

test("the flags a stray flag is answered with name no flag this refuses", async () => {
  const said = await alanTracking(["--nope"], givenIn())
  expect(said.refusals[0] ?? "").toBe(
    "`--nope` is no argument `akasha alan tracking` takes — it takes `--message`, " +
      "`--message-file`, `--content-file`, `--file-path`, `--remove`"
  )
})

test("the restated flag is answered as a flag this takes no spelling of", async () => {
  const said = await alanTracking(["--restated"], givenIn())
  expect(said.refusals[0] ?? "").toContain("`--restated` is no argument")
  expect(said.code).toBe(1)
})

test("a stray path is refused before anything is composed", async () => {
  const said = await alanTracking(["--file-path", STRAY_PAGE], givenIn())
  expect(said.refusals).toEqual([outsideTracked(STRAY_PAGE)])
})

test("a day is named as the change adding a file, with the message said", () => {
  const root = scratch.rootFor("akasha-tracking-")
  const built = builtIn(
    ["--file-path", AT, "--content-file", bodyAt(root, "day.txt", DAY), "--message", "held"],
    servingIn(root),
    inputIn,
    MECHANICAL
  )
  if ("code" in built) throw new Error(built.refusals.join("\n"))
  expect(built.message).toBe("held")
  expect(askedFor(built.changes)).toEqual([{ at: ADDS, given: { at: AT, body: DAY } }])
})

test("a second file path is refused, and the refusal says one call says it once", async () => {
  const said = await alanTracking(["--file-path", AT, "--file-path", ROWS_AT], givenIn())
  expect(said.refusals).toEqual(["`--file-path` is said twice, and one call says it once"])
  expect(said.code).toBe(1)
})

test("a second content file is refused the same way", async () => {
  const said = await alanTracking(
    ["--file-path", AT, "--content-file", "day.txt", "--content-file", "rows.txt"],
    givenIn()
  )
  expect(said.refusals).toEqual(["`--content-file` is said twice, and one call says it once"])
})

const WENT_WRONG = new Error("the commit was written and the push went wrong")

function takenIn(root: string): Taken {
  return {
    filePath: AT,
    contentFile: bodyAt(root, "threw.txt", DAY),
    commitMessage: "held",
    removePath: [],
  }
}

test("a run that landed the commit and then threw says that commit in its refusal", async () => {
  const root = scratch.rootFor("akasha-tracking-")
  const asking = takenIn(root)
  const said = await trackedBy(asking, servingIn(root), throwingAfter(["abc123"], WENT_WRONG))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it landed anything says the fault by itself", async () => {
  const root = scratch.rootFor("akasha-tracking-")
  const asking = takenIn(root)
  const said = await trackedBy(asking, servingIn(root), throwingAfter([], WENT_WRONG))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the commit was written and the push went wrong")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names each write in the order it happened", async () => {
  const root = scratch.rootFor("akasha-tracking-")
  const wrote = [`landed ${AT}`, "abc123"]
  const said = await trackedBy(takenIn(root), servingIn(root), throwingAfter(wrote, WENT_WRONG))

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
