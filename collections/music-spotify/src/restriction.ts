const RESTRICTION_MARKERS = [
  { marker: "spotify API 403", status: 403 },
  { marker: "spotify API 404", status: 404 },
] as const

export interface AvailableResult<T> {
  readonly available: true
  readonly data: T
}

export interface RestrictedResult {
  readonly available: false
  readonly status: number
}

export type RestrictionOutcome<T> = AvailableResult<T> | RestrictedResult

export async function attemptOrRecordRestriction<T>(
  attempt: () => Promise<T>
): Promise<RestrictionOutcome<T>> {
  try {
    return { available: true, data: await attempt() }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const hit = RESTRICTION_MARKERS.find((m) => message.includes(m.marker))
    if (hit != null) return { available: false, status: hit.status }
    throw err
  }
}
