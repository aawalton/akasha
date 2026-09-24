import { expect, test } from "bun:test"
import {
  insertLocationTraces,
  mergedInto,
  type ReadingFor,
  rowOf,
  TRIES,
  traceIdentity,
  traceRowsIn,
  type WritingFor,
} from "akasha/alan/harness/location-trace-access/modules/trace-insert/trace-insert.module.code.ts"
import type { LocationTraceInsert } from "akasha/alan/harness/location-trace-access/modules/trace-shape/trace-shape.module.code.ts"
import { requireAt } from "akasha/code/type/narrowing/modules/require-at/require-at.module.code.ts"
import { z } from "zod"

const COMMIT = "1a02fe93463f2325a4ab998af71d903d854aaf55"

const DEVICE = "a fixture phone"

const BEFORE_THE_TURN = "2026-01-15T10:59:00.000Z"

const AFTER_THE_TURN = "2026-01-15T11:00:00.000Z"

const LATER_IN_THE_DAY = "2026-01-15T18:00:00.000Z"

const EARLIER_DAY = "2026-01-14"

const LATER_DAY = "2026-01-15"

type Read = Awaited<ReturnType<ReadingFor>>

type Wrote = Awaited<ReturnType<WritingFor>>

type Asked = Parameters<WritingFor>[0]

function traceOf(clientSeq: number, capturedAt: string): LocationTraceInsert {
  return {
    deviceId: DEVICE,
    clientSeq,
    capturedAt,
    latitude: 40.7608,
    longitude: -111.891,
    accuracyM: 5,
    isMoving: true,
  }
}

interface Pages {
  readonly reading: ReadingFor
  readonly writing: WritingFor
  readonly filed: ReadonlyMap<string, string>
  readonly asked: readonly Asked[]
}

function pagesOf(refusing: ReadonlySet<string> = new Set()): Pages {
  const filed = new Map<string, string>()
  const asked: Asked[] = []
  const reading: ReadingFor = (sought) => {
    const bodies = (sought.paths ?? []).map((path) => ({
      path,
      content: filed.get(path) ?? null,
    }))
    return Promise.resolve<Read>({ at: COMMIT, bodies, unplaced: [] })
  }
  const writing: WritingFor = (one) => {
    asked.push(one)
    const puts = one.puts ?? []
    if (puts.some((put) => refusing.has(put.path))) {
      return Promise.resolve<Wrote>({ refused: "the rows moved" })
    }
    for (const put of puts) filed.set(put.path, put.content)
    return Promise.resolve<Wrote>({
      commit: COMMIT,
      wrote: puts.map((put) => put.path),
      took: [],
    })
  }
  return { reading, writing, filed, asked }
}

function rowsIn(pages: Pages, day: string): readonly string[] {
  const held = pages.filed.get(traceRowsIn(day))
  return held === undefined ? [] : held.split("\n").filter((one) => one.trim() !== "")
}

const ROW = z.record(z.string(), z.unknown())

function parseRow(lines: readonly string[], at: number): Record<string, unknown> {
  return ROW.parse(JSON.parse(requireAt(lines, at)))
}

test("a trace is filed beside the day page for the day it was captured in", () => {
  expect(traceRowsIn(LATER_DAY)).toBe(
    "alan/track/daily/day/pages/2026-01-15/day-2026-01-15.day.location-traces.jsonl"
  )
})

test("a row carries the keys the day's entry declares and nothing else", () => {
  const row = parseRow([rowOf(traceOf(7, AFTER_THE_TURN), "an id")], 0)
  expect(Object.keys(row).sort()).toEqual([
    "accuracyM",
    "capturedAt",
    "clientSeq",
    "deviceId",
    "id",
    "isMoving",
    "latitude",
    "longitude",
  ])
  expect(row["capturedAt"]).toBe(AFTER_THE_TURN)
  expect(row["clientSeq"]).toBe(7)
})

test("a batch captured on one day is filed beside that day alone", async () => {
  const pages = pagesOf()
  const batch = [traceOf(1, AFTER_THE_TURN), traceOf(2, LATER_IN_THE_DAY)]
  const answered = await insertLocationTraces(batch, pages.reading, pages.writing)
  expect(answered).toEqual({ inserted: 2 })
  expect([...pages.filed.keys()]).toEqual([traceRowsIn(LATER_DAY)])
  expect(rowsIn(pages, LATER_DAY)).toHaveLength(2)
  expect(pages.asked).toHaveLength(1)
})

