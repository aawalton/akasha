export function computeReadProgress(args: {
  readonly scrollFraction: number
  readonly wordCount: number
  readonly currentProgress: number | undefined
}): number | undefined {
  const { scrollFraction, wordCount, currentProgress } = args
  if (!Number.isFinite(wordCount) || wordCount <= 0) return undefined
  const frac = Math.min(1, Math.max(0, Number.isFinite(scrollFraction) ? scrollFraction : 0))
  const raw = Math.round(frac * wordCount)
  const clamped = Math.min(wordCount, Math.max(0, raw))
  const current =
    currentProgress !== undefined && Number.isFinite(currentProgress) ? currentProgress : 0
  const next = Math.max(current, clamped)
  return next > current ? next : undefined
}
