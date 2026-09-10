import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { RUNNING } from "akasha/code-system/code-tests/code-tests.module.code.ts"
import {
  noPathsFiled,
  pathFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const HOLDS = "export const held = 1\n"

export const BREAKS = "export const held = 2\n"

export const READS =
  'import { expect, test } from "bun:test"\n' +
  'import { held } from "./one.module.code.ts"\n' +
  'test("one", () => { expect(held).toBe(1) })\n'

export const CODE_AT = "akasha/one.module.code.ts"

export const TEST_AT = "akasha/one.module.test.ts"

const HELD_ID = "01a05fd0-1c4a-7000-8f3b-6a1d4e2c9b70"

export const scratch = scratchWorld()

export function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("tests-pass-"))
  noPathsFiled(root)
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
    pathFiled(root, name, [{ path: name, id: HELD_ID }])
  }
  return root
}

export function tracked(files: Record<string, string>): string {
  const root = repo(files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export const SORTED_AT = "utils/narrow/sorted-once/sorted-once.module.test.ts"

export const COUNTED_AT = "utils/text/counted/counted.module.test.ts"

export const RAN_ONE_FAILED = `bun test v1.3.14 (0d9b296a)
...
utils/text/counted/counted.module.test.ts:
1 | import { expect, test } from "bun:test"
2 | import { counted } from "./counted.module.code.ts"
3 | 
4 | test("a count of one is said with the singular", () => {
5 |   expect(counted(1, "file")).toBe("1 fileish")
                                 ^
error: expect(received).toBe(expected)
Expected: "1 fileish"
Received: "1 file"
      at <anonymous> (utils/text/counted/counted.module.test.ts:5:30)
(fail) a count of one is said with the singular [0.12ms]
....
7 pass
1 fail
8 expect() calls
Ran 8 tests across 2 files. [27.00ms]
`

export const RAN_TWO_FAILED = `bun test v1.3.14 (0d9b296a)
utils/narrow/sorted-once/sorted-once.module.test.ts:
# Unhandled error between tests
-------------------------------
1 | import { expect, test } from "bun:test"
2 | import { sortedOnce } from "./sorted-once.module.code.ts"
3 | 
4 | if (sortedOnce.length > -1) throw new Error("this file will not load")
                                          ^
error: this file will not load
      at utils/narrow/sorted-once/sorted-once.module.test.ts:4:39
-------------------------------
utils/text/counted/counted.module.test.ts:
1 | import { expect, test } from "bun:test"
2 | import { counted } from "./counted.module.code.ts"
3 | 
4 | test("a count of one is said with the singular", () => {
5 |   expect(counted(1, "file")).toBe("1 fileish")
                                 ^
error: expect(received).toBe(expected)
Expected: "1 fileish"
Received: "1 file"
      at <anonymous> (utils/text/counted/counted.module.test.ts:5:30)
(fail) a count of one is said with the singular [0.10ms]
4 | test("a count of one is said with the singular", () => {
5 |   expect(counted(1, "file")).toBe("1 fileish")
6 | })
7 | 
8 | test("every other count is said with the plural", () => {
9 |   expect(counted(2, "file")).toBe("2 filesish")
                                 ^
error: expect(received).toBe(expected)
Expected: "2 filesish"
Received: "2 files"
      at <anonymous> (utils/text/counted/counted.module.test.ts:9:30)
(fail) every other count is said with the plural [0.03ms]
...
3 pass
3 fail
1 error
5 expect() calls
Ran 6 tests across 2 files. [26.00ms]
`

export function withoutGuard<T>(run: () => T): T {
  const held = process.env[RUNNING]
  delete process.env[RUNNING]
  try {
    return run()
  } finally {
    if (held !== undefined) process.env[RUNNING] = held
  }
}
