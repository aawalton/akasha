import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "@akasha/changes/change-answer/types"
import { put } from "@akasha/testing-system/putting"
import { AGENT, repoWith, scratch } from "../asking/asking.module.test-fixtures.ts"
import type { Kind } from "../calling/calling.module.code.ts"
import { runningOf } from "../drafting/drafting.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { blobIdOf, readingIn, sameBody } from "../reading/reading.module.code.ts"
import { carryLanded, NO_OWING } from "./landing-reading.module.code.ts"

afterAll(scratch.sweep)

const ONE_AT = "akasha/one.ts"

const TWO_AT = "akasha/two.ts"

const AGAIN = "written again\n"

const WAS = "committed\n"

function rowAt(path: string): FileChange {
  return { kind: "replace", path, contentFrom: WAS, contentTo: AGAIN }
}

const CHECKED: Kind = {
  slug: "change-checked",
  runsChecks: true,
  writerOwesReading: false,
  readersOweReading: false,
}

const AUTHORED: Kind = {
  slug: "change-authored",
  runsChecks: true,
  writerOwesReading: true,
  readersOweReading: true,
}

function carriedOver(kind: Kind | undefined): boolean {
  const root = repoWith()
  const base = baseOf(root)
  put(root, ONE_AT, AGAIN)
  const body = readFileSync(join(root, ONE_AT))
  carryLanded(root, base, runningOf(kind), [rowAt(ONE_AT)], [], NO_OWING)
  return sameBody(readingIn(root, AGENT, ONE_AT), blobIdOf(body))
}

test("a landing whose readers owe no reading carries their readings onto the body it left", () => {
  expect(carriedOver(CHECKED)).toBe(true)
})

test("a landing whose readers owe reading carries none, so every reader goes stale", () => {
  expect(carriedOver(AUTHORED)).toBe(false)
})

test("a landing handed no change kind carries nothing", () => {
  expect(carriedOver(undefined)).toBe(false)
})

test("a path whose readers owe reading loses their readings while the path beside it keeps them", () => {
  const root = repoWith({ [ONE_AT]: WAS, [TWO_AT]: WAS })
  const base = baseOf(root)
  put(root, ONE_AT, AGAIN)
  put(root, TWO_AT, AGAIN)
  const two = readFileSync(join(root, TWO_AT))

  carryLanded(
    root,
    base,
    runningOf(CHECKED),
    [rowAt(ONE_AT), rowAt(TWO_AT)],
    [],
    new Map([
      [ONE_AT, true],
      [TWO_AT, false],
    ])
  )

  expect(readingIn(root, AGENT, ONE_AT)).toBe(null)
  expect(sameBody(readingIn(root, AGENT, TWO_AT), blobIdOf(two))).toBe(true)
})

test("a path saying nothing of that flag takes what the landing as a whole says", () => {
  const root = repoWith({ [ONE_AT]: WAS, [TWO_AT]: WAS })
  const base = baseOf(root)
  put(root, ONE_AT, AGAIN)
  put(root, TWO_AT, AGAIN)

  carryLanded(
    root,
    base,
    runningOf(AUTHORED),
    [rowAt(ONE_AT), rowAt(TWO_AT)],
    [],
    new Map([[TWO_AT, false]])
  )

  expect(readingIn(root, AGENT, ONE_AT)).toBe(null)
  expect(readingIn(root, AGENT, TWO_AT)).not.toBe(null)
})

test("a path a rename row names is neither carried nor dropped", () => {
  const root = repoWith({ [ONE_AT]: WAS, [TWO_AT]: WAS })
  const base = baseOf(root)

  carryLanded(
    root,
    base,
    runningOf(AUTHORED),
    [{ kind: "move", pathFrom: ONE_AT, pathTo: TWO_AT }],
    [],
    NO_OWING
  )

  expect(readingIn(root, AGENT, ONE_AT)).not.toBe(null)
  expect(readingIn(root, AGENT, TWO_AT)).not.toBe(null)
})