test("a batch straddling the turn of the day is parted over the two days", async () => {
  const pages = pagesOf()
  const batch = [traceOf(1, BEFORE_THE_TURN), traceOf(2, AFTER_THE_TURN)]
  const answered = await insertLocationTraces(batch, pages.reading, pages.writing)
  expect(answered).toEqual({ inserted: 2 })
  expect(rowsIn(pages, EARLIER_DAY)).toHaveLength(1)
  expect(rowsIn(pages, LATER_DAY)).toHaveLength(1)
  expect(parseRow(rowsIn(pages, EARLIER_DAY), 0)["capturedAt"]).toBe(BEFORE_THE_TURN)
  expect(parseRow(rowsIn(pages, LATER_DAY), 0)["capturedAt"]).toBe(AFTER_THE_TURN)
})

test("the same batch sent twice keeps one row for each trace", async () => {
  const pages = pagesOf()
  const batch = [traceOf(1, AFTER_THE_TURN), traceOf(2, LATER_IN_THE_DAY)]
  await insertLocationTraces(batch, pages.reading, pages.writing)
  const was = rowsIn(pages, LATER_DAY)
  const again = await insertLocationTraces(batch, pages.reading, pages.writing)
  expect(again).toEqual({ inserted: 2 })
  expect(rowsIn(pages, LATER_DAY)).toEqual(was)
  expect(pages.asked).toHaveLength(1)
})

test("an empty batch is answered with nothing kept and nothing written", async () => {
  const pages = pagesOf()
  const answered = await insertLocationTraces([], pages.reading, pages.writing)
  expect(answered).toEqual({ inserted: 0 })
  expect(pages.asked).toHaveLength(0)
  expect(pages.filed.size).toBe(0)
})

test("a day that never lands refuses the call rather than answering a short count", async () => {
  const pages = pagesOf(new Set([traceRowsIn(LATER_DAY)]))
  const batch = [traceOf(1, BEFORE_THE_TURN), traceOf(2, AFTER_THE_TURN)]
  const landing = insertLocationTraces(batch, pages.reading, pages.writing)
  await expect(landing).rejects.toThrow("was not written")
  expect(rowsIn(pages, EARLIER_DAY)).toHaveLength(1)
  expect(rowsIn(pages, LATER_DAY)).toHaveLength(0)
  expect(pages.asked).toHaveLength(TRIES + 1)
})

test("a trace already filed is left as it is rather than filed a second time", () => {
  const path = traceRowsIn(LATER_DAY)
  const one = traceOf(1, AFTER_THE_TURN)
  const held = [[traceIdentity(one), one] as const]
  const first = mergedInto([], held, path)
  expect(first.inserted).toBe(1)
  expect(first.touched).toBe(true)
  const again = mergedInto(first.lines, held, path)
  expect(again.inserted).toBe(0)
  expect(again.touched).toBe(false)
  expect(again.lines).toEqual(first.lines)
})

test("a line already there that names no trace is kept and blocks no trace", () => {
  const path = traceRowsIn(LATER_DAY)
  const one = traceOf(1, AFTER_THE_TURN)
  const merged = mergedInto(["{ not json", "[1, 2]"], [[traceIdentity(one), one]], path)
  expect(merged.inserted).toBe(1)
  expect(merged.lines.slice(0, 2)).toEqual(["{ not json", "[1, 2]"])
  expect(parseRow(merged.lines, 2)["clientSeq"]).toBe(1)
})

test("a trace is told apart by its device, its sequence and the instant it was captured", () => {
  const path = traceRowsIn(LATER_DAY)
  const one = traceOf(1, AFTER_THE_TURN)
  const resent = traceOf(1, LATER_IN_THE_DAY)
  const first = mergedInto([], [[traceIdentity(one), one]], path)
  const merged = mergedInto(first.lines, [[traceIdentity(resent), resent]], path)
  expect(merged.inserted).toBe(1)
  expect(merged.lines).toHaveLength(2)
  expect(parseRow(merged.lines, 0)["id"]).not.toBe(parseRow(merged.lines, 1)["id"])
})
