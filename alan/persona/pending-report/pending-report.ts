import {
  type DailyTierColor,
  type DailyTierLadder,
  evalDailyTier,
} from "../../../readouts/ring/tier/tier.ts"
import { computeLedger } from "../ledger/ledger.ts"

export interface PendingReport {
  readonly pendingPoints: number
  readonly landedPoints: number
  readonly projectedPoints: number
  readonly dailyTier: DailyTierColor
  readonly dailyLevel: number
  readonly nextTier: DailyTierColor | null
  readonly pointsToNextTier: number | null
  readonly wallpaperCount: number
  readonly currentLevel: number
  readonly currentPercentProgress: number
  readonly currentNextWallpaperDeficit: number
  readonly projectedLevel: number
  readonly projectedPercentProgress: number
  readonly projectedNextWallpaperDeficit: number
}

export interface BuildPendingReportInput {
  readonly pendingPoints: number
  readonly landedPoints: number
  readonly wallpaperCount: number
  readonly ladder: DailyTierLadder
}

export function buildPendingReport(input: BuildPendingReportInput): PendingReport {
  const projectedPoints = input.landedPoints + input.pendingPoints
  const daily = evalDailyTier(input.pendingPoints, input.ladder)
  const current = computeLedger({
    netBytes: input.landedPoints,
    wallpaperCount: input.wallpaperCount,
  })
  const projected = computeLedger({
    netBytes: projectedPoints,
    wallpaperCount: input.wallpaperCount,
  })
  return {
    pendingPoints: input.pendingPoints,
    landedPoints: input.landedPoints,
    projectedPoints,
    dailyTier: daily.tier,
    dailyLevel: daily.level,
    nextTier: daily.nextTier,
    pointsToNextTier: daily.pointsToNextTier,
    wallpaperCount: input.wallpaperCount,
    currentLevel: current.level,
    currentPercentProgress: current.percentProgress,
    currentNextWallpaperDeficit: current.nextWallpaperDeficit,
    projectedLevel: projected.level,
    projectedPercentProgress: projected.percentProgress,
    projectedNextWallpaperDeficit: projected.nextWallpaperDeficit,
  }
}
