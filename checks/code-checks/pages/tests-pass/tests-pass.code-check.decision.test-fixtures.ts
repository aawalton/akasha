import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Ran, Spent } from "akasha/code/code-tests/code-tests.module.code.ts"
import { RUNNING } from "akasha/code/code-tests/code-tests.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  noPathsFiled,
  pathFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const THROWS = 'throw new Error("this file does not load")\n'

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

export const TREE = "akasha"

export const TYPE_WAS = `${TREE}/text-property.page-type.ts`

export const TYPE_NOW = `${TREE}/types/text-property.page-type.ts`

const INDEXES = Bun.resolveSync(
  "akasha/pages/indexes/reading/index-reading.module.code.ts",
  import.meta.dir
)

export const RESOLVES =
  'import { expect, test } from "bun:test"\n' +
  `import { listedAt } from ${JSON.stringify(INDEXES)}\n` +
  'test("one", () => {\n' +
  '  const found = listedAt(process.cwd(), "page-type", "text-property")\n' +
  `  expect(found.map((one) => one.path)).toEqual([${JSON.stringify(TYPE_NOW)}])\n` +
  "})\n"

export const SORTED_AT = "utils/narrow/sorted-once/sorted-once.module.test.ts"

export const COUNTED_AT = "utils/text/counted/counted.module.test.ts"

export const AUTHORED_ONE_FAILED = `bun test v1.3.14 (0d9b296a)
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

export const AUTHORED_TWO_FAILED = `bun test v1.3.14 (0d9b296a)
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

export const AUTHORED_CHATTY_PASSED = `bun test v1.3.14 (0d9b296a)
utils/narrow/sorted-once/sorted-once.module.test.ts:
[test] bind to port 4321 hit EADDRINUSE; retrying
[test] bind to port 4321 failed after 100ms — giving up
.........
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
...
12 pass
1 fail
13 expect() calls
Ran 13 tests across 2 files. [31.00ms]
`

export const AUTHORED_CHATTY_CLEAN = `bun test v1.3.14 (0d9b296a)
utils/narrow/sorted-once/sorted-once.module.test.ts:
[test] bind to port 4321 hit EADDRINUSE; retrying
.........
utils/text/counted/counted.module.test.ts:
[forward-test] upstream-idle-timeout acct /v1/messages idleMs=5000
....
13 pass
0 fail
13 expect() calls
Ran 13 tests across 2 files. [31.00ms]
`

export const AUTHORED_LOGGED_ERROR = `bun test v1.3.14 (0d9b296a)
utils/narrow/sorted-once/sorted-once.module.test.ts:
16 |   } catch (held) {
17 |     console.error(held)
                   ^
error: refused
      at <anonymous> (utils/narrow/sorted-once/sorted-once.module.test.ts:17:5)
.....
utils/text/counted/counted.module.test.ts:
4 | test("a count of one is said with the singular", () => {
5 |   expect(counted(1, "file")).toBe("1 fileish")
                                 ^
error: expect(received).toBe(expected)
Expected: "1 fileish"
Received: "1 file"
      at <anonymous> (utils/text/counted/counted.module.test.ts:5:30)
(fail) a count of one is said with the singular [0.12ms]
...
12 pass
1 fail
13 expect() calls
Ran 13 tests across 2 files. [31.00ms]
`

export const CAPTURED_FOREIGN_HEADER = `bun test v1.3.14 (0d9b296a)
utils/narrow/sorted-once/sorted-once.module.test.ts:
..
../../akasha-serving-fxYI8e/0.test.ts:
error: expect(received).toBe(expected)
Expected: "-1.5"
Received: ""
      at <anonymous> (utils/narrow/sorted-once/sorted-once.module.test.ts:91:28)
(fail) a level below zero and between whole numbers crosses the relay whole [1.81ms]
.
9 pass
1 fail
62 expect() calls
Ran 10 tests across 1 file. [242.00ms]
`

export const AUTHORED_ERRORED = `bun test v1.3.14 (0d9b296a)
utils/narrow/sorted-once/sorted-once.module.test.ts:
# Unhandled error between tests
-------------------------------
5 |   queueMicrotask(() => {
6 |     throw new Error("after the test ended")
                  ^
error: after the test ended
      at <anonymous> (utils/narrow/sorted-once/sorted-once.module.test.ts:6:11)
-------------------------------
.....
5 pass
0 fail
1 error
5 expect() calls
Ran 5 tests across 1 file. [12.00ms]
`

export function ranAs(
  verdict: Ran["verdict"],
  summary: Ran["summary"],
  output = "",
  slow: Ran["slow"] = [],
  cpuSeconds = 0
): Ran {
  return { code: 1, signal: null, output, summary, verdict, cpuSeconds, slow, spent: [] }
}

export function spentAs(path: string, cpuSeconds: number, code: number): Spent {
  return {
    path,
    ranAt: "2026-09-11T00:00:00.000Z",
    wallMs: 0,
    cpuSeconds,
    peakBytes: 0,
    signal: null,
    code,
    out: "",
  }
}

export function withGuard<T>(run: () => T): T {
  const held = process.env[RUNNING]
  process.env[RUNNING] = "1"
  try {
    return run()
  } finally {
    if (held === undefined) delete process.env[RUNNING]
    else process.env[RUNNING] = held
  }
}

export function withoutGuard<T>(run: () => T): T {
  const held = process.env[RUNNING]
  delete process.env[RUNNING]
  try {
    return run()
  } finally {
    if (held !== undefined) process.env[RUNNING] = held
  }
}
