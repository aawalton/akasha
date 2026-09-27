import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"

export const epic = {
  id: "019e2fc4-de19-7eef-8453-c739d6f0f683",
  type: "page-type/temper-quality",
  slug: "epic",
  title: "Epic",
  key: "epic",
  displayOrder: 4,
  available: true,
  hashPlace: 4,
  esoDisplayQuality: 4,
  gameName: "Epic",
  weaponLevelScale: 0.847940074906367,
  armorLevelScale: 0.9656,
  setBonusScale: 0.965,
} as const satisfies TemperQuality
