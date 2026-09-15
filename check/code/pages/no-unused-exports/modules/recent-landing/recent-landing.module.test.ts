import { afterAll, expect, test } from "bun:test"
import { sparingLately } from "akasha/check/code/pages/no-unused-exports/modules/recent-landing/recent-landing.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AT = "held.ts"

const ELSE = "spare.ts"

const A_DAY = 86_400_000

const TWO_DAYS = 2 * A_DAY

const REASON = "exports `held`, which nothing names"

const FOUND: readonly Judged[] = [{ path: AT, reason: REASON }]

const NOTHING: readonly Judged[] = []

function landed(): string {
  const root = scratch.rootFor("akasha-recent-landing-")
  writing(root, AT, "export const held = 1\n")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "held"])
  return root
}

test("a refusal over a path last committed inside the day is dropped", () => {
  expect(sparingLately(landed(), FOUND, Date.now())).toEqual([])
})

test("a refusal over a path last committed before the day is kept", () => {
  expect(sparingLately(landed(), FOUND, Date.now() + TWO_DAYS)).toEqual([...FOUND])
})

test("a refusal over a path no commit holds at all is dropped", () => {
  const root = landed()
  writing(root, ELSE, "export const spare = 2\n")

  expect(sparingLately(root, [{ path: ELSE, reason: REASON }], Date.now() + TWO_DAYS)).toEqual([])
})

test("a tree git answers nothing for keeps every refusal", () => {
  const root = scratch.rootFor("akasha-recent-landing-bare-")

  expect(sparingLately(root, FOUND, Date.now())).toEqual([...FOUND])
})

test("a run holding no refusal asks git nothing", () => {
  expect(sparingLately(scratch.rootFor("akasha-recent-landing-none-"), NOTHING, Date.now())).toBe(
    NOTHING
  )
})
