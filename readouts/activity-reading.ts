import { type Ask, askOr } from "./readout-resolver.ts"
import type { WakeWindow } from "./session-readings.ts"

export type HealthSample = {
  readonly sourceName: string
  readonly value: number
}

export type ReadSamples = (given: {
  readonly metric: string
  readonly from: string
  readonly to: string
}) => Promise<readonly HealthSample[]>

let reading: ReadSamples | null = null

export function samplesThrough(read: ReadSamples): void {
  reading = read
}

export function samplesOr(read?: ReadSamples): ReadSamples {
  const held = read ?? reading
  if (held === null) {
    throw new Error(
      "samplesOr: nothing was handed in to read health samples with, and nothing was set with `samplesThrough`"
    )
  }
  return held
}

const ACTIVE_ENERGY = "activeEnergy"
const STRENGTH_PER_CALORIE = 7
const MINUTES_PER_HOUR = 60

export const MEASURES_QUERY = "daily-tracking-all"

const NEEDED = ["active-calories", "strength-volume", "nutrition-points", "sleep-points"] as const

export interface DayMeasures {
  readonly activeCalories: number | null
  readonly strengthVolume: number | null
  readonly nutritionPoints: number | null
  readonly sleepHours: number | null
}

function numberOf(values: Readonly<Record<string, unknown>>, key: string): number | null {
  const held = values[key]
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const parsed = Number(held)
  return Number.isFinite(parsed) ? parsed : null
}

export interface MeasuresAnswer {
  readonly n: number
  readonly rows: readonly {
    readonly at?: string
    readonly values: Readonly<Record<string, unknown>>
  }[]
}

export function measuresFromAnswer(answer: MeasuresAnswer, day: string): DayMeasures | null {
  if (answer.rows.length === 0) {
    throw new Error(
      `${MEASURES_QUERY} answered with no days at all, which is a read that failed rather than a ` +
        `life with nothing in it — the activity circle drawn from it would show an ordinary blank day`
    )
  }
  if (answer.n !== answer.rows.length) {
    throw new Error(
      `${MEASURES_QUERY} counted ${answer.n} days and handed back ${answer.rows.length}, so this ` +
        `reading would have measured the window it was shown rather than the days it was asked for`
    )
  }
  for (const key of NEEDED) {
    const carried = answer.rows.filter((row) => {
      const value = row.values[key]
      return value !== null && value !== undefined
    }).length
    if (carried === 0) {
      throw new Error(
        `${MEASURES_QUERY}: not one of ${answer.rows.length} days carries \`${key}\`, so either ` +
          `the corpus lost it or this reader asked for a spelling the pages do not use — ` +
          `a key spelled the other reader's way comes back null on every row without refusing`
      )
    }
  }
  const found = answer.rows.find((row) => row.values.date === day)
  if (found === undefined) return null
  const sleepMinutes = numberOf(found.values, "sleep-points")
  return {
    activeCalories: numberOf(found.values, "active-calories"),
    strengthVolume: numberOf(found.values, "strength-volume"),
    nutritionPoints: numberOf(found.values, "nutrition-points"),
    sleepHours: sleepMinutes === null ? null : sleepMinutes / MINUTES_PER_HOUR,
  }
}

export async function readDayMeasures(day: string, ask?: Ask): Promise<DayMeasures | null> {
  return measuresFromAnswer(await askOr(ask)(MEASURES_QUERY, {}), day)
}

export function caloriesBySource(samples: readonly HealthSample[]): number | null {
  const totals = new Map<string, number>()
  for (const sample of samples) {
    totals.set(sample.sourceName, (totals.get(sample.sourceName) ?? 0) + sample.value)
  }
  let most: number | null = null
  for (const total of totals.values()) if (most === null || total > most) most = total
  return most
}

export function activityFrom(measured: number | null, day: DayMeasures | null): number | null {
  const cardio = measured ?? day?.activeCalories ?? null
  const strength =
    day?.strengthVolume === null || day?.strengthVolume === undefined
      ? null
      : day.strengthVolume / STRENGTH_PER_CALORIE
  if (cardio === null) return strength
  if (strength === null) return cardio
  return cardio + strength
}

export async function cardioReading(
  day: string,
  span: WakeWindow,
  read?: ReadSamples
): Promise<number | null> {
  let samples: readonly HealthSample[]
  try {
    samples = await samplesOr(read)({
      metric: ACTIVE_ENERGY,
      from: new Date(span.from).toISOString(),
      to: new Date(span.to).toISOString(),
    })
  } catch (cause) {
    throw new Error(
      `activityReading: ${day}: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  return caloriesBySource(samples)
}

export async function activityReading(
  day: string,
  span: WakeWindow,
  measures: DayMeasures | null,
  read?: ReadSamples
): Promise<number | null> {
  if (measures === null) return null
  return activityFrom(await cardioReading(day, span, read), measures)
}
