const ALLIANCE_ESO_ID_TO_INDEX: Record<number, number> = {
  [1]: 1,
  [2]: 2,
  [3]: 3,
}
export function getAllianceIndex(esoAllianceId: number): number {
  return ALLIANCE_ESO_ID_TO_INDEX[esoAllianceId] ?? 0
}
