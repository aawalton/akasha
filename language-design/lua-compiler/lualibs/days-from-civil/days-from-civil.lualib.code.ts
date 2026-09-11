export function __TS__DaysFromCivil(this: void, year: number, month1: number, day: number): number {
  const yAdj = month1 <= 2 ? year - 1 : year
  const era = Math.floor(yAdj / 400)
  const yoe = yAdj - era * 400
  const monthIndex = month1 > 2 ? month1 - 3 : month1 + 9
  const doy = Math.floor((153 * monthIndex + 2) / 5) + day - 1
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy
  return era * 146097 + doe - 719468
}
