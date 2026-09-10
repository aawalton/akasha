import { afterAll, expect, test } from "bun:test"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "../../../../git/running/git-running.module.code.ts"
import { fileLength } from "./file-length.code-check.audit.code.ts"
import { CEILING } from "./file-length.code-check.decision.code.ts"
import {
  ELSEWHERE,
  LOCKFILE,
  letOff,
  scratch,
} from "./file-length.code-check.decision.test-fixtures.ts"

const STRAY = "akasha/stray.ts"

const OVER = "a".repeat(CEILING + 1)

const AT = "a".repeat(CEILING)

afterAll(scratch.sweep)

function treed(root: string): string {
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

test("an audit judges every file git tracks by the size that file is on disk", () => {
  const root = letOff()
  writing(root, STRAY, OVER)
  writing(root, "akasha/held.module.code.ts", AT)
  expect(fileLength(treed(root)).map((one) => one.path)).toEqual([STRAY])
})

test("an audit lets off the file the property beside its page lets off", () => {
  const root = letOff()
  writing(root, LOCKFILE, OVER)
  expect(fileLength(treed(root))).toEqual([])
})

test("an audit holds a file of that name in another folder to the ceiling", () => {
  const root = letOff()
  writing(root, ELSEWHERE, OVER)
  expect(fileLength(treed(root)).map((one) => one.path)).toEqual([ELSEWHERE])
})
