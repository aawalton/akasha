import { selectHealthSamples } from "@alanwalton/health-samples-access/select"
import { type HealthSampleRecord } from "@alanwalton/health-samples-access/types"
import { getWakeDayWindow } from "./wake-day"

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

async function loadDayActiveCalories(args: {
  readonly dayStr: string
  readonly storedReading?: number | null
}): Promise<number | null> {
  const window = await getWakeDayWindow(args.dayStr)
  const samples = await selectHealthSamples({
    metric: "activeEnergy",
    from: window.from,
    to: window.to,
  })
  const derived = activeCaloriesFromSamples(samples)
  if (derived !== null) return derived
  return args.storedReading ?? null
}

export async function loadActiveCaloriesByDay(args: {
  readonly dayStrs: readonly string[]
  readonly storedReadings?: ReadonlyMap<string, number | null>
}): Promise<Map<string, number | null>> {
  const out = new Map<string, number | null>()
  for (let at = 0; at < args.dayStrs.length; at += DAYS_AT_ONCE) {
    const readings = await Promise.all(
      args.dayStrs.slice(at, at + DAYS_AT_ONCE).map(async (dayStr) => {
        const value = await loadDayActiveCalories({
          dayStr,
          storedReading: args.storedReadings?.get(dayStr) ?? null,
        })
        return [dayStr, value] as const
      })
    )
    for (const [dayStr, value] of readings) out.set(dayStr, value)
  }
  return out
}
