export type SurfaceLevel = 0 | 1 | 2 | 3 | 4

export function clampSurfaceLevel(level: number): SurfaceLevel {
  const clamped = Math.max(0, Math.min(4, Math.round(level)))
  switch (clamped) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 3
    default:
      return 4
  }
}

const SURFACE_CLASSES = [
  "bg-surface-0",
  "bg-surface-1",
  "bg-surface-2",
  "bg-surface-3",
  "bg-surface-4",
] as const satisfies Record<SurfaceLevel, string>

export function surfaceClass(level: number): string {
  return SURFACE_CLASSES[clampSurfaceLevel(level)]
}
