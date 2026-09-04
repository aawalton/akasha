const MS_PER_HOUR = 3_600_000

function nthWeekdayOfMonth(year: number, month: number, targetDow: number, n: number): number {
  const dowOfFirst = new Date(Date.UTC(year, month, 1)).getUTCDay()
  return 1 + ((targetDow - dowOfFirst + 7) % 7) + (n - 1) * 7
}

function savingIn(instantMs: number, standardHours: number): boolean {
  const year = new Date(instantMs).getUTCFullYear()
  const spring = Date.UTC(year, 2, nthWeekdayOfMonth(year, 2, 0, 2), 2 + standardHours, 0, 0, 0)
  const fall = Date.UTC(year, 10, nthWeekdayOfMonth(year, 10, 0, 1), 1 + standardHours, 0, 0, 0)
  return instantMs >= spring && instantMs < fall
}

export function nyOffsetMs(instantMs: number): number {
  return savingIn(instantMs, 5) ? -4 * MS_PER_HOUR : -5 * MS_PER_HOUR
}

export function denverOffsetMs(instantMs: number): number {
  return savingIn(instantMs, 7) ? -6 * MS_PER_HOUR : -7 * MS_PER_HOUR
}
