import { expect, test } from "bun:test"
import { sampleIdentity } from "../sample-identity/sample-identity.module.code.ts"
import type { HealthSample } from "../sample-shape/sample-shape.module.code.ts"
import {
  landDay,
  mergedInto,
  type ReadingFor,
  TRIES,
  type WritingFor,
} from "./sample-upsert.module.code.ts"

const AT =
  "akasha/alan/tracking/daily/eso-days/pages/2026-01-01/eso-day-2026-01-01.eso-day.health-samples.jsonl"

const ARRIVED = "2026-01-01T12:00:00.000Z"

function sampleOf(value: number): HealthSample {
  return {
    metric: "stepCount",
    startedAt: "2026-01-01T08:00:00.000Z",
    endedAt: "2026-01-01T08:05:00.000Z",
    value,
    unit: "count",
    sourceName: "a fixture",
  }
}

function heldOf(sample: HealthSample): readonly (readonly [string, HealthSample])[] {
  return [[sampleIdentity(sample), sample]]
}

const HELD = heldOf(sampleOf(11))

test("a reading nothing has filed is added, and the file is touched", () => {
  const merged = mergedInto([], HELD, ARRIVED, AT)
  expect(merged.touched).toBe(true)
  expect(merged.tally).toEqual({ inserted: 1, unchanged: 0, valueChanged: 0 })
  expect(merged.lines).toHaveLength(1)
})

test("a row is written with the keys a row beside an akasha page carries", () => {
  const merged = mergedInto([], HELD, ARRIVED, AT)
  const row = JSON.parse(merged.lines[0] as string) as Record<string, unknown>
  expect(Object.keys(row).sort()).toEqual([
    "arrivedAt",
    "endedAt",
    "id",
    "metric",
    "seq",
    "sourceName",
    "startedAt",
    "unit",
    "value",
  ])
  expect(row["startedAt"]).toBe("2026-01-01T08:00:00.000Z")
  expect(row["arrivedAt"]).toBe(ARRIVED)
  expect(row["seq"]).toBe(1)
})

test("a reading already filed at that value touches nothing", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const again = mergedInto(first.lines, HELD, "2026-01-02T12:00:00.000Z", AT)
  expect(again.touched).toBe(false)
  expect(again.tally).toEqual({ inserted: 0, unchanged: 1, valueChanged: 0 })
  expect(again.lines).toEqual(first.lines)
})

test("a reading whose value moved keeps the id and the seq it was filed under", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const was = JSON.parse(first.lines[0] as string) as Record<string, unknown>
  const moved = mergedInto(first.lines, heldOf(sampleOf(12)), ARRIVED, AT)
  expect(moved.touched).toBe(true)
  expect(moved.tally).toEqual({ inserted: 0, unchanged: 0, valueChanged: 1 })
  expect(moved.lines).toHaveLength(1)
  const now = JSON.parse(moved.lines[0] as string) as Record<string, unknown>
  expect(now["id"]).toBe(was["id"])
  expect(now["seq"]).toBe(was["seq"])
  expect(now["value"]).toBe(12)
})

test("a second reading takes the seq after the highest already filed", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const other: HealthSample = { ...sampleOf(20), startedAt: "2026-01-01T09:00:00.000Z" }
  const both = mergedInto(first.lines, heldOf(other), ARRIVED, AT)
  const now = JSON.parse(both.lines[1] as string) as Record<string, unknown>
  expect(now["seq"]).toBe(2)
})

test("a row already filed is matched by what names a reading rather than by its value", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const renamed: HealthSample = { ...sampleOf(11), sourceName: "another fixture" }
  const merged = mergedInto(first.lines, heldOf(renamed), ARRIVED, AT)
  expect(merged.tally).toEqual({ inserted: 1, unchanged: 0, valueChanged: 0 })
  expect(merged.lines).toHaveLength(2)
})

const COMMIT = "1a02fe93463f2325a4ab998af71d903d854aaf55"

type Read = Awaited<ReturnType<ReadingFor>>

type Wrote = Awaited<ReturnType<WritingFor>>

type Asked = Parameters<WritingFor>[0]

const LANDED = { commit: COMMIT, wrote: [AT], took: [] } as Wrote

function emptyRead(): Read {
  return { at: COMMIT, bodies: [], unplaced: [] } as Read
}

function bodiedRead(content: string): Read {
  return { at: COMMIT, bodies: [{ path: AT, content }], unplaced: [] } as Read
}

function readingOf(answers: readonly Read[]): {
  reading: ReadingFor
  taken: () => number
} {
  let at = 0
  const reading: ReadingFor = () => {
    const said = answers[at] ?? answers[answers.length - 1]
    at += 1
    return Promise.resolve(said as Read)
  }
  return { reading, taken: () => at }
}

function writingOf(answers: readonly Wrote[]): {
  writing: WritingFor
  asked: readonly Asked[]
} {
  const asked: Asked[] = []
  const writing: WritingFor = (one) => {
    asked.push(one)
    const said = answers[asked.length - 1] ?? answers[answers.length - 1]
    return Promise.resolve(said as Wrote)
  }
  return { writing, asked }
}

test("a day whose rows are not there yet is filed rather than refused", async () => {
  const read = readingOf([emptyRead()])
  const write = writingOf([LANDED])
  const tally = await landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  expect(tally).toEqual({ inserted: 1, unchanged: 0, valueChanged: 0 })
  expect(write.asked).toHaveLength(1)
})

test("a write names the commit the rows were read at", async () => {
  const read = readingOf([emptyRead()])
  const write = writingOf([LANDED])
  await landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  const one = write.asked[0]
  expect(one?.read).toBe(COMMIT)
  expect(one?.puts?.[0]?.path).toBe(AT)
})

test("a day whose readings were all filed already is written nowhere", async () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const read = readingOf([bodiedRead(`${first.lines.join("\n")}\n`)])
  const write = writingOf([LANDED])
  const tally = await landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  expect(tally).toEqual({ inserted: 0, unchanged: 1, valueChanged: 0 })
  expect(write.asked).toHaveLength(0)
})

test("a read the pages refuse is tried again from a fresh read", async () => {
  const read = readingOf([{ refused: "the pages were busy" } as Read, emptyRead()])
  const write = writingOf([LANDED])
  const tally = await landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  expect(tally.inserted).toBe(1)
  expect(read.taken()).toBe(2)
  expect(write.asked).toHaveLength(1)
})

test("a write the pages refuse is tried again from a fresh read", async () => {
  const read = readingOf([emptyRead()])
  const write = writingOf([{ refused: "the rows moved" } as Wrote, LANDED])
  const tally = await landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  expect(tally.inserted).toBe(1)
  expect(read.taken()).toBe(2)
  expect(write.asked).toHaveLength(2)
})

test("a write naming no commit where a change was meant is tried again", async () => {
  const read = readingOf([emptyRead()])
  const write = writingOf([{ commit: null, wrote: [], took: [] } as Wrote, LANDED])
  const tally = await landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  expect(tally.inserted).toBe(1)
  expect(write.asked).toHaveLength(2)
})

test("a write that never landed throws once every try is spent", async () => {
  const read = readingOf([emptyRead()])
  const write = writingOf([{ refused: "the rows moved" } as Wrote])
  const landing = landDay(AT, HELD, ARRIVED, read.reading, write.writing)
  await expect(landing).rejects.toThrow("was not written")
  expect(read.taken()).toBe(TRIES)
  expect(write.asked).toHaveLength(TRIES)
})
