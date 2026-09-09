import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { listedFiled } from "@akasha/indexes/testing"
import { AKASHA, rootsNamed } from "@akasha/pages/checkout-roots"
import type { Roots } from "@akasha/pages/markdown-page-at"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  openedDayOf,
  openedDayWindow,
  openedOn,
  openingInstantOn,
} from "./day-opening.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SLEPT = "2026-07-04"

const NEXT = "2026-07-05"

const LATE = "2026-07-06"

const SLEEP_ON_SLEPT = {
  id: "a",
  title: "sleep",
  startTime: "2026-07-04T04:00:00.000Z",
  endTime: "2026-07-04T13:00:00.000Z",
}

const SLEEP_ON_NEXT = {
  id: "b",
  title: "sleep",
  startTime: "2026-07-05T09:00:00.000Z",
  endTime: "2026-07-05T14:00:00.000Z",
}

const SLEEP_ON_LATE = {
  id: "c",
  title: "sleep",
  startTime: "2026-07-06T12:00:00.000Z",
  endTime: "2026-07-06T16:00:00.000Z",
}

const WORK = {
  id: "d",
  title: "work",
  startTime: "2026-07-04T14:00:00.000Z",
  endTime: "2026-07-04T15:00:00.000Z",
}

function dayFiled(root: string, day: string, rows: readonly unknown[]): undefined {
  const at = `akasha/held/${day}/day-${day}.day.ts`
  listedFiled(root, "day", `day-${day}`, [{ path: at, id: `id-${day}` }])
  mkdirSync(dirname(join(root, at)), { recursive: true })
  writeFileSync(join(root, at), "export const held = {}\n")
  const beside = at.replace(/\.ts$/, ".sessions.jsonl")
  writeFileSync(join(root, beside), `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`)
  return undefined
}

function sleptWorld(name: string): Roots {
  const root = scratch.rootFor(name)
  dayFiled(root, SLEPT, [SLEEP_ON_SLEPT, WORK])
  dayFiled(root, NEXT, [SLEEP_ON_NEXT])
  dayFiled(root, LATE, [SLEEP_ON_LATE])
  return rootsNamed({ [AKASHA]: root }, AKASHA)
}

test("a day opens where the sleep recorded beside its page began", () => {
  expect(openingInstantOn(sleptWorld("akasha-opened-began-"), SLEPT)).toBe(
    "2026-07-04T04:00:00.000Z"
  )
})

test("a day closes where the day after opened", () => {
  expect(openedDayWindow(sleptWorld("akasha-opened-window-"), SLEPT)).toEqual({
    from: "2026-07-04T04:00:00.000Z",
    to: "2026-07-05T09:00:00.000Z",
  })
})

test("an instant at or after the next day's opening counts to the day after", () => {
  const roots = sleptWorld("akasha-opened-after-")
  expect(openedDayOf(roots, new Date("2026-07-05T09:30:00.000Z"))).toBe(NEXT)
})

test("an instant before its own day opened counts to the day before", () => {
  const roots = sleptWorld("akasha-opened-before-")
  expect(openedDayOf(roots, new Date("2026-07-06T11:00:00.000Z"))).toBe(NEXT)
})

test("an instant after its own day opened counts to that day", () => {
  const roots = sleptWorld("akasha-opened-within-")
  expect(openedDayOf(roots, new Date("2026-07-06T13:00:00.000Z"))).toBe(LATE)
})

test("an instant answers the day it fell in and the moment that day opened", () => {
  const roots = sleptWorld("akasha-opened-on-")
  expect(openedOn(roots, Date.parse("2026-07-04T20:00:00.000Z"))).toEqual({
    instant: "2026-07-04T04:00:00.000Z",
    day: SLEPT,
  })
})

test("a day holding no sleep opens at six the previous evening in New York", () => {
  const root = scratch.rootFor("akasha-opened-nosleep-")
  dayFiled(root, SLEPT, [WORK])
  expect(openingInstantOn(rootsNamed({ [AKASHA]: root }, AKASHA), SLEPT)).toBe(
    "2026-07-03T22:00:00.000Z"
  )
})

test("a day no page is filed for opens at six the previous evening in New York", () => {
  expect(openingInstantOn(sleptWorld("akasha-opened-unfiled-"), "2026-01-01")).toBe(
    "2025-12-31T23:00:00.000Z"
  )
})

test("what is no day at all answers a window at the epoch", () => {
  expect(openedDayWindow(sleptWorld("akasha-opened-noday-"), "not-a-day")).toEqual({
    from: "1970-01-01T00:00:00.000Z",
    to: "1970-01-01T00:00:00.000Z",
  })
})
