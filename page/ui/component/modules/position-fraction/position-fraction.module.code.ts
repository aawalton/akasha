const POSITION_RESUME_MIN_FRACTION = 0.01

export function clampFraction(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(1, Math.max(0, value))
}

export function fractionToScrollTop(fraction: number, scrollable: number): number {
  if (!Number.isFinite(scrollable) || scrollable <= 0) return 0
  return clampFraction(fraction) * scrollable
}

export function decideReadRestore(fraction: number | undefined): number | undefined {
  if (fraction === undefined || !Number.isFinite(fraction)) return undefined
  const clamped = clampFraction(fraction)
  return clamped > POSITION_RESUME_MIN_FRACTION ? clamped : undefined
}

export function decideRestoreReady(args: {
  readonly pagePresent: boolean
  readonly isLoading: boolean
  readonly bodyPresent: boolean
}): boolean {
  return args.pagePresent && !args.isLoading && args.bodyPresent
}
