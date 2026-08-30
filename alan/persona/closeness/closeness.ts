import { DEFAULT_GREEN_DAY_POINTS } from "../../../readouts/ring/ladder/ladder.ts"

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
