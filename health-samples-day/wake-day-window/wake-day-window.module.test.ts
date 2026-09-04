import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { listedFiled } from "@akasha/indexes/testing"
import {
  dayAfter,
  sleepBlocksOn,
  spannedFromDayBoundaryIn,
  wakeDayWindowIn,
  wakeInstantFromBlocks,
} from "./wake-day-window.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function dayFiled(root: string, day: string, rows: readonly unknown[] | null): undefined {
  const at = `akasha/held/${day}/wake-day-${day}.wake-day.ts`
  listedFiled(root, "wake-day", `wake-day-${day}`, [{ path: at, id: `id-${day}` }])
  mkdirSync(dirname(join(root, at)), { recursive: true })
  writeFileSync(join(root, at), "export const held = {}\n")
  const beside = at.replace(/\.ts$/, ".sessions.jsonl")
  if (rows === null) rmSync(join(root, beside), { force: true })
  else writeFileSync(join(root, beside), `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`)
}

const SLEPT = "2026-07-04"

const NEXT = "2026-07-05"

const SLEPT_ROWS = [
  {
    id: "a",
    title: "sleep",
    startTime: "2026-07-04T04:00:00.000Z",
    endTime: "2026-07-04T13:00:00.000Z",
  },
  {
    id: "b",
    title: "work",
    startTime: "2026-07-04T14:00:00.000Z",
    endTime: "2026-07-04T15:00:00.000Z",
  },
]

const NEXT_ROWS = [
  {
    id: "c",
    title: "sleep",
    startTime: "2026-07-05T04:00:00.000Z",
    endTime: "2026-07-05T12:00:00.000Z",
  },
]

function worldFiled(name: string): string {
  const root = scratch.rootFor(name)
  dayFiled(root, SLEPT, SLEPT_ROWS)
  dayFiled(root, NEXT, NEXT_ROWS)
  return root
}

function refusalIn(said: unknown): string {
  expect(said).toHaveProperty("refused")
  return (said as { readonly refused: string }).refused
}

test("the day after one is the day its ESO reset closes into", () => {
  expect(dayAfter(SLEPT)).toBe(NEXT)
})

test("a wake is the earliest sleep ending inside the ESO day", () => {
  const at = wakeInstantFromBlocks(SLEPT_ROWS, {
    start: new Date("2026-07-04T10:00:00.000Z"),
    end: new Date("2026-07-05T10:00:00.000Z"),
  })
  expect(at?.toISOString()).toBe("2026-07-04T13:00:00.000Z")
})

test("the stretches of time a day held are read off the file beside its page", () => {
  const root = worldFiled("akasha-wake-blocks-")
  const blocks = sleepBlocksOn(root, SLEPT)
  expect("refused" in blocks).toBe(false)
  expect((blocks as readonly unknown[]).length).toBe(SLEPT_ROWS.length)
})

test("a day whose sleep is recorded answers a window from one wake to the next", () => {
  const root = worldFiled("akasha-wake-window-")
  expect(wakeDayWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-04T13:00:00.000Z",
    to: "2026-07-05T12:00:00.000Z",
  })
})

test("a day whose stretches of time were never written refuses", () => {
  const root = worldFiled("akasha-wake-unwritten-")
  dayFiled(root, SLEPT, null)
  expect(refusalIn(wakeDayWindowIn(root, SLEPT))).toContain("nothing is there")
})

test("a day holding stretches of time and no sleep refuses", () => {
  const root = worldFiled("akasha-wake-nosleep-")
  dayFiled(root, SLEPT, [SLEPT_ROWS[1]])
  expect(refusalIn(wakeDayWindowIn(root, SLEPT))).toContain("when Alan woke is not recorded")
})

test("a day whose next day has no recorded wake refuses, the window having no end", () => {
  const root = worldFiled("akasha-wake-noend-")
  dayFiled(root, NEXT, null)
  expect(refusalIn(wakeDayWindowIn(root, SLEPT))).toContain("it closes when Alan next woke")
})

test("a day the index names no page for refuses", () => {
  const root = worldFiled("akasha-wake-unfiled-")
  expect(refusalIn(wakeDayWindowIn(root, "2026-01-01"))).toContain("a day is one page")
})

test("what is no day at all refuses", () => {
  const root = worldFiled("akasha-wake-noday-")
  expect(refusalIn(wakeDayWindowIn(root, "not-a-day"))).toContain("is no day")
})

test("a day whose sleep is recorded on both ends was not spanned from the boundary", () => {
  const root = worldFiled("akasha-wake-spanned-false-")
  expect(spannedFromDayBoundaryIn(root, SLEPT)).toBe(false)
})

test("a day with no recorded wake was spanned from the boundary", () => {
  const root = worldFiled("akasha-wake-spanned-true-")
  dayFiled(root, SLEPT, null)
  expect(spannedFromDayBoundaryIn(root, SLEPT)).toBe(true)
})

test("a day whose next day has no recorded wake was spanned from the boundary at one end", () => {
  const root = worldFiled("akasha-wake-spanned-end-")
  dayFiled(root, NEXT, null)
  expect(spannedFromDayBoundaryIn(root, SLEPT)).toBe(true)
})
