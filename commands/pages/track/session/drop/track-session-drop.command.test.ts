import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import type { Given } from "../../../../../command-system/calling/calling.module.code.ts"
import { baseOf } from "../../../../../command-system/landing/landing.module.code.ts"
import { scratch } from "../../../../../command-system/landing/landing.module.test-fixtures.ts"
import { MECHANICAL } from "../../../../modules/asking/asking.module.code.ts"
import {
  DAY,
  dayRepo,
  ROWS_AT,
  SLEPT,
} from "../../../../modules/session-rows/session-rows.module.test-fixtures.ts"
import { trackSessionDrop } from "./track-session-drop.command.code.ts"

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
