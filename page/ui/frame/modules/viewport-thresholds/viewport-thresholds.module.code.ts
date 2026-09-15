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

export interface ComputeAnchorBelowViewportInput {
  readonly anchorTop: number
  readonly innerHeight: number
  readonly threshold: number
}

export function computeAnchorBelowViewport({
  anchorTop,
  innerHeight,
  threshold,
}: ComputeAnchorBelowViewportInput): boolean {
  return anchorTop > innerHeight - threshold
}
