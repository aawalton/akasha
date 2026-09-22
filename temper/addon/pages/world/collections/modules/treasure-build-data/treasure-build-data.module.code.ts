import { BOOK_ID } from "akasha/temper/addon/pages/world/collections/modules/treasure-book-ids/treasure-book-ids.module.code.ts"
import { ALL_DATA } from "akasha/temper/addon/pages/world/collections/modules/treasure-pins-data/treasure-pins-data.module.code.ts"
import type {
  PinRecord,
  TreasureData,
} from "akasha/temper/addon/pages/world/collections/modules/treasure-types/treasure-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function buildDerivedData(this: void): TreasureData {
  const itemsData: Record<number, PinRecord> = {}
  const mapIdData: Record<number, PinRecord[]> = {}
  const textureData: Record<string, PinRecord> = {}

  for (const [mapId, pinTypeData] of pairs(ALL_DATA)) {
    const currentMapIdData: PinRecord[] = []
    mapIdData[mapId] = currentMapIdData
    for (const [pinType, pinData] of pairs(pinTypeData)) {
      if (pinData === undefined) continue
      for (const [, pinLayout] of ipairs(pinData)) {
        const [x, y, texture, itemId] = pinLayout
        const newPin: PinRecord = { itemId, mapId, pinType, x, y, texture }
        itemsData[itemId] = newPin
        currentMapIdData[currentMapIdData.length] = newPin
        textureData[texture] = newPin
      }
    }
  }

  return {
    ITEMS_DATA: itemsData,
    MAP_ID_DATA: mapIdData,
    TEXTURE_NAME_DATA: textureData,
    BOOK_ID,
  }
}
