import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { fileLength } from "akasha/checks/code-checks/pages/file-length/file-length.code-check.audit.code.ts"
import { CEILING } from "akasha/checks/code-checks/pages/file-length/file-length.code-check.decision.code.ts"
import {
  ELSEWHERE,
  LOCKFILE,
  letOff,
  scratch,
} from "akasha/checks/code-checks/pages/file-length/file-length.code-check.decision.test-fixtures.ts"
import { treed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"

const STRAY = "akasha/stray.ts"

const OVER = "a".repeat(CEILING + 1)

const AT = "a".repeat(CEILING)

afterAll(scratch.sweep)

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

test("an audit refuses the run where a file it listed left the tree before it was measured", () => {
  const root = letOff()
  writing(root, STRAY, OVER)
  treed(root)
  rmSync(join(root, STRAY))
  expect(() => fileLength(root)).toThrow(STRAY)
})
