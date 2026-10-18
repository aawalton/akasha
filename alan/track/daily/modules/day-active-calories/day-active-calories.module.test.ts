import { expect, test } from "bun:test"
import { appendFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  daysTouchedBy,
  followSamples,
} from "akasha/alan/track/daily/modules/day-active-calories/day-active-calories.module.code.ts"

const TODAY = "2026-10-18"

const SETTLE = 50

function samplesOf(root: string, day: string): string {
  const folder = join(root, day)
  mkdirSync(folder, { recursive: true })
  return join(folder, `day-${day}.day.health-samples.jsonl`)
}

test("samples filed today write today and the day before, and never a day not yet come", () => {
  expect(daysTouchedBy([`/p/${TODAY}/day-${TODAY}.day.health-samples.jsonl`], TODAY)).toEqual([
    "2026-10-17",
    TODAY,
  ])
})

test("samples filed on an earlier day write that day and the days either side", () => {
  expect(daysTouchedBy(["/p/2026-10-16/day-2026-10-16.day.health-samples.jsonl"], TODAY)).toEqual([
    "2026-10-15",
    "2026-10-16",
    "2026-10-17",
  ])
})

test("a file beside a day that holds no samples writes no day", () => {
  expect(daysTouchedBy([`/p/${TODAY}/day-${TODAY}.day.ts`], TODAY)).toEqual([])
})

test("a burst of samples arriving is rolled once, onto the days the samples are filed under", async () => {
  const root = mkdtempSync("/var/tmp/day-active-calories-")
  const today = samplesOf(root, TODAY)
  writeFileSync(today, "")
  const old = samplesOf(root, "2026-10-01")
  writeFileSync(old, "")
  const rolled: (readonly string[])[] = []
  const following = followSamples({
    folder: root,
    today: () => TODAY,
    roll: (days) => {
      rolled.push(days)
      return Promise.resolve()
    },
    said: () => undefined,
    settleMs: SETTLE,
  })
  await Bun.sleep(SETTLE * 6)
  expect(rolled).toEqual([["2026-10-15", "2026-10-16", "2026-10-17", TODAY]])
  appendFileSync(today, '{"id":"a"}\n')
  appendFileSync(today, '{"id":"b"}\n')
  appendFileSync(today, '{"id":"c"}\n')
  writeFileSync(join(root, TODAY, `day-${TODAY}.day.ts`), "export {}\n")
  appendFileSync(old, '{"id":"d"}\n')
  await Bun.sleep(SETTLE * 12)
  following.stop()
  rmSync(root, { recursive: true, force: true })
  expect(rolled).toEqual([
    ["2026-10-15", "2026-10-16", "2026-10-17", TODAY],
    ["2026-10-17", TODAY],
  ])
})
