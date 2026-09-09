import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { listedFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  dayAfter,
  openingInstantFromBlocks,
  openingWindowIn,
  sleepBlocksOn,
  spannedWindowIn,
} from "./opening-window.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function dayFiled(root: string, day: string, rows: readonly unknown[] | null): undefined {
  const at = `akasha/held/${day}/day-${day}.day.ts`
  listedFiled(root, "day", `day-${day}`, [{ path: at, id: `id-${day}` }])
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

const EARLY_ROWS = [
  {
    id: "d",
    title: "sleep",
    startTime: "2026-07-04T03:00:00.000Z",
    endTime: "2026-07-04T09:00:00.000Z",
  },
]

const NAP_ROW = {
  id: "e",
  title: "sleep",
  startTime: "2026-07-04T21:00:00.000Z",
  endTime: "2026-07-04T21:15:00.000Z",
}

const EVENING_ROWS = [
  {
    id: "f",
    title: "sleep",
    startTime: "2026-07-03T20:00:00.000Z",
    endTime: "2026-07-03T23:30:00.000Z",
  },
]

const LATE_ROWS = [
  {
    id: "g",
    title: "sleep",
    startTime: "2026-07-04T23:00:00.000Z",
    endTime: "2026-07-05T07:00:00.000Z",
  },
]

const REST_ROWS = [
  {
    id: "h",
    title: "rest",
    startTime: "2026-07-04T03:00:00.000Z",
    endTime: "2026-07-04T09:00:00.000Z",
  },
]

test("a day opens when the first sleep after six the evening before began", () => {
  expect(openingInstantFromBlocks(SLEPT_ROWS, SLEPT)?.toISOString()).toBe(
    "2026-07-04T04:00:00.000Z"
  )
})

test("a sleep ending before six in the morning still opens the day", () => {
  expect(openingInstantFromBlocks(EARLY_ROWS, SLEPT)?.toISOString()).toBe(
    "2026-07-04T03:00:00.000Z"
  )
})

test("a sleep starting before six in the evening and running past it opens the day", () => {
  expect(openingInstantFromBlocks(EVENING_ROWS, SLEPT)?.toISOString()).toBe(
    "2026-07-03T20:00:00.000Z"
  )
})

test("a nap later in the day is not what the day opened at", () => {
  expect(openingInstantFromBlocks([...EARLY_ROWS, NAP_ROW], SLEPT)?.toISOString()).toBe(
    "2026-07-04T03:00:00.000Z"
  )
})

test("a stretch titled rest is no sleep", () => {
  expect(openingInstantFromBlocks(REST_ROWS, SLEPT)).toBe(null)
})

test("a sleep starting after six in the evening opens the day after rather than that day", () => {
  expect(openingInstantFromBlocks(LATE_ROWS, SLEPT)).toBe(null)
  expect(openingInstantFromBlocks(LATE_ROWS, NEXT)?.toISOString()).toBe("2026-07-04T23:00:00.000Z")
})

test("the stretches of time a day held are read off the file beside its page", () => {
  const root = worldFiled("akasha-wake-blocks-")
  const blocks = sleepBlocksOn(root, SLEPT)
  expect("refused" in blocks).toBe(false)
  expect((blocks as readonly unknown[]).length).toBe(SLEPT_ROWS.length)
})

test("a day whose sleep is recorded answers a window from one opening to the next", () => {
  const root = worldFiled("akasha-wake-window-")
  expect(openingWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-04T04:00:00.000Z",
    to: "2026-07-05T04:00:00.000Z",
  })
})

test("a day whose stretches of time were never written refuses", () => {
  const root = worldFiled("akasha-wake-unwritten-")
  dayFiled(root, SLEPT, null)
  expect(refusalIn(openingWindowIn(root, SLEPT))).toContain("nothing is there")
})

test("a day holding stretches of time and no sleep refuses", () => {
  const root = worldFiled("akasha-wake-nosleep-")
  dayFiled(root, SLEPT, [SLEPT_ROWS[1]])
  expect(refusalIn(openingWindowIn(root, SLEPT))).toContain("when the day opened is not recorded")
})

test("a day with no sleep at all is spanned from six the previous evening in New York", () => {
  const root = worldFiled("akasha-wake-fallback-")
  dayFiled(root, SLEPT, [SLEPT_ROWS[1]])
  expect(spannedWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-03T22:00:00.000Z",
    to: "2026-07-05T04:00:00.000Z",
  })
})

test("a day whose next day records no sleep closes at six that evening in New York", () => {
  const root = worldFiled("akasha-wake-fallback-end-")
  dayFiled(root, NEXT, [SLEPT_ROWS[1]])
  expect(spannedWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-04T04:00:00.000Z",
    to: "2026-07-04T22:00:00.000Z",
  })
})

test("a day whose next day has no recorded opening refuses, the window having no end", () => {
  const root = worldFiled("akasha-wake-noend-")
  dayFiled(root, NEXT, null)
  expect(refusalIn(openingWindowIn(root, SLEPT))).toContain("it closes when the next day opened")
})

test("a day the index names no page for refuses", () => {
  const root = worldFiled("akasha-wake-unfiled-")
  expect(refusalIn(openingWindowIn(root, "2026-01-01"))).toContain("a day is one page")
})

test("what is no day at all refuses", () => {
  const root = worldFiled("akasha-wake-noday-")
  expect(refusalIn(openingWindowIn(root, "not-a-day"))).toContain("is no day")
})
