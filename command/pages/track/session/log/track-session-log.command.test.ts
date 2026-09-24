import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { scratch } from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import {
  DAY,
  dayRepo,
  ROWS_AT,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.test-fixtures.ts"
import { trackSessionLog } from "akasha/command/pages/track/session/log/track-session-log.command.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { z } from "zod"

const TITLED = z.looseObject({ title: z.string() })

afterAll(scratch.sweep)

function servingIn(root: string): Given {
  return {
    root,
    calledAs: "akasha track session log",
    from: root,
    writer: null,
    agentId: null,
  }
}

function titlesIn(root: string): readonly string[] {
  return readFileSync(join(root, ROWS_AT), "utf8")
    .trim()
    .split("\n")
    .map((one) => TITLED.parse(JSON.parse(one)).title)
}

test("a stretch logged lands the day's rows under no agent id and no reading", async () => {
  const root = dayRepo()
  const was = baseOf(root)
  const said = await trackSessionLog(
    ["--day", DAY, "--title", "Held", "--start", "15:00", "--end", "16:00"],
    servingIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(titlesIn(root)).toEqual(["Slept", "Held"])
  expect(baseOf(root)).not.toBe(was)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe(`Log Held on ${DAY}`)
})
