import { selectHealthSamples } from "@akasha/health-samples-access/sample-selecting"
import type { HealthSampleRecord } from "@akasha/health-samples-access/sample-shape"
import { getWakeDayWindow } from "../wake-day-window/wake-day-window.module.code.ts"

const DAYS_AT_ONCE = 4

export function activeCaloriesFromSamples(samples: readonly HealthSampleRecord[]): number | null {
  if (samples.length === 0) return null
  const totalBySource = new Map<string, number>()
  for (const sample of samples) {
    if (!Number.isFinite(sample.value)) continue
    totalBySource.set(sample.sourceName, (totalBySource.get(sample.sourceName) ?? 0) + sample.value)
  }
  let best: number | null = null
  for (const total of totalBySource.values()) {
    if (best === null || total > best) best = total
  }
  return best
}

export interface DayReading {
  readonly reading: number | null
  readonly unread: string | null
}

async function loadDayActiveCalories(args: {
  readonly dayStr: string
  readonly storedReading?: number | null
}): Promise<DayReading> {
  const span = getWakeDayWindow(args.dayStr)
  if ("refused" in span) return { reading: args.storedReading ?? null, unread: span.refused }
  const samples = await selectHealthSamples({
    metric: "activeEnergy",
    from: span.from,
    to: span.to,
  })
  const derived = activeCaloriesFromSamples(samples)
  if (derived !== null) return { reading: derived, unread: null }
  return { reading: args.storedReading ?? null, unread: null }
}

export interface CaloriesRead {
  readonly byDay: ReadonlyMap<string, number | null>
  readonly unread: readonly string[]
}

export async function loadActiveCaloriesByDay(args: {
  readonly dayStrs: readonly string[]
  readonly storedReadings?: ReadonlyMap<string, number | null>
}): Promise<CaloriesRead> {
  const byDay = new Map<string, number | null>()
  const unread: string[] = []
  for (let at = 0; at < args.dayStrs.length; at += DAYS_AT_ONCE) {
    const readings = await Promise.all(
      args.dayStrs.slice(at, at + DAYS_AT_ONCE).map(async (dayStr) => {
        const read = await loadDayActiveCalories({
          dayStr,
          storedReading: args.storedReadings?.get(dayStr) ?? null,
        })
        return [dayStr, read] as const
      })
    )
    for (const [dayStr, read] of readings) {
      byDay.set(dayStr, read.reading)
      if (read.unread !== null) unread.push(dayStr)
    }
  }
  return { byDay, unread }
}
