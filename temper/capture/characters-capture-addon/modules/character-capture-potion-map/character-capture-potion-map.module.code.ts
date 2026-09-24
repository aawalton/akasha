import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import { parseLuaCapture } from "akasha/temper/addon/shared/narrow/modules/parse-lua-capture/parse-lua-capture.module.code.ts"

const POTION_ITEM_ID_TO_INDEX: Record<number, number> = {
  [64710]: 1,
  [112427]: 2,
  [112428]: 3,
  [124674]: 4,
  [27036]: 5,
  [27037]: 6,
  [27038]: 7,
  [176041]: 8,
  [176040]: 9,
  [176042]: 10,
}
const POTION_ENCODED_TRAITS_TO_INDEX: Record<number, number> = {
  [8849689]: 11,
  [8456477]: 12,
  [8984861]: 13,
  [9772288]: 14,
  [8455433]: 15,
  [9902363]: 16,
  [8454917]: 17,
  [8586519]: 18,
  [8722207]: 19,
  [8722203]: 20,
  [8719639]: 21,
  [8719633]: 22,
  [8459805]: 23,
  [8458006]: 24,
  [8454919]: 25,
  [8587029]: 26,
  [8454927]: 27,
  [8455945]: 28,
  [8587033]: 29,
  [10165535]: 30,
  [8586517]: 31,
  [8588053]: 32,
  [8720661]: 33,
  [8586527]: 34,
  [8455441]: 35,
  [8588047]: 36,
  [8458001]: 37,
  [9837343]: 38,
  [9836319]: 39,
  [9903391]: 40,
  [9836317]: 41,
  [9902879]: 42,
  [8589079]: 43,
  [8591129]: 44,
  [9836315]: 45,
}
export function parsePotionData(itemLink: string): number {
  const [potionCapture] = string.match(itemLink, ":(%d+)|h")
  const potionData = parseLuaCapture(potionCapture)
  if (potionData !== undefined) {
    return tonumber(potionData) ?? 0
  }
  return 0
}
export function getPotionIndex(itemId: number, encodedTraits: number): number {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_INDEX[encodedTraits] ?? 0
  }
  return POTION_ITEM_ID_TO_INDEX[itemId] ?? 0
}
