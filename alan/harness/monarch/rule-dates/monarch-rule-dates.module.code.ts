import { array, num, optional, str } from "../shape/monarch-shape.module.code.ts"

export interface DateClauses {
  readonly onOrAfter: string | null
  readonly before: string | null
  readonly monthIs: readonly number[]
  readonly monthIsNot: readonly number[]
}

const YYYY_MM_DD = /^\d{4}-\d{2}-\d{2}$/

export function dateClausesMatch(clauses: DateClauses, date: string): boolean {
  if (clauses.onOrAfter !== null && date < clauses.onOrAfter) return false
  if (clauses.before !== null && date >= clauses.before) return false
  const month = Number.parseInt(date.slice(5, 7), 10)
  if (clauses.monthIsNot.includes(month)) return false
  if (clauses.monthIs.length === 0) return true
  return clauses.monthIs.includes(month)
}

export function checkedDateClauses(name: string, clauses: DateClauses): void {
  const floor = clauses.onOrAfter
  if (floor !== null && !YYYY_MM_DD.test(floor)) {
    throw new Error(`rule "${name}" floors at "${floor}", which is not a YYYY-MM-DD date`)
  }
  const ceiling = clauses.before
  if (ceiling !== null && !YYYY_MM_DD.test(ceiling)) {
    throw new Error(`rule "${name}" stops before "${ceiling}", which is not a YYYY-MM-DD date`)
  }
  if (floor !== null && ceiling !== null && ceiling <= floor) {
    throw new Error(
      `rule "${name}" floors at ${floor} and stops before ${ceiling}, so no day satisfies both`
    )
  }
  for (const month of [...clauses.monthIs, ...clauses.monthIsNot]) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new Error(`rule "${name}" names month ${month}; a calendar month is 1 to 12`)
    }
  }
}

export function dateFloorFrom(value: unknown, path: string): string | null {
  const floor = optional(value, path, str)
  return floor === null || floor === "" ? null : floor
}

export function monthListFrom(value: unknown, path: string): readonly number[] {
  if (value === undefined || value === null || value === "") return []
  const entries = Array.isArray(value) ? value : [value]
  return array(entries, path).map((entry, i) => {
    const at = `${path}[${i}]`
    if (typeof entry === "string") {
      const parsed = Number.parseInt(entry, 10)
      if (!Number.isFinite(parsed)) throw new Error(`${at}: "${entry}" is not a month number`)
      return parsed
    }
    return num(entry, at)
  })
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

/** The calendar number of a month named in a rule's `month` clause, which names it in words. */
export function monthNumberFrom(name: string, at: string): number {
  const found = MONTHS.findIndex((one) => one.toLowerCase() === name.trim().toLowerCase())
  if (found < 0) throw new Error(`${at}: "${name}" is not a month`)
  return found + 1
}

export function describeDateClauses(clauses: DateClauses): readonly string[] {
  const parts: string[] = []
  if (clauses.onOrAfter !== null) parts.push(`date >= ${clauses.onOrAfter}`)
  if (clauses.before !== null) parts.push(`date < ${clauses.before}`)
  if (clauses.monthIsNot.length > 0) {
    const named = clauses.monthIsNot.map((month) => MONTHS[month - 1] ?? String(month))
    parts.push(`month != ${named.join(" and ")}`)
  }
  if (clauses.monthIs.length > 0) {
    const named = clauses.monthIs.map((month) => MONTHS[month - 1] ?? String(month))
    parts.push(`month = ${named.join(" or ")}`)
  }
  return parts
}
