import { asNumber } from "akasha/temper/addon/pages/world/collections/modules/treasure-casts/treasure-casts.module.code.ts"
import { TREASURE_DATA } from "akasha/temper/addon/pages/world/collections/modules/treasure-data/treasure-data.module.code.ts"
import { ICONS } from "akasha/temper/addon/pages/world/collections/modules/treasure-icons/treasure-icons.module.code.ts"
import type { PinRecord } from "akasha/temper/addon/pages/world/collections/modules/treasure-types/treasure-types.module.code.ts"

export function getTreasureItemIdData(this: void, itemId: number): PinRecord | undefined {
  return TREASURE_DATA.ITEMS_DATA[itemId]
}

export function getTreasureMapIdData(this: void, mapId: number): PinRecord[] | undefined {
  return TREASURE_DATA.MAP_ID_DATA[mapId]
}

export function getTreasureTextureData(this: void, textureName: string): PinRecord | undefined {
  return TREASURE_DATA.TEXTURE_NAME_DATA[textureName]
}

export function getTreasureBookIdItemId(this: void, _bookId: number): number | undefined {
  const bookId = TREASURE_DATA.BOOK_ID
  return bookId[asNumber(bookId)]
}

export function getTreasureIcons(this: void): string[] {
  return ICONS
}
