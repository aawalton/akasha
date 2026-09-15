import { afterAll, expect, test } from "bun:test"
import {
  HELD,
  THREE,
} from "akasha/check/test/fixture/page-holding/page-holding.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  importingOf,
  spellersIn,
} from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const TRACKED = "akasha/one/holder/holder.module.code.ts"

const MOVING = new Map([[HELD, THREE]])

function unindexed(): string {
  return scratch.rootFor("path-naming-")
}

test("an index naming no importer of a path that moves leaves that path none", () => {
  expect(importingOf(unindexed(), MOVING)).toEqual([])
})

test("a caller naming nothing moved reads no importer at all", () => {
  expect(importingOf(unindexed(), new Map())).toEqual([])
})

test("a path the caller already knows about is left out of the search", () => {
  const every = spellersIn([TRACKED], () => HELD, MOVING, new Set())
  expect(every).toEqual([TRACKED])
  expect(spellersIn([TRACKED], () => HELD, MOVING, new Set(every))).toEqual([])
})

test("a path that moves is never answered as a body naming what moved", () => {
  expect(spellersIn([HELD, TRACKED], () => HELD, MOVING, new Set())).toEqual([TRACKED])
})

test("a body spelling that last part with no path separator beside it names no path", () => {
  const prose = "the held.module.ts was named in a sentence"
  expect(spellersIn([TRACKED], () => prose, MOVING, new Set())).toEqual([])
})

test("a body git does not keep is left out of the search, and a tracked one is not", () => {
  const withheld = "akasha/one/holder/holder.module.state.uncommitted.json"
  const said = spellersIn([TRACKED, withheld], () => HELD, MOVING, new Set())
  expect(said).toEqual([TRACKED])
})

test("a body git does not keep is left out however little of its name reads as a page's", () => {
  const stray = "akasha/one/holder/labelled-pool.uncommitted.jsonl"
  expect(spellersIn([TRACKED, stray], () => HELD, MOVING, new Set())).toEqual([TRACKED])
})
