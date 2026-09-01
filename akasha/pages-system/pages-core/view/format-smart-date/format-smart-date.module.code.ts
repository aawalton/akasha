import { diffEsoDays, getEsoDayStr } from "@akasha/day/eso-day"

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function parseCalendarDate(
  dateStr: string
): { year: number; month: number; day: number; dayOfWeek: number } | null {
  if (!DATE_REGEX.test(dateStr)) return null
  const [year, month, day] = dateStr.split("-").map(Number)
  if (year === undefined || month === undefined || day === undefined) return null
  const utc = new Date(Date.UTC(year, month - 1, day))
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    return null
  }
  return { year, month, day, dayOfWeek: utc.getUTCDay() }
}

export function formatSmartDate(dateStr: string, now?: Date): string {
  const target = parseCalendarDate(dateStr)
  if (!target) return dateStr

  const today = getEsoDayStr(now ?? new Date())
  const diffDays = diffEsoDays(dateStr, today)

  if (diffDays === 0) return "Today"
  if (diffDays === -1) return "Yesterday"
  if (diffDays === 1) return "Tomorrow"

  const dayName = DAY_NAMES[target.dayOfWeek] ?? ""

  if (diffDays >= -6 && diffDays <= -2) return `Last ${dayName}`
  if (diffDays >= 2 && diffDays <= 6) return `Next ${dayName}`

  const dd = String(target.day).padStart(2, "0")
  const month = MONTH_NAMES[target.month - 1] ?? ""
  return `${dd} ${month} ${target.year}`
}
