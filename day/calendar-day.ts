const DAY_MS = 86_400_000
const NOON = 12

function parseDay(dayStr: string): readonly [number, number, number] | null {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) return null
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null
  return [y, m, d]
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

export function dayAfter(dayStr: string): string {
  const parsed = parseDay(dayStr)
  if (parsed === null) return dayStr
  const [y, m, d] = parsed
  const at = new Date(Date.UTC(y, m - 1, d, NOON, 0, 0, 0) + DAY_MS)
  return `${at.getUTCFullYear()}-${pad2(at.getUTCMonth() + 1)}-${pad2(at.getUTCDate())}`
}
