export const GREEN_DAY_POINTS_FIELD = "greenDayPoints"

export interface PersonaGreenDayPoints {
  readonly slug?: string | null | undefined
  readonly greenDayPoints?: number | null | undefined
}

export function greenDayPointsOf(persona: PersonaGreenDayPoints): number {
  const who = persona.slug ?? "a persona naming no slug"
  const stated = persona.greenDayPoints
  if (stated === undefined || stated === null) {
    throw new Error(
      `${who} states no ${GREEN_DAY_POINTS_FIELD}, so nothing is scored for her rather than her day being scored against a substituted figure`
    )
  }
  if (!Number.isFinite(stated) || stated <= 0) {
    throw new Error(`${who} states a ${GREEN_DAY_POINTS_FIELD} no day's points can be read against`)
  }
  return stated
}
