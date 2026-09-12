import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import { headOf } from "akasha/git/head-commit/head-commit.module.code.ts"
import { said as gitSaid } from "akasha/git/running/git-running.module.code.ts"

const ONE = "akasha/one.page.ts"

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoAt(): string {
  const root = scratch.rootFor("head-commit-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  writing(root, ONE, "a\n")
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", ONE])
  return root
}

test("the commit at HEAD is read as the hash naming it", () => {
  expect(headOf(repoAt())).toMatch(/^[0-9a-f]{40}$/)
})
