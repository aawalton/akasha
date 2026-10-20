import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
const ENCHANT_SUBTYPE_TO_QUALITY_INDEX: Record<number, number> = {
  [359]: 1,
  [360]: 2,
  [362]: 3,
  [363]: 4,
  [364]: 5,
  [365]: 1,
  [366]: 2,
  [367]: 3,
  [368]: 3,
  [369]: 4,
  [370]: 5,
}

const ENCHANT_SUBTYPE_LIMIT = 512

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

function linkEnchantSubtype(itemLink: string): number | undefined {
  const [capture] = string.match(itemLink, ":item:%d+:%d+:%d+:%d+:(%d+)")
  return tonumber(parseLuaCapture(capture))
}

export function getEnchantQualityIndex(itemLink: string): number {
  const enchantSubType = linkEnchantSubtype(itemLink)
  if (enchantSubType === undefined) return 5
  return ENCHANT_SUBTYPE_TO_QUALITY_INDEX[enchantSubType] ?? 5
}

export function getEnchantSubtype(itemLink: string): number {
  const enchantSubType = linkEnchantSubtype(itemLink)
  if (enchantSubType === undefined || enchantSubType >= ENCHANT_SUBTYPE_LIMIT) return 0
  return enchantSubType
}

const ENCHANT_LEVEL_LIMIT = 64

export function getEnchantLevel(itemLink: string): number {
  const [capture] = string.match(itemLink, ":item:%d+:%d+:%d+:%d+:%d+:(%d+)")
  const enchantLevel = tonumber(parseLuaCapture(capture))
  if (enchantLevel === undefined || enchantLevel >= ENCHANT_LEVEL_LIMIT) return 0
  return enchantLevel
}
