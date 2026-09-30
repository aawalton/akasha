import {
  dayStrOf,
  MS_PER_DAY,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { getMountainEveningDayStr } from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"
import { mountainWallAt } from "akasha/alan/harness/day-boundary/modules/mountain-wall/mountain-wall.module.code.ts"

const SLEEP = "sleep"

export function dayBefore(day: string): string {
  const parts = parseDay(day)
  if (parts === null) return day
  const [year, month, at] = parts
  return dayStrOf(new Date(Date.UTC(year, month - 1, at) - MS_PER_DAY))
}

export function sleeping(title: string): boolean {
  return title.trim().toLowerCase() === SLEEP
}

function calendarDayOf(at: Date): string {
  const wall = mountainWallAt(at)
  return dayStrOf(new Date(Date.UTC(wall.year, wall.month - 1, wall.day)))
}

export function opensInto(started: string, ended?: string): string {
  const at = new Date(started)
  if (Number.isNaN(at.getTime())) return started
  const opened = getMountainEveningDayStr(at)
  const to = ended === undefined ? null : new Date(ended)
  if (to === null || Number.isNaN(to.getTime())) return opened
  const began = calendarDayOf(at)
  return opened !== began && calendarDayOf(to) === began ? began : opened
}
