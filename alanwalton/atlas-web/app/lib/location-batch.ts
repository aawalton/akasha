import { z } from "zod"

export const locationPointSchema = z
  .object({
    deviceId: z.string().min(1),
    clientSeq: z.number().int().nonnegative(),
    capturedAt: z.string().datetime({ offset: true }),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    accuracyM: z.number().optional(),
    altitudeM: z.number().optional(),
    altitudeAccuracyM: z.number().optional(),
    speedMps: z.number().optional(),
    headingDeg: z.number().optional(),
    isMoving: z.boolean().optional(),
    activityType: z.string().optional(),
    batteryLevel: z.number().optional(),
    batteryIsCharging: z.boolean().optional(),
    odometerM: z.number().optional(),
  })
  .strict()

export type LocationPoint = z.infer<typeof locationPointSchema>

export const MAX_BATCH_POINTS = 1000

export const locationBatchSchema = z
  .object({
    points: z.array(locationPointSchema).min(1).max(MAX_BATCH_POINTS),
  })
  .strict()

export const ingestResponseSchema = z
  .object({
    received: z.number().int().nonnegative(),
    inserted: z.number().int().nonnegative(),
  })
  .strict()
