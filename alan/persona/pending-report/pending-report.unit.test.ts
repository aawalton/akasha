import { describe, expect, test } from "bun:test"
import type { DailyTierLadder } from "../../../readouts/ring/tier/tier.ts"
import { buildPendingReport } from "./pending-report.ts"

const LADDER: DailyTierLadder = [
  { threshold: 0, color: "black" },
  { threshold: 100, color: "red" },
  { threshold: 200, color: "yellow" },
  { threshold: 300, color: "green" },
  { threshold: 400, color: "blue" },
]

describe("buildPendingReport", () => {
  test("projected points are the landed points plus the pending ones", () => {
    const report = buildPendingReport({
      pendingPoints: 490_000,
      landedPoints: 70_000,
      wallpaperCount: 0,
      ladder: LADDER,
    })
    expect(report.landedPoints).toBe(70_000)
    expect(report.pendingPoints).toBe(490_000)
    expect(report.projectedPoints).toBe(560_000)
  })

  test("with nothing pending the projected ledger repeats the current one", () => {
    const report = buildPendingReport({
      pendingPoints: 0,
      landedPoints: 70_000,
      wallpaperCount: 0,
      ladder: LADDER,
    })
    expect(report.projectedLevel).toBe(report.currentLevel)
    expect(report.projectedStage).toBe(report.currentStage)
    expect(report.projectedPercentProgress).toBe(report.currentPercentProgress)
    expect(report.projectedNextWallpaperDeficit).toBe(report.currentNextWallpaperDeficit)
  })

  test("the current side reads landed points and the projected side reads the sum", () => {
    const report = buildPendingReport({
      pendingPoints: 490_000,
      landedPoints: 0,
      wallpaperCount: 0,
      ladder: LADDER,
    })
    expect(report.currentLevel).toBe(1)
    expect(report.currentStage).toBe("Initiating")
    expect(report.currentPercentProgress).toBe(0)
    expect(report.currentNextWallpaperDeficit).toBe(4_194_304)
    expect(report.projectedLevel).toBe(3)
    expect(report.projectedStage).toBe("Intensifying")
    expect(report.projectedNextWallpaperDeficit).toBe(3_704_304)
  })

  test("the daily tier weighs the pending points alone against the ladder", () => {
    const report = buildPendingReport({
      pendingPoints: 250,
      landedPoints: 9_000_000,
      wallpaperCount: 0,
      ladder: LADDER,
    })
    expect(report.dailyLevel).toBe(3)
    expect(report.dailyTier).toBe("yellow")
    expect(report.nextTier).toBe("green")
    expect(report.pointsToNextTier).toBe(50)
  })

  test("wallpapers already owned are spent against the balance", () => {
    const report = buildPendingReport({
      pendingPoints: 0,
      landedPoints: 0,
      wallpaperCount: 3,
      ladder: LADDER,
    })
    expect(report.wallpaperCount).toBe(3)
    expect(report.currentNextWallpaperDeficit).toBe(12_582_912)
  })
})
