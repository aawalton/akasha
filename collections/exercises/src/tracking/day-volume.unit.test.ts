import { describe, expect, test } from "bun:test"
import { type Page, pageOf } from "../pages/page"
import { toVolumeInputs } from "./day-volume"
import { computeSessionVolume } from "./volume"

function setLog(attrs: Record<string, unknown>): Page {
  return pageOf(attrs)
}

describe("toVolumeInputs", () => {
  test("empty set-log rows produce no inputs (measured-zero precondition)", () => {
    expect(toVolumeInputs([], new Map())).toEqual([])
    expect(computeSessionVolume(toVolumeInputs([], new Map()), 180)).toBe(0)
  })

  test("joins each row's exercise load attributes by exercise slug", () => {
    const rows: Page[] = [
      setLog({ id: "sl1", exerciseSlug: "ex-bench", reps: 10, weight: 100, isWarmup: false }),
      setLog({ id: "sl2", exerciseSlug: "ex-pushup", reps: 20, isWarmup: false }),
    ]
    const loadByExerciseSlug = new Map([
      ["ex-bench", { loadFactor: 0, implementCount: 1 }],
      ["ex-pushup", { loadFactor: 0.64, implementCount: 1 }],
    ])
    const inputs = toVolumeInputs(rows, loadByExerciseSlug)
    expect(inputs).toEqual([
      {
        reps: 10,
        weight: 100,
        isWarmup: false,
        activityType: undefined,
        loadFactor: 0,
        implementCount: 1,
      },
      {
        reps: 20,
        weight: undefined,
        isWarmup: false,
        activityType: undefined,
        loadFactor: 0.64,
        implementCount: 1,
      },
    ])
    expect(computeSessionVolume(inputs, 180)).toBe(3304)
  })

  test("a set-log whose exercise is missing from the load map carries undefined load attrs", () => {
    const rows: Page[] = [setLog({ id: "sl1", exerciseSlug: "ex-unknown", reps: 5, weight: 45 })]
    const inputs = toVolumeInputs(rows, new Map())
    expect(inputs[0]?.loadFactor).toBeUndefined()
    expect(inputs[0]?.implementCount).toBeUndefined()
    expect(computeSessionVolume(inputs, 180)).toBe(225)
  })

  test("warmup and cardio rows are mapped verbatim and scored as 0 by the pure model", () => {
    const rows: Page[] = [
      setLog({ id: "w", exerciseSlug: "ex-bench", reps: 5, weight: 45, isWarmup: true }),
      setLog({ id: "c", exerciseSlug: "ex-row", activityType: "cardio", durationSeconds: 600 }),
    ]
    const loadByExerciseSlug = new Map([
      ["ex-bench", { loadFactor: 0, implementCount: 1 }],
      ["ex-row", { loadFactor: 0, implementCount: 1 }],
    ])
    const inputs = toVolumeInputs(rows, loadByExerciseSlug)
    expect(inputs[0]?.isWarmup).toBe(true)
    expect(inputs[1]?.activityType).toBe("cardio")
    expect(computeSessionVolume(inputs, 180)).toBe(0)
  })
})
