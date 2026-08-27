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
