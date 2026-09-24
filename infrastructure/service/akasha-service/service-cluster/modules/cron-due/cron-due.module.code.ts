const A_MINUTE = 60_000
const AN_HOUR = 60 * A_MINUTE
const A_DAY = 24 * AN_HOUR
const LOOK_BACK_DAYS = 366
const ANY = "*"
const SUNDAY_AGAIN = 7

export type Cron = {
  readonly minutes: ReadonlySet<number>
  readonly hours: ReadonlySet<number>
  readonly days: ReadonlySet<number>
  readonly months: ReadonlySet<number>
  readonly weekdays: ReadonlySet<number>
  readonly anyDay: boolean
  readonly anyWeekday: boolean
}

function rangeIn(range: string, low: number, high: number, stepped: boolean): [number, number] {
  if (range === ANY) return [low, high]
  const [from, to] = range.split("-")
  const start = Number(from)
  if (to !== undefined) return [start, Number(to)]
  return [start, stepped ? high : start]
}

export function fieldIn(said: string, low: number, high: number): ReadonlySet<number> | null {
  const found = new Set<number>()
  for (const part of said.split(",")) {
    const [range = "", stepText] = part.split("/")
    const step = stepText === undefined ? 1 : Number(stepText)
    if (!Number.isInteger(step) || step < 1) return null
    const [from, to] = rangeIn(range, low, high, stepText !== undefined)
    if (!Number.isInteger(from) || !Number.isInteger(to)) return null
    if (from < low || to > high || from > to) return null
    for (let one = from; one <= to; one += step) found.add(one)
  }
  return found
}

export function cronIn(schedule: string): Cron | null {
  const parts = schedule.trim().split(/\s+/)
  if (parts.length !== 5) return null
  const [minute = "", hour = "", day = "", month = "", weekday = ""] = parts
  const minutes = fieldIn(minute, 0, 59)
  const hours = fieldIn(hour, 0, 23)
  const days = fieldIn(day, 1, 31)
  const months = fieldIn(month, 1, 12)
  const said = fieldIn(weekday, 0, SUNDAY_AGAIN)
  if (minutes === null || hours === null || days === null || months === null || said === null) {
    return null
  }
  const weekdays = new Set([...said].map((one) => one % SUNDAY_AGAIN))
  return {
    minutes,
    hours,
    days,
    months,
    weekdays,
    anyDay: day.startsWith(ANY),
    anyWeekday: weekday.startsWith(ANY),
  }
}

function dayIn(cron: Cron, at: Date): boolean {
  if (!cron.months.has(at.getUTCMonth() + 1)) return false
  const day = cron.days.has(at.getUTCDate())
  const weekday = cron.weekdays.has(at.getUTCDay())
  if (cron.anyDay) return weekday
  if (cron.anyWeekday) return day
  return day || weekday
}

export function lastDue(schedule: string, before: Date): Date | null {
  const cron = cronIn(schedule)
  if (cron === null) return null
  let at = Math.floor(before.getTime() / A_MINUTE) * A_MINUTE
  const stop = at - LOOK_BACK_DAYS * A_DAY
  while (at >= stop) {
    const moment = new Date(at)
    if (!dayIn(cron, moment)) {
      at = Math.floor(at / A_DAY) * A_DAY - A_MINUTE
      continue
    }
    if (!cron.hours.has(moment.getUTCHours())) {
      at = Math.floor(at / AN_HOUR) * AN_HOUR - A_MINUTE
      continue
    }
    if (cron.minutes.has(moment.getUTCMinutes())) return moment
    at -= A_MINUTE
  }
  return null
}
