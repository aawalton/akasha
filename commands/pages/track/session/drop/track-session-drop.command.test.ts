import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { MECHANICAL } from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import { baseOf } from "akasha/commands/modules/landing/landing.module.code.ts"
import { scratch } from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"
import {
  DAY,
  dayRepo,
  ROWS_AT,
  SLEPT,
} from "akasha/commands/pages/track/session/check/session-rows/session-rows.module.test-fixtures.ts"
import { trackSessionDrop } from "akasha/commands/pages/track/session/drop/track-session-drop.command.code.ts"
import { said as git } from "akasha/git/running/git-running.module.code.ts"

afterAll(scratch.sweep)

function servingIn(root: string): Given {
  return {
    root,
    calledAs: "akasha track session drop",
    from: root,
    writer: null,
    agentId: null,
    changeKind: MECHANICAL,
  }
}

test("a stretch dropped lands the day's rows under no agent id and no reading", async () => {
  const root = dayRepo()
  const was = baseOf(root)
  const said = await trackSessionDrop(["--day", DAY, "--id", SLEPT], servingIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, ROWS_AT), "utf8")).toBe("\n")
  expect(baseOf(root)).not.toBe(was)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe(`Drop Slept on ${DAY}`)
})
