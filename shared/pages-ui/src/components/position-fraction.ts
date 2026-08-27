export const POSITION_RESUME_MIN_FRACTION = 0.01

export const POSITION_WRITE_EPSILON = 0.005

export function clampFraction(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(1, Math.max(0, value))
}

export function timeToFraction(currentTime: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0
  return clampFraction(currentTime / duration)
}

export function fractionToTime(fraction: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0
  return clampFraction(fraction) * duration
}

export function fractionToScrollTop(fraction: number, scrollable: number): number {
  if (!Number.isFinite(scrollable) || scrollable <= 0) return 0
  return clampFraction(fraction) * scrollable
}

export function resolveResumeFraction(args: {
  readonly localFraction: number | undefined
  readonly rowFraction: number | undefined
}): number | undefined {
  const { localFraction, rowFraction } = args
  if (localFraction !== undefined && Number.isFinite(localFraction))
    return clampFraction(localFraction)
  if (rowFraction !== undefined && Number.isFinite(rowFraction)) return clampFraction(rowFraction)
  return undefined
}

export function decideReadRestore(fraction: number | undefined): number | undefined {
  if (fraction === undefined || !Number.isFinite(fraction)) return undefined
  const clamped = clampFraction(fraction)
  return clamped > POSITION_RESUME_MIN_FRACTION ? clamped : undefined
}

export function decideRestoreReady(args: {
  readonly pagePresent: boolean
  readonly isLoading: boolean
  readonly localLoaded: boolean
  readonly bodyPresent: boolean
}): boolean {
  return args.pagePresent && !args.isLoading && args.localLoaded && args.bodyPresent
}
