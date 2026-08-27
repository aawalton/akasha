import { describe, expect, test } from "bun:test"
import type { HealthSampleRecord } from "@alanwalton/health-samples-access/types"
import { activeCaloriesFromSamples } from "./active-calories"

let nextId = 0

function sample(sourceName: string, value: number): HealthSampleRecord {
  nextId += 1
  return {
    id: `sample-${nextId}`,
    userId: "owner",
    metric: "activeEnergy",
    startedAt: "2026-08-07T12:00:00.000Z",
    endedAt: "2026-08-07T12:05:00.000Z",
    value,
    unit: "kcal",
    sourceName,
    createdAt: "2026-08-07T12:06:00.000Z",
  }
}

describe("activeCaloriesFromSamples", () => {
  test("two devices over the same window do not add together", () => {
    const calories = activeCaloriesFromSamples([
      sample("Alan's iPhone", 60),
      sample("Alan's Apple Watch", 90),
      sample("Alan's iPhone", 50),
      sample("Alan's Apple Watch", 60),
    ])
    expect(calories).toBe(150)
  })

  test("a single device's samples are summed", () => {
    expect(
      activeCaloriesFromSamples([sample("Alan's iPhone", 40), sample("Alan's iPhone", 25)])
    ).toBe(65)
  })

  test("no samples reads as absent rather than as zero", () => {
    expect(activeCaloriesFromSamples([])).toBeNull()
  })

  test("a non-finite value is skipped rather than poisoning the total", () => {
    const calories = activeCaloriesFromSamples([
      sample("Alan's iPhone", Number.NaN),
      sample("Alan's iPhone", 30),
    ])
    expect(calories).toBe(30)
  })

  test("the reading never exceeds the largest single source's total", () => {
    const samples = [
      sample("phone", 10),
      sample("watch", 7),
      sample("phone", 12),
      sample("watch", 9),
      sample("scale", 30),
    ]
    const bySource = new Map<string, number>()
    for (const s of samples) bySource.set(s.sourceName, (bySource.get(s.sourceName) ?? 0) + s.value)
    expect(activeCaloriesFromSamples(samples)).toBe(Math.max(...bySource.values()))
  })
})
