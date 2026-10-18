import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  openingInstantOn,
  sleepBlocksOn,
  spannedWindowIn,
} from "akasha/alan/harness/health-sample/day/modules/opening-window/opening-window.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

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
    startedAt: "2026-07-04T04:00:00.000Z",
    endedAt: "2026-07-04T13:00:00.000Z",
  },
  {
    id: "b",
    title: "work",
    startedAt: "2026-07-04T14:00:00.000Z",
    endedAt: "2026-07-04T15:00:00.000Z",
  },
]

const NEXT_ROWS = [
  {
    id: "c",
    title: "sleep",
    startedAt: "2026-07-05T04:00:00.000Z",
    endedAt: "2026-07-05T12:00:00.000Z",
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

test("the stretches of time a day held are read off the file beside its page", () => {
  const root = worldFiled("akasha-wake-blocks-")
  const blocks = sleepBlocksOn(root, SLEPT)
  expect("refused" in blocks).toBe(false)
  expect((blocks as readonly unknown[]).length).toBe(SLEPT_ROWS.length)
})

test("a day whose sleep is recorded opens at the first sleep block beside its page", () => {
  const root = worldFiled("akasha-wake-window-")
  expect(openingInstantOn(root, SLEPT)).toEqual(new Date("2026-07-04T04:00:00.000Z"))
})

test("a day whose stretches of time were never written refuses", () => {
  const root = worldFiled("akasha-wake-unwritten-")
  dayFiled(root, SLEPT, null)
  expect(refusalIn(sleepBlocksOn(root, SLEPT))).toContain("nothing is there")
})

test("a day holding stretches of time and no sleep refuses", () => {
  const root = worldFiled("akasha-wake-nosleep-")
  dayFiled(root, SLEPT, [SLEPT_ROWS[1]])
  expect(refusalIn(openingInstantOn(root, SLEPT))).toContain("when the day opened is not recorded")
})

test("a day with no sleep at all opens at the ESO reset instead", () => {
  const root = worldFiled("akasha-wake-fallback-")
  dayFiled(root, SLEPT, [SLEPT_ROWS[1]])
  expect(spannedWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-04T10:00:00.000Z",
    to: "2026-07-05T04:00:00.000Z",
  })
})

test("a day whose next day records no sleep closes at the ESO reset after it", () => {
  const root = worldFiled("akasha-wake-fallback-end-")
  dayFiled(root, NEXT, [SLEPT_ROWS[1]])
  expect(spannedWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-04T04:00:00.000Z",
    to: "2026-07-05T10:00:00.000Z",
  })
})

test("a day recording no sleep at either end is the ESO day whole", () => {
  const root = worldFiled("akasha-opened-neither-")
  dayFiled(root, SLEPT, [SLEPT_ROWS[1]])
  dayFiled(root, NEXT, [SLEPT_ROWS[1]])
  expect(spannedWindowIn(root, SLEPT)).toEqual({
    from: "2026-07-04T10:00:00.000Z",
    to: "2026-07-05T10:00:00.000Z",
  })
})

test("a day the index names no page for refuses", () => {
  const root = worldFiled("akasha-wake-unfiled-")
  expect(refusalIn(sleepBlocksOn(root, "2026-01-01"))).toContain("a day is one page")
})

test("what is no day at all refuses", () => {
  const root = worldFiled("akasha-wake-noday-")
  expect(refusalIn(spannedWindowIn(root, "not-a-day"))).toContain("is no day")
})
