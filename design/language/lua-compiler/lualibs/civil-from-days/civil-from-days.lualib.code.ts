export interface CivilDate {
  year: number
  month1: number
  day: number
}

export function __TS__CivilFromDays(this: void, days: number): CivilDate {
  const shifted = days + 719468
  const era = Math.floor((shifted >= 0 ? shifted : shifted - 146096) / 146097)
  const doe = shifted - era * 146097
  const yoe = Math.floor(
    (doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365
  )
  const y = yoe + era * 400
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100))
  const mp = Math.floor((5 * doy + 2) / 153)
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1
  const m = mp < 10 ? mp + 3 : mp - 9
  const year = y + (m <= 2 ? 1 : 0)
  return { year, month1: m, day: d }
}
