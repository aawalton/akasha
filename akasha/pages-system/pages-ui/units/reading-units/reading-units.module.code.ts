export const WORDS_PER_MINUTE = 250

export function wordsToMinutes(words: number): number {
  return Math.round(words / WORDS_PER_MINUTE)
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = (minutes / 60).toFixed(1).replace(/\.0$/, "")
  return `${hours}h`
}

export function formatDisplayValue(words: number, lengthUnits?: string): string {
  if (lengthUnits === "Minutes") return formatDuration(wordsToMinutes(words))
  return words.toLocaleString()
}

export function formatCollectionProgress(
  progress: number,
  length: number,
  lengthUnits?: string
): string {
  const remaining = Math.max(0, length - progress)
  if (lengthUnits === "Minutes") return formatDuration(wordsToMinutes(remaining))
  return `${remaining.toLocaleString()} words`
}
