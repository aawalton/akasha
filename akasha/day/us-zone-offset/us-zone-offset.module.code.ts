const MS_PER_HOUR = 3_600_000

function nthWeekdayOfMonth(year: number, month: number, targetDow: number, n: number): number {
  const dowOfFirst = new Date(Date.UTC(year, month, 1)).getUTCDay()
  return 1 + ((targetDow - dowOfFirst + 7) % 7) + (n - 1) * 7
}

function springTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 2, 0, 2)
  return Date.UTC(year, 2, day, 7, 0, 0, 0)
}

function fallTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 10, 0, 1)
  return Date.UTC(year, 10, day, 6, 0, 0, 0)
}

function savingIn(instantMs: number): boolean {
  const year = new Date(instantMs).getUTCFullYear()
  return instantMs >= springTransitionMs(year) && instantMs < fallTransitionMs(year)
}

export function nyOffsetMs(instantMs: number): number {
  return savingIn(instantMs) ? -4 * MS_PER_HOUR : -5 * MS_PER_HOUR
}

export function denverOffsetMs(instantMs: number): number {
  return savingIn(instantMs) ? -6 * MS_PER_HOUR : -7 * MS_PER_HOUR
}
