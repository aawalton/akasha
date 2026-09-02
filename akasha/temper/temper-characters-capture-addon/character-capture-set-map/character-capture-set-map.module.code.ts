import { SET_ESO_ID_TO_INDEX_00 } from "../character-capture-set-index-00/character-capture-set-index-00.module.code.ts"
import { SET_ESO_ID_TO_TEMPER_ID_00 } from "../character-capture-set-name-00/character-capture-set-name-00.module.code.ts"
import { SET_ESO_ID_TO_TEMPER_ID_01 } from "../character-capture-set-name-01/character-capture-set-name-01.module.code.ts"

export const SET_ESO_ID_TO_INDEX: Record<number, number> = {
  ...SET_ESO_ID_TO_INDEX_00,
}

export const SET_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  ...SET_ESO_ID_TO_TEMPER_ID_00,
  ...SET_ESO_ID_TO_TEMPER_ID_01,
}

export function getSetIndex(esoSetId: number): number {
  return SET_ESO_ID_TO_INDEX[esoSetId] ?? 0
}
export function getSetTemperId(esoSetId: number): string {
  return SET_ESO_ID_TO_TEMPER_ID[esoSetId] ?? "no-set"
}
