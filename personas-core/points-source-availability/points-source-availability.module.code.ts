export const UNAVAILABLE_POINTS_SOURCE_KIND = "unavailable"

export interface PointsSourceAvailabilityRow {
  readonly pointsSourceKind?: string | null | undefined
  readonly title?: string | null | undefined
}

export function pointsSourceMayWrite(row: PointsSourceAvailabilityRow): {
  readonly mayWrite: boolean
  readonly reason: string | null
} {
  if (row.pointsSourceKind !== UNAVAILABLE_POINTS_SOURCE_KIND)
    return { mayWrite: true, reason: null }
  const who = row.title ?? "this persona"
  return {
    mayWrite: false,
    reason: `${who} declares her points source unavailable: the source her domain document names does not exist yet, so no points are written rather than metering a substitute. Her stored total is left as it stands.`,
  }
}
