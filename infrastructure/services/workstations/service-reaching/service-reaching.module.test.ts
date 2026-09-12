import { expect, test } from "bun:test"
import {
  filesRun,
  reachedBack,
  reachingIn,
  runUnder,
  underTree,
} from "akasha/infrastructure/services/workstations/service-reaching/service-reaching.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  importersIn,
  listedAt,
  readingIn,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const READING = readingIn(codeRoot())

const A_MODULE = "module"

const AS_CODE = "code"

const IN_TS = "ts"

const OUTSIDE = "node:fs"

const TREE = "/held/.git/trees/service-workstation"

function codeOf(slug: string): string {
  const page = listedAt(READING, A_MODULE, slug)[0]?.path
  const at = page === undefined ? null : besideAt(page, AS_CODE, IN_TS)
  if (at === null) throw new Error(`no \`${A_MODULE}\` slugged \`${slug}\` has code beside it`)
  return at
}

const LEAF = codeOf("fault-saying")

test("a run spelled under a tree names the paths of the repository that tree holds", () => {
  const run = `bun ${TREE}/one/two.module.code.ts ${TREE}/three.sh`

  expect(filesRun([run], TREE)).toEqual(["one/two.module.code.ts", "three.sh"])
  expect(underTree("held.ts", TREE)).toBe("held.ts")
  expect(underTree(`${TREE}/held.ts`, "")).toBe(`${TREE}/held.ts`)
  expect(runUnder("bun held.ts", "")).toBe("bun held.ts")
})

test("a run under no tree names the paths it spells against the checkout", () => {
  expect(filesRun(["bun one/two.module.code.ts"], "")).toEqual(["one/two.module.code.ts"])
  expect(filesRun([`bun ${TREE}/one/two.module.code.ts`], "")).toEqual([])
  expect(filesRun(["bun --hot -"], "")).toEqual([])
})

test("a page a run is handed is a file that run names", () => {
  const run = `bun ${TREE}/relay.module.code.ts one/each.readout.ts https://held.example`

  expect(filesRun([run], TREE)).toEqual(["one/each.readout.ts", "relay.module.code.ts"])
})

test("a file importing a file reached is reached, through as many imports as it takes", () => {
  const one = importersIn(READING, LEAF)
  const all = reachedBack(READING, [LEAF])

  expect(all.stopped).toBe(false)
  expect(all.files.has(LEAF)).toBe(true)
  expect(one.length).toBeGreaterThan(0)
  for (const at of one) expect(all.files.has(at)).toBe(true)
  expect(all.files.size).toBeGreaterThan(one.length + 1)
})

test("a file named twice is reached once", () => {
  expect(reachedBack(READING, [LEAF, LEAF]).files.size).toBe(
    reachedBack(READING, [LEAF]).files.size
  )
})

test("a file no file of this repository imports is reached by itself alone", () => {
  expect([...reachedBack(READING, [OUTSIDE]).files]).toEqual([OUTSIDE])
})

test("the reach stops at the ceiling it is handed and says that the reach stopped", () => {
  const short = reachedBack(READING, [LEAF], 5)

  expect(short.stopped).toBe(true)
  expect(short.files.size).toBeLessThan(reachedBack(READING, [LEAF]).files.size)
})

test("a root is turned into a reading of its index rather than read as one", () => {
  expect([...reachedBack(codeRoot(), [LEAF]).files].sort()).toEqual(
    [...reachedBack(READING, [LEAF]).files].sort()
  )
})

test("the file a service reaches is named, and one it reaches none is answered as none", () => {
  expect(reachingIn([LEAF], new Set([LEAF]))).toBe(LEAF)
  expect(reachingIn([LEAF], new Set())).toBe(null)
  expect(reachingIn([], new Set([LEAF]))).toBe(null)
})
