import { describe, expect, test } from "bun:test"
import { type Row, rowOf } from "../exercise-rows/exercise-rows.module.code.ts"
import { gatheredIn, standingsIn } from "./mobility-standing.module.code.ts"

const READINGS: readonly Row[] = [
  rowOf({
    id: "1",
    slug: "forward-fold-2026-06-20",
    mobilityReadingMetric: "forward-fold",
    side: "n-a",
    mobilityReadingDate: "2026-06-20",
    mobilityReadingValueNum: 4,
    mobilityReadingValueText: "fingertips mid-shin",
  }),
  rowOf({
    id: "2",
    slug: "forward-fold-2026-07-01",
    mobilityReadingMetric: "forward-fold",
    side: "n-a",
    mobilityReadingDate: "2026-07-01",
    mobilityReadingValueNum: 6,
    mobilityReadingValueText: "fingertips to floor",
  }),
  rowOf({
    id: "3",
    slug: "supine-slr-left-2026-06-20",
    mobilityReadingMetric: "supine-slr",
    side: "left",
    mobilityReadingDate: "2026-06-20",
    mobilityReadingValueNum: 70,
  }),
  rowOf({
    id: "4",
    slug: "supine-slr-right-2026-06-20",
    mobilityReadingMetric: "supine-slr",
    side: "right",
    mobilityReadingDate: "2026-06-20",
    mobilityReadingValueText: "tight",
  }),
]

describe("where a mobility metric stands", () => {
  test("the fixture holds four readings over three standings, so an empty one cannot read clean", () => {
    expect(READINGS.length).toBe(4)
    expect(gatheredIn(READINGS).length).toBe(3)
  })

  test("a metric read on each side stands as two", () => {
    const standings = standingsIn(READINGS)
    const slr = standings.filter((one) => one.metric === "supine-slr")
    expect(slr.map((one) => one.side)).toEqual(["left", "right"])
  })

  test("a metric read on neither side states no side rather than stating that it has none", () => {
    const fold = standingsIn(READINGS).find((one) => one.metric === "forward-fold")
    expect(fold?.side).toBeNull()
  })

  test("the latest reading says where the metric stands and on which day", () => {
    const fold = standingsIn(READINGS).find((one) => one.metric === "forward-fold")
    expect(fold?.latestNum).toBe(6)
    expect(fold?.latestText).toBe("fingertips to floor")
    expect(fold?.date).toBe("2026-07-01")
    expect(fold?.readingCount).toBe(2)
  })

  test("a metric that rose over its readings reads as improving", () => {
    const fold = standingsIn(READINGS).find((one) => one.metric === "forward-fold")
    expect(fold?.trend).toBe("improving")
  })

  test("one reading is too few to say which way a metric moved", () => {
    const left = standingsIn(READINGS).find((one) => one.side === "left")
    expect(left?.trend).toBe("insufficient")
  })

  test("a reading stating no number still counts as a reading", () => {
    const right = standingsIn(READINGS).find((one) => one.side === "right")
    expect(right?.readingCount).toBe(1)
    expect(right?.latestNum).toBeNull()
    expect(right?.latestText).toBe("tight")
  })

  test("a reading naming no metric is left out rather than gathered under an empty name", () => {
    expect(gatheredIn([rowOf({ id: "5", slug: "bare", side: "left" })]).length).toBe(0)
  })
})
