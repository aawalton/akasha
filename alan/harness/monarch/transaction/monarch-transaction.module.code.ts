export interface Subject {
  readonly monarchId: string
  readonly merchant: string
  readonly statement: string
  readonly account: string
  readonly amount: number
  readonly date: string
}

export const DESCRIPTION_JOIN = "\n"

export function descriptionOf(subject: Pick<Subject, "merchant" | "statement">): string {
  return `${subject.merchant}${DESCRIPTION_JOIN}${subject.statement}`
}

export function cents(amount: number): number {
  return Math.round(amount * 100)
}

const DAY_MS = 86_400_000

function dayNumber(date: string): number {
  const at = Date.parse(`${date.slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(at)) {
    throw new Error(`"${date}" is not a date, so no window can be measured against it`)
  }
  return Math.round(at / DAY_MS)
}

export function dayGap(a: string, b: string): number {
  return Math.abs(dayNumber(a) - dayNumber(b))
}

const LAST_FOUR = /\(\.\.\.(\d{4})\)\s*$/

export function accountKey(title: string): string {
  const found = LAST_FOUR.exec(title.trim())
  return found?.[1] ?? title.trim().toLowerCase()
}

export const UNCATEGORIZED = "Uncategorized"

export function answered(standingCategory: string): boolean {
  return standingCategory !== "" && standingCategory !== UNCATEGORIZED
}

export const TRUSTED_MONTHS = 12

export function trustedFrom(now: Date = new Date()): string {
  const at = new Date(now.getTime())
  at.setUTCMonth(at.getUTCMonth() - TRUSTED_MONTHS)
  return at.toISOString().slice(0, 10)
}

export const UNATTENDED_DAYS = 7

export function unattendedFrom(now: Date = new Date()): string {
  const at = new Date(now.getTime())
  at.setUTCDate(at.getUTCDate() - UNATTENDED_DAYS)
  return at.toISOString().slice(0, 10)
}
