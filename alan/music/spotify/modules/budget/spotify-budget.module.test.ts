import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  refusedUntil,
  slotTaken,
} from "akasha/alan/music/spotify/modules/budget/spotify-budget.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const PAGE = "akasha/one/alan.spotify-account.ts"

const WINDOW_MS = 30000

const HOLDS = 30

const BAN_MS = 74860000

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-spotify-budget-")
  mkdirSync(join(root, dirname(PAGE)), { recursive: true })
  return root
}

test("a first call takes a slot and opens a window", () => {
  expect(slotTaken(Date.now(), rooted(), PAGE)).toEqual({ took: true, waitMs: 0, banned: false })
})

test("what one window holds is spent and no more", () => {
  const root = rooted()
  const now = Date.now()
  for (let n = 0; n < HOLDS; n += 1) expect(slotTaken(now, root, PAGE).took).toBe(true)
  expect(slotTaken(now, root, PAGE)).toEqual({ took: false, waitMs: WINDOW_MS, banned: false })
})

test("a taker beyond what the window holds is told how long that window has left", () => {
  const root = rooted()
  const now = Date.now()
  for (let n = 0; n < HOLDS; n += 1) slotTaken(now, root, PAGE)
  expect(slotTaken(now + 11000, root, PAGE).waitMs).toBe(WINDOW_MS - 11000)
})

test("a call made once the window is older than its length opens a new window", () => {
  const root = rooted()
  const now = Date.now()
  for (let n = 0; n < HOLDS; n += 1) slotTaken(now, root, PAGE)
  expect(slotTaken(now + WINDOW_MS, root, PAGE).took).toBe(true)
})

test("a ban holds every taker off until the instant it names", () => {
  const root = rooted()
  const now = Date.now()
  refusedUntil(now, BAN_MS, root, PAGE)
  expect(slotTaken(now + 1000, root, PAGE)).toEqual({
    took: false,
    waitMs: BAN_MS - 1000,
    banned: true,
  })
})

test("a ban is read before the window, so a fresh window does not undo it", () => {
  const root = rooted()
  const now = Date.now()
  slotTaken(now, root, PAGE)
  refusedUntil(now, BAN_MS, root, PAGE)
  expect(slotTaken(now + WINDOW_MS + 1, root, PAGE).banned).toBe(true)
})

test("a ban that has passed lets a call through again", () => {
  const root = rooted()
  const now = Date.now()
  refusedUntil(now, 1000, root, PAGE)
  expect(slotTaken(now + 2000, root, PAGE).took).toBe(true)
})

test("the count sits beside the page, so a second reader counts against the same window", () => {
  const root = rooted()
  const now = Date.now()
  for (let n = 0; n < HOLDS; n += 1) slotTaken(now, root, PAGE)
  expect(slotTaken(now, root, PAGE).took).toBe(false)
})
