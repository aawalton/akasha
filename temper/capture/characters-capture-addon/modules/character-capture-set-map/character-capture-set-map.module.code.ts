import { SET_ESO_ID_TO_INDEX_00 } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-set-index-00/character-capture-set-index-00.module.code.ts"

const SET_ESO_ID_TO_INDEX: Record<number, number> = {
  ...SET_ESO_ID_TO_INDEX_00,
}

export function getSetIndex(esoSetId: number): number {
  return SET_ESO_ID_TO_INDEX[esoSetId] ?? 0
}
