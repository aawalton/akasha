export const DEFAULT_REEXEC_MAX_JITTER_MS = 60_000

export function computeReExecJitterMs(randFloat: number, maxJitterMs: number): number {
  if (!Number.isFinite(maxJitterMs) || maxJitterMs <= 0) return 0
  const clampedRand = Number.isFinite(randFloat) && randFloat > 0 ? Math.min(randFloat, 1) : 0
  return Math.floor(clampedRand * maxJitterMs)
}

export function resolveMaxReExecJitterMs(raw: string | undefined): number {
  if (raw == null || raw.trim() === "") return DEFAULT_REEXEC_MAX_JITTER_MS
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_REEXEC_MAX_JITTER_MS
  return Math.floor(parsed)
}
