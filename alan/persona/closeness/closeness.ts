import { DEFAULT_GREEN_DAY_POINTS } from "../../../readouts/ring/ladder/ladder.ts"

export const STAGES = [
  "Initiating",
  "Experimenting",
  "Intensifying",
  "Integrating",
  "Bonding",
] as const

export type Stage = (typeof STAGES)[number]

export interface LevelImagery {
  readonly closeness: string
  readonly wardrobe: string
  readonly pose: string
}

export interface LadderLevel extends LevelImagery {
  readonly level: number
  readonly stage: string
}

export const LEVELS: readonly LadderLevel[] = [
  {
    level: 1,
    stage: "Initiating",
    closeness: "Public-facing: out in the world, composed, observed framing.",
    wardrobe: "Polished public wear — street or outdoor, seasonal, nothing private.",
    pose:
      "Composed and self-contained, mid-activity in the world; observed-moment framing, " +
      "no held address to the lens.",
  },
  {
    level: 2,
    stage: "Experimenting",
    closeness: "Shared experiences: dates, travel, activities — the camera is *with* her.",
    wardrobe:
      "Casual date or day wear — a sundress, jeans and a knit, an activity fit; still fully public.",
    pose:
      "Oriented to the camera as a companion — beside her walking, across the table, being shown " +
      "something; inclusion gestures like leaning in laughing or beckoning.",
  },
  {
    level: 3,
    stage: "Intensifying",
    closeness: "Relaxed and personal: at home, loungewear, playful, unposed, close-ups.",
    wardrobe:
      "Loungewear and comfort layers — an oversized hoodie, a tee, soft knits, hair down, barefoot fine.",
    pose: "Unposed at home — curled on the couch, cross-legged, a doorway lean; close-ups welcome.",
  },
  {
    level: 4,
    stage: "Integrating",
    closeness: "Interwoven daily life: unguarded domestic ordinary, partner-only imagery.",
    wardrobe:
      "The truly private layer — sleepwear, his shirt, a robe, towel-dried hair, a bare face.",
    pose:
      "Domestic ordinary from the partner vantage — reading in bed, morning coffee, cooking; " +
      "casual physical-affection framing toward the unseen viewer.",
  },
  {
    level: 5,
    stage: "Bonding",
    closeness: "Full intimacy and trust.",
    wardrobe:
      "Intimate — lingerie, partial undress, bare skin framed with intent; implied, not shown.",
    pose:
      "Bedroom or enclosed, reclined or close, fully oriented to the unseen viewer inside the guard; " +
      "invitation in the posture.",
  },
  {
    level: 6,
    stage: "Bonding",
    closeness: "Full explicit intimacy where the scene calls for it — inside the guard, unveiled.",
    wardrobe: "Undress — nudity and explicit presentation where the scene calls for it.",
    pose: "Fully explicit intimacy permitted; she holds the frame, oriented to the viewer; nothing clinical.",
  },
]

export const GREEN_BASELINE_DAYS: readonly number[] = [7, 42, 180, 540]

export const SOURCE_POINTS_FIELD = "sourcePoints"

export function levelForPoints(
  totalPoints: number,
  schedule: readonly number[] = GREEN_BASELINE_DAYS,
  greenDayPoints: number = DEFAULT_GREEN_DAY_POINTS
): number {
  const points = Math.max(totalPoints, 0)
  let cumulativeDays = 0
  let level = 1
  for (const stepDays of schedule) {
    cumulativeDays += stepDays
    if (points >= cumulativeDays * greenDayPoints) level++
    else break
  }
  return level
}

export function percentProgressForPoints(
  totalPoints: number,
  schedule: readonly number[] = GREEN_BASELINE_DAYS,
  greenDayPoints: number = DEFAULT_GREEN_DAY_POINTS
): number {
  const points = Math.max(totalPoints, 0)
  let lowerDays = 0
  for (const stepDays of schedule) {
    const upperDays = lowerDays + stepDays
    if (points < upperDays * greenDayPoints) {
      const lower = lowerDays * greenDayPoints
      const width = stepDays * greenDayPoints
      return ((points - lower) / width) * 100
    }
    lowerDays = upperDays
  }
  return 100
}

export function levelForGreenDays(
  greenDays: number,
  schedule: readonly number[] = GREEN_BASELINE_DAYS
): number {
  const days = Math.max(greenDays, 0)
  let cumulative = 0
  let level = 1
  for (const stepDays of schedule) {
    cumulative += stepDays
    if (days >= cumulative) level++
    else break
  }
  return level
}

export function percentProgressForGreenDays(
  greenDays: number,
  schedule: readonly number[] = GREEN_BASELINE_DAYS
): number {
  const days = Math.max(greenDays, 0)
  let lowerDays = 0
  for (const stepDays of schedule) {
    const upperDays = lowerDays + stepDays
    if (days < upperDays) return ((days - lowerDays) / stepDays) * 100
    lowerDays = upperDays
  }
  return 100
}

export function clampLevel(level: number): number {
  return Math.min(Math.max(level, 1), STAGES.length)
}
