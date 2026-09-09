import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { MECHANICAL } from "../../../../modules/asking/asking.module.code.ts"
import type { Given } from "../../../../modules/calling/calling.module.code.ts"
import { baseOf } from "../../../../modules/landing/landing.module.code.ts"
import { scratch } from "../../../../modules/landing/landing.module.test-fixtures.ts"
import { DAY, dayRepo, ROWS_AT } from "../check/session-rows/session-rows.module.test-fixtures.ts"
import { trackSessionLog } from "./track-session-log.command.code.ts"

afterAll(scratch.sweep)

function servingIn(root: string): Given {
  return {
    root,
    calledAs: "akasha track session log",
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
