import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { put } from "@akasha/testing-system/putting"
import { AGENT, givenIn, repoWith, scratch } from "../asking/asking.module.test-fixtures.ts"
import type { Kind } from "../calling/calling.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { blobIdOf, readingIn, sameBody } from "../reading/reading.module.code.ts"
import { carryLanded } from "./landing-reading.module.code.ts"

afterAll(scratch.sweep)

const ONE_AT = "akasha/one.ts"

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

function carriedOver(kind: Kind | null): boolean {
  const root = repoWith()
  const base = baseOf(root)
  put(root, ONE_AT, AGAIN)
  const body = readFileSync(join(root, ONE_AT))
  const given = kind === null ? givenIn(root) : { ...givenIn(root), changeKind: kind }
  carryLanded(given, base, [{ path: ONE_AT, body }], [])
  return sameBody(readingIn(root, AGENT, ONE_AT), blobIdOf(body))
}

test("a landing whose readers owe no reading carries their readings onto the body it left", () => {
  expect(carriedOver(CHECKED)).toBe(true)
})

test("a landing whose readers owe reading carries none, so every reader goes stale", () => {
  expect(carriedOver(AUTHORED)).toBe(false)
})

test("a landing handed no change kind carries nothing", () => {
  expect(carriedOver(null)).toBe(false)
})
