import { z } from "zod"

const locationPointSchema = z
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
    points: z.array(z.unknown()).min(1).max(MAX_BATCH_POINTS),
  })
  .strict()

const pointRefusedSchema = z
  .object({
    index: z.number().int().nonnegative(),
    why: z.string(),
  })
  .strict()

type PointRefused = z.infer<typeof pointRefusedSchema>

export const ingestResponseSchema = z
  .object({
    received: z.number().int().nonnegative(),
    inserted: z.number().int().nonnegative(),
    refused: z.array(pointRefusedSchema).optional(),
  })
  .strict()

interface PointsSorted {
  readonly points: readonly LocationPoint[]
  readonly refused: readonly PointRefused[]
}

export function sortPoints(held: readonly unknown[]): PointsSorted {
  const points: LocationPoint[] = []
  const refused: PointRefused[] = []
  for (const [index, one] of held.entries()) {
    const parsed = locationPointSchema.safeParse(one)
    if (parsed.success) {
      points.push(parsed.data)
      continue
    }
    const issue = parsed.error.issues[0]
    const where = issue === undefined || issue.path.length === 0 ? "" : `${issue.path.join(".")}: `
    refused.push({ index, why: `${where}${issue?.message ?? "not a point"}` })
  }
  return { points, refused }
}
