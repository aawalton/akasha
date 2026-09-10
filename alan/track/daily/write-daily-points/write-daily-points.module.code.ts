import type { Page } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { DAILY_TRACKING, landDayPage } from "../day-place/day-place.module.code.ts"
import { dayByDate } from "../day-reading/day-reading.module.code.ts"

export type WriteOutcome = "patched" | "created" | "unchanged"

export const POINTS_WRITER = "daily-tracking-points"

const DAILY_TRACKING_VERSION = "3.0"

const DAY_KEY_OF: Readonly<Record<string, string>> = {
  activeCalories: "active-calories",
  bodyweight: "bodyweight",
  sleepPoints: "sleep-points",
  nutritionPoints: "nutrition-points",
  taskPoints: "task-points",
  breathingPoints: "breathing-points",
  wisdomWords: "wisdom-words",
  intelligenceTopics: "intelligence-topics",
}

export function alreadyCarried(held: Page | null, field: string, value: number): boolean {
  if (held === null) return false
  const carried = held[field]
  return typeof carried === "number" && carried === value
}

export async function writeDailyReading(
  dayStr: string,
  field: string,
  value: number
): Promise<WriteOutcome> {
  const key = DAY_KEY_OF[field]
  if (key === undefined) {
    throw new Error(
      `\`${field}\` is not a reading a \`${DAILY_TRACKING}\` day carries — the day keys are ` +
        `${Object.keys(DAY_KEY_OF).join(", ")}, and landing an unknown one would put a property ` +
        "on Alan's day that no reader of it asks for"
    )
  }
  if (!Number.isFinite(value)) {
    throw new Error(
      `the ${field} for ${dayStr} came out ${value}, which is no reading — landing it would ` +
        "state a failed computation as a measurement"
    )
  }

  const held = await dayByDate(dayStr)
  const created = held === null || held.id === ""
  if (!created && alreadyCarried(held, field, value)) return "unchanged"
  const identity = created
    ? {
        id: Bun.randomUUIDv7(),
        title: `@date:${dayStr}`,
        date: dayStr,
        version: DAILY_TRACKING_VERSION,
      }
    : {}

  const landed = await landDayPage("patch", dayStr, { ...identity, [key]: value }, POINTS_WRITER)
  if (!landed.ok) {
    throw new Error(`the ${field} for ${dayStr} did not land: ${landed.why}`)
  }
  return created ? "created" : "patched"
}

export function writeActiveCalories(dayStr: string, activeCalories: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "activeCalories", activeCalories)
}

export function writeSleepPoints(dayStr: string, sleepPoints: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "sleepPoints", sleepPoints)
}

export function writeNutritionPoints(
  dayStr: string,
  nutritionPoints: number
): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "nutritionPoints", nutritionPoints)
}

export function writeTaskPoints(dayStr: string, taskPoints: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "taskPoints", taskPoints)
}

export function writeBreathingPoints(
  dayStr: string,
  breathingPoints: number
): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "breathingPoints", breathingPoints)
}

export function writeWisdomWords(dayStr: string, wisdomWords: number): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "wisdomWords", wisdomWords)
}

export function writeIntelligenceTopics(
  dayStr: string,
  intelligenceTopics: number
): Promise<WriteOutcome> {
  return writeDailyReading(dayStr, "intelligenceTopics", intelligenceTopics)
}
