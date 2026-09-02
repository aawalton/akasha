import "@akasha/temper-eso-types/tstl-eso-sandbox"
export const ENCHANT_SUBTYPE_TO_QUALITY_INDEX: Record<number, number> = {
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

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

export function getEnchantQualityIndex(itemLink: string): number {
  const [capture] = string.match(itemLink, ":item:%d+:%d+:%d+:%d+:(%d+)")
  const enchantSubType = tonumber(parseLuaCapture(capture))
  if (enchantSubType === undefined) return 5
  return ENCHANT_SUBTYPE_TO_QUALITY_INDEX[enchantSubType] ?? 5
}
