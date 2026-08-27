export interface ComputePinnedInput {
  readonly scrollHeight: number
  readonly scrollY: number
  readonly innerHeight: number
  readonly threshold: number
}

export function computePinned({
  scrollHeight,
  scrollY,
  innerHeight,
  threshold,
}: ComputePinnedInput): boolean {
  const distanceFromBottom = scrollHeight - scrollY - innerHeight
  return distanceFromBottom <= threshold
}
