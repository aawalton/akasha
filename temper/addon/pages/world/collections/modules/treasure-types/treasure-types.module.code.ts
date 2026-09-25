import type {
  PIN_TYPE_CLUES,
  PIN_TYPE_SURVEYS,
  PIN_TYPE_TREASURE,
} from "akasha/temper/addon/pages/world/collections/modules/treasure-constants/treasure-constants.module.code.ts"

type PinType = typeof PIN_TYPE_TREASURE | typeof PIN_TYPE_SURVEYS | typeof PIN_TYPE_CLUES

type PinLayout = readonly [x: number, y: number, texture: string, itemId: number]

export type AllData = Record<number, Partial<Record<PinType, readonly PinLayout[]>>>

export interface PinRecord {
  itemId: number
  mapId: number
  pinType: PinType
  x: number
  y: number
  texture: string
}

export interface TreasureData {
  ITEMS_DATA: Record<number, PinRecord>
  MAP_ID_DATA: Record<number, PinRecord[]>
  TEXTURE_NAME_DATA: Record<string, PinRecord>
  BOOK_ID: Record<number, number>
}
