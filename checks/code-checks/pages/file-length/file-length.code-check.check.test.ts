import { afterAll, expect, test } from "bun:test"
import { symlinkSync } from "node:fs"
import { join } from "node:path"
import { fileLength } from "akasha/checks/code-checks/pages/file-length/file-length.code-check.check.code.ts"
import { CEILING } from "akasha/checks/code-checks/pages/file-length/file-length.code-check.decision.code.ts"
import {
  ELSEWHERE,
  LOCKFILE,
  letOff,
  scratch,
  seeded,
} from "akasha/checks/code-checks/pages/file-length/file-length.code-check.decision.test-fixtures.ts"
import { onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const HELD = "akasha/held.ts"

const TARGET_NAME = "target.md"

const TARGET = `akasha/${TARGET_NAME}`

const LINK = "akasha/linked.module.code.ts"

const UNDER = "seat/pages/one-a1.workspace"

const DRAFT = `${UNDER}.patch.diff`

const NOTED = `${UNDER}.notes.diff`

afterAll(scratch.sweep)

test("the size judged is the bytes of the body the change carries", () => {
  const root = seeded({ fileName: LOCKFILE })
  writing(root, HELD, "é".repeat(CEILING))
  const both = onDisk(root)
  const change = { root, changed: [HELD], before: both, after: both }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([HELD])
})

test("a body that is not text is judged by its size the same as one that is", () => {
  const root = seeded({ fileName: LOCKFILE })
  const held = new Uint8Array(CEILING + 8).fill(0x61)
  held[0] = 0xff
  const change = { root, changed: [HELD], before: () => held, after: () => held }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([HELD])
})

test("the check lets off the file beside the page and refuses the one elsewhere", () => {
  const root = letOff()
  const over = "a".repeat(CEILING + 1)
  writing(root, LOCKFILE, over)
  writing(root, ELSEWHERE, over)
  const both = onDisk(root)
  const change = { root, changed: [LOCKFILE, ELSEWHERE], before: both, after: both }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([ELSEWHERE])
})

test("the check lets off the draft and refuses the file no property lets off", () => {
  const root = letOff()
  const over = "a".repeat(CEILING + 1)
  writing(root, DRAFT, over)
  writing(root, NOTED, over)
  const both = onDisk(root)
  const change = { root, changed: [DRAFT, NOTED], before: both, after: both }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([NOTED])
})

test("the check measures a link by the body that link opens", () => {
  const root = seeded({ fileName: LOCKFILE })
  writing(root, TARGET, "a".repeat(CEILING + 1))
  symlinkSync(TARGET_NAME, join(root, LINK))
  const both = onDisk(root)
  const change = { root, changed: [LINK], before: both, after: both }
  expect(fileLength(change, shadowAt(root)).map((one) => one.path)).toEqual([LINK])
})

test("the check has no length to judge for a link opening onto nothing", () => {
  const root = seeded({ fileName: LOCKFILE })
  writing(root, TARGET, "a".repeat(CEILING + 1))
  symlinkSync("gone.md", join(root, LINK))
  const both = onDisk(root)
  const change = { root, changed: [LINK], before: both, after: both }
  expect(fileLength(change, shadowAt(root))).toEqual([])
})
