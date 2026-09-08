import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { REFUSES_CODE } from "@akasha/testing-system/minting"
import { NO_CHECKS } from "../asking/asking.module.code.ts"
import {
  checking,
  drafting,
  git,
  holds,
  mechanically,
  PROGRAM,
  PROPOSED,
  repoWith,
  scratch,
} from "../asking/asking.module.test-fixtures.ts"
import { landedMechanically } from "./mechanical-landing.module.code.ts"

afterAll(scratch.sweep)

test("a landing made by a program runs no check and writes nothing into the commit", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await landedMechanically(root, "akasha change apply", PROGRAM, "held")
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
  expect(git(root, ["log", "-1", "--pretty=%B"])).not.toContain("Checks-bypassed")
})

test("a landing made by a program is told apart from a glass that was broken", async () => {
  const root = repoWith()
  const said = await landedMechanically(root, "akasha change apply", PROGRAM, "held")
  expect(said.code).toBe(0)
  expect(said.report).toContain(`a \`change-mechanical\` change ${NO_CHECKS}`)
  expect(said.report.join("\n")).not.toContain("the glass was broken")
})

test("a mechanical change lands no authored draft the patch was already holding", async () => {
  const root = repoWith()
  expect((await drafting(root, [])).code).toBe(0)
  expect(await mechanically(root)).toBe(0)
  expect(holds(root, "akasha/two.ts")).toBe(false)
})
