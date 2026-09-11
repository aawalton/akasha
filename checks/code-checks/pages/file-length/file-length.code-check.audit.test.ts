import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, symlinkSync } from "node:fs"
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

const LINK = "linked.module.code.ts"

const HELD_AT = "held"

const GONE = "gone.lock"

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

test("an audit measures a link by the body that link opens", () => {
  const root = letOff()
  writing(root, LOCKFILE, OVER)
  symlinkSync(LOCKFILE, join(root, LINK))
  expect(fileLength(treed(root)).map((one) => one.path)).toEqual([LINK])
})

test("an audit lets off a link whose body is under the ceiling the link is held to", () => {
  const root = letOff()
  writing(root, LOCKFILE, AT)
  symlinkSync(LOCKFILE, join(root, LINK))
  expect(fileLength(treed(root))).toEqual([])
})

test("an audit has no length to judge for a link opening onto nothing", () => {
  const root = letOff()
  symlinkSync(GONE, join(root, LINK))
  expect(fileLength(treed(root))).toEqual([])
})

test("an audit has no length to judge for a link opening onto a folder", () => {
  const root = letOff()
  mkdirSync(join(root, HELD_AT))
  symlinkSync(HELD_AT, join(root, LINK))
  expect(fileLength(treed(root))).toEqual([])
})

test("an audit refuses the run where a link opens onto itself", () => {
  const root = letOff()
  symlinkSync(LINK, join(root, LINK))
  expect(() => fileLength(treed(root))).toThrow("ELOOP")
})
