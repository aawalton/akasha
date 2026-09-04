import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { MECHANICAL } from "../../command-system/asking/asking.module.code.ts"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { baseOf } from "../../command-system/landing/landing.module.code.ts"
import { repoWith, scratch } from "../../command-system/landing/landing.module.test-fixtures.ts"
import {
  ACTIVITIES_AT,
  DAYS_AT,
  RELATIONSHIPS_AT,
} from "./session-rows/session-rows.module.code.ts"
import { track } from "./track.command.code.ts"

const DAY = "2026-09-01"

const NAMED = `${DAYS_AT}/${DAY}/wake-day-${DAY}.wake-day`

const PAGE_AT = `${NAMED}.ts`

const ROWS_AT = `${NAMED}.sessions.jsonl`

const PAGE_ID = "01a06818-339b-7fc2-8cd9-caea195150b2"

const PAGE = `export const held = { id: "${PAGE_ID}" }\n`

const SLEPT = "01a06818-339b-7fc2-8cd9-caea195150b3"

const ROW = `{"id":"${SLEPT}","title":"Slept","startTime":"2026-09-01T06:00:00.000Z","dailyTracking":"${PAGE_ID}","endTime":"2026-09-01T14:00:00.000Z"}\n`

afterAll(scratch.sweep)

function dayRepo(): string {
  const root = repoWith({ [PAGE_AT]: PAGE, [ROWS_AT]: ROW })
  for (const one of [ACTIVITIES_AT, RELATIONSHIPS_AT]) {
    mkdirSync(join(root, one), { recursive: true })
  }
  return root
}

function servingIn(root: string): Given {
  return {
    root,
    calledAs: "akasha track",
    from: root,
    writer: null,
    agentId: null,
    changeKind: MECHANICAL,
  }
}

function titlesIn(root: string): readonly string[] {
  return readFileSync(join(root, ROWS_AT), "utf8")
    .trim()
    .split("\n")
    .map((one) => (JSON.parse(one) as { title: string }).title)
}

test("a stretch logged lands the day's rows under no agent id and no reading", async () => {
  const root = dayRepo()
  const was = baseOf(root)
  const said = await track(
    ["session", "log", "--day", DAY, "--title", "Held", "--start", "15:00", "--end", "16:00"],
    servingIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(titlesIn(root)).toEqual(["Slept", "Held"])
  expect(baseOf(root)).not.toBe(was)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe(`Log Held on ${DAY}`)
})

test("a stretch dropped lands the day's rows under no agent id and no reading", async () => {
  const root = dayRepo()
  const was = baseOf(root)
  const said = await track(["session", "drop", "--day", DAY, "--id", SLEPT], servingIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, ROWS_AT), "utf8")).toBe("\n")
  expect(baseOf(root)).not.toBe(was)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe(`Drop Slept on ${DAY}`)
})
