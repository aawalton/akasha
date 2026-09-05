import { dayStrOf, MS_PER_DAY, parseDay } from "@akasha/day/day-string"
import { getEsoDayStr } from "@akasha/day/eso-day"

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

export function wokeInto(ended: string): string {
  return getEsoDayStr(new Date(ended))
}
