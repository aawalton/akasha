export const CLASS_ESO_ID_TO_INDEX: Record<number, number> = {
  [117]: 0,
  [1]: 1,
  [5]: 2,
  [3]: 3,
  [2]: 5,
  [6]: 6,
  [4]: 7,
}
export const CLASS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [117]: "arcanist",
  [1]: "dragonknight",
  [5]: "necromancer",
  [3]: "nightblade",
  [2]: "sorcerer",
  [6]: "templar",
  [4]: "warden",
}
export function getClassIndex(esoClassId: number): number {
  return CLASS_ESO_ID_TO_INDEX[esoClassId] ?? 0
}
export function getClassTemperId(esoClassId: number): string {
  return CLASS_ESO_ID_TO_TEMPER_ID[esoClassId] ?? "no-class"
}
