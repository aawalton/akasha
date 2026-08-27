export function formatDuration(ms: number): string | null {
  if (!Number.isFinite(ms)) return null
  const seconds = Math.max(0, Math.floor(ms / 1000))

  if (seconds < 60) return `${seconds}s`

  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  if (minutes < 10) return `${minutes}m ${remainderSeconds}s`

  if (minutes < 60) return `${minutes}m`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`

  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo`

  const years = Math.floor(days / 365)
  return `${years}y`
}

export function formatRelativeTime(input: Date | string | number): string | null {
  const then = input instanceof Date ? input.getTime() : new Date(input).getTime()
  const delta = Date.now() - then
  const magnitude = formatDuration(Math.abs(delta))
  if (magnitude === null) return null
  if (delta < 0 && magnitude !== "0s") return `in ${magnitude}`
  return magnitude
}

export function needsSecondPrecision(input: Date | string | number): boolean {
  const then = input instanceof Date ? input.getTime() : new Date(input).getTime()
  return Date.now() - then < 600_000
}
