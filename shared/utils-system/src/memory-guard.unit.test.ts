import { describe, expect, test } from "bun:test"
import {
  assessMemoryGuard,
  assessSpawnAdmission,
  MIN_FREE_MEMORY_GB,
  parseMemPressureStats,
} from "./memory-guard"

const KB_PER_GB = 1024 * 1024
const thresholdKb = MIN_FREE_MEMORY_GB * KB_PER_GB

describe("assessMemoryGuard", () => {
  test("allows when available is well above threshold", () => {
    const result = assessMemoryGuard({
      availableKb: thresholdKb * 2,
      kindLabel: "claude session",
    })
    expect(result.allow).toBe(true)
  })

  test("allows when available is exactly threshold + 1 KiB", () => {
    const result = assessMemoryGuard({
      availableKb: thresholdKb + 1,
      kindLabel: "dev-server",
    })
    expect(result.allow).toBe(true)
  })

  test("refuses when available equals threshold (strict less-than)", () => {
    const result = assessMemoryGuard({
      availableKb: thresholdKb,
      kindLabel: "claude session",
    })
    expect(result.allow).toBe(false)
  })

  test("refuses when available is well below threshold", () => {
    const result = assessMemoryGuard({
      availableKb: 1024 * 1024,
      kindLabel: "dev-server",
    })
    expect(result.allow).toBe(false)
  })

  test("refusal reason names the kind label and the available GB", () => {
    const result = assessMemoryGuard({
      availableKb: 4 * KB_PER_GB,
      kindLabel: "dev-server",
    })
    expect(result.allow).toBe(false)
    expect(result.reason).toContain("dev-server")
    expect(result.reason).toContain("4")
    expect(result.reason).toContain(String(MIN_FREE_MEMORY_GB))
  })

  test("allow reason names the kind label and the available GB", () => {
    const result = assessMemoryGuard({
      availableKb: 16 * KB_PER_GB,
      kindLabel: "claude session",
    })
    expect(result.allow).toBe(true)
    expect(result.reason).toContain("claude session")
    expect(result.reason).toContain("16")
  })
})

const memFloorKb = MIN_FREE_MEMORY_GB * KB_PER_GB

const healthy = {
  availableKb: 24 * KB_PER_GB,
  minFreeMemoryKb: memFloorKb,
} as const

describe("assessSpawnAdmission", () => {
  test("admits with abundant RAM regardless of host churn (PSI/swap legs retired)", () => {
    const result = assessSpawnAdmission({
      ...healthy,
      availableKb: 30 * KB_PER_GB,
      kindLabel: "worker foo",
    })
    expect(result.allow).toBe(true)
    expect(result.reason).toContain("worker foo")
  })

  test("allows when MemAvailable is well above the floor", () => {
    const result = assessSpawnAdmission({ ...healthy, kindLabel: "worker foo" })
    expect(result.allow).toBe(true)
    expect(result.reason).toContain("worker foo")
  })

  test("refuses when MemAvailable is exactly at the RAM floor (hard primary, inclusive)", () => {
    const result = assessSpawnAdmission({
      ...healthy,
      availableKb: memFloorKb,
      kindLabel: "worker foo",
    })
    expect(result.allow).toBe(false)
    expect(result.reason).toContain("MemAvailable")
  })

  test("allows when MemAvailable is exactly one KiB above the floor", () => {
    const result = assessSpawnAdmission({
      ...healthy,
      availableKb: memFloorKb + 1,
      kindLabel: "worker foo",
    })
    expect(result.allow).toBe(true)
  })

  test("refuses when MemAvailable is well below the floor; reason names the floor GB", () => {
    const result = assessSpawnAdmission({
      ...healthy,
      availableKb: 1 * KB_PER_GB,
      kindLabel: "worker foo",
    })
    expect(result.allow).toBe(false)
    expect(result.reason).toContain("MemAvailable")
    expect(result.reason).toContain(String(MIN_FREE_MEMORY_GB))
  })

  test("honors a custom minFreeMemoryKb floor (operator override seam)", () => {
    const raisedFloorKb = 16 * KB_PER_GB
    const belowRaised = assessSpawnAdmission({
      ...healthy,
      availableKb: 12 * KB_PER_GB,
      minFreeMemoryKb: raisedFloorKb,
      kindLabel: "worker foo",
    })
    expect(belowRaised.allow).toBe(false)
    const aboveRaised = assessSpawnAdmission({
      ...healthy,
      availableKb: 20 * KB_PER_GB,
      minFreeMemoryKb: raisedFloorKb,
      kindLabel: "worker foo",
    })
    expect(aboveRaised.allow).toBe(true)
  })

  test("allow reason names the kind label and the available GB", () => {
    const result = assessSpawnAdmission({
      ...healthy,
      availableKb: 16 * KB_PER_GB,
      kindLabel: "worker bar",
    })
    expect(result.allow).toBe(true)
    expect(result.reason).toContain("worker bar")
    expect(result.reason).toContain("16")
  })
})

describe("parseMemPressureStats", () => {
  const sample =
    "some avg10=0.01 avg60=0.03 avg300=0.00 total=52141837\nfull avg10=0.02 avg60=0.04 avg300=0.00 total=50219378\n"

  test("parses all four some/full avg10/avg60 fields from a real PSI body", () => {
    expect(parseMemPressureStats(sample)).toEqual({
      someAvg10: 0.01,
      someAvg60: 0.03,
      fullAvg10: 0.02,
      fullAvg60: 0.04,
    })
  })

  test("parses integer windows (no decimal point)", () => {
    expect(
      parseMemPressureStats("some avg10=0 avg60=0 avg300=0 total=0\nfull avg10=0 avg60=0 total=0\n")
    ).toEqual({ someAvg10: 0, someAvg60: 0, fullAvg10: 0, fullAvg60: 0 })
  })

  test("throws when the full line is absent (strict — kernel/format violation)", () => {
    expect(() =>
      parseMemPressureStats("some avg10=0.01 avg60=0.03 avg300=0.00 total=1\n")
    ).toThrow()
  })

  test("throws when the some line is absent (strict — kernel/format violation)", () => {
    expect(() =>
      parseMemPressureStats("full avg10=0.01 avg60=0.03 avg300=0.00 total=1\n")
    ).toThrow()
  })
})
