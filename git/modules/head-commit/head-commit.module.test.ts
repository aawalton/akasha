import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { headAt, headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"

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

test("the commit at HEAD read off git's files is the commit git answers", () => {
  const root = repoAt()
  expect(headAt(root)).toBe(headOf(root))
  writing(root, ONE, "b\n")
  gitSaid(root, [...WHO, "commit", "-q", "-m", "moved", "--", ONE])
  expect(headAt(root)).toBe(headOf(root))
  gitSaid(root, ["pack-refs", "--all"])
  expect(headAt(root)).toBe(headOf(root))
  gitSaid(root, ["checkout", "-q", "--detach"])
  expect(headAt(root)).toBe(headOf(root))
})
