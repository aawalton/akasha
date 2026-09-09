import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { put } from "@akasha/testing-system/putting"
import type { Kind } from "../../../command-system/calling/calling.module.code.ts"
import {
  blobIdOf,
  readingIn,
  sameBody,
} from "../../../command-system/reading/reading.module.code.ts"
import { AGENT, repoWith, scratch } from "../asking/asking.module.test-fixtures.ts"
import { runningOf } from "../drafting/drafting.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { carryLanded, NO_OWING } from "./landing-reading.module.code.ts"

afterAll(scratch.sweep)

const ONE_AT = "akasha/one.ts"

const TWO_AT = "akasha/two.ts"

const AGAIN = "written again\n"

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
  carryLanded(root, base, runningOf(kind), [{ path: ONE_AT, body }], [], NO_OWING)
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
  const root = repoWith({ [ONE_AT]: "committed\n", [TWO_AT]: "committed\n" })
  const base = baseOf(root)
  put(root, ONE_AT, AGAIN)
  put(root, TWO_AT, AGAIN)
  const one = readFileSync(join(root, ONE_AT))
  const two = readFileSync(join(root, TWO_AT))

  carryLanded(
    root,
    base,
    runningOf(CHECKED),
    [
      { path: ONE_AT, body: one },
      { path: TWO_AT, body: two },
    ],
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
  const root = repoWith({ [ONE_AT]: "committed\n", [TWO_AT]: "committed\n" })
  const base = baseOf(root)
  put(root, ONE_AT, AGAIN)
  put(root, TWO_AT, AGAIN)
  const one = readFileSync(join(root, ONE_AT))

  carryLanded(
    root,
    base,
    runningOf(AUTHORED),
    [
      { path: ONE_AT, body: one },
      { path: TWO_AT, body: readFileSync(join(root, TWO_AT)) },
    ],
    [],
    new Map([[TWO_AT, false]])
  )

  expect(readingIn(root, AGENT, ONE_AT)).toBe(null)
  expect(readingIn(root, AGENT, TWO_AT)).not.toBe(null)
})
