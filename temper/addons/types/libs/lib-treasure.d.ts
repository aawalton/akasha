interface LibTreasureMapRecord {
  itemId: number
  pinType: string
  x: number
  y: number
}

interface LibTreasureTextureRecord {
  itemId: number
}

declare function LibTreasure_GetIcons(this: void): string[]

declare function LibTreasure_GetTextureData(
  this: void,
  mapTextureName: string
): LibTreasureTextureRecord | undefined

declare function LibTreasure_GetBookIdItemId(this: void, bookId: number): number | undefined

declare function LibTreasure_GetMapIdData(
  this: void,
  mapId: number
): LibTreasureMapRecord[] | undefined

declare function LibTreasure_GetItemIdData(
  this: void,
  itemId: number
): LibTreasureTextureRecord | undefined
