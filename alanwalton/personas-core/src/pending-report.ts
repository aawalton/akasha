import { z } from "zod"
import type { PendingReport } from "../../../alan/persona/pending-report/pending-report.ts"

const DAILY_TIER_COLORS = ["black", "red", "yellow", "green", "blue"] as const

export const PendingReportContractSchema: z.ZodType<PendingReport> = z
  .object({
    pendingPoints: z.number().int().nonnegative(),
    landedPoints: z.number().int().nonnegative(),
    projectedPoints: z.number().int().nonnegative(),
    dailyTier: z.enum(DAILY_TIER_COLORS),
    dailyLevel: z.number().int().min(0).max(4),
    nextTier: z.enum(DAILY_TIER_COLORS).nullable(),
    pointsToNextTier: z.number().int().nonnegative().nullable(),
    wallpaperCount: z.number().int().nonnegative(),
    currentLevel: z.number().int().min(1),
    currentPercentProgress: z.number().min(0).lt(100),
    currentNextWallpaperDeficit: z.number().int().nonnegative(),
    projectedLevel: z.number().int().min(1),
    projectedPercentProgress: z.number().min(0).lt(100),
    projectedNextWallpaperDeficit: z.number().int().nonnegative(),
  })
  .strict()
