import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"

export const legendary = {
  id: "019e2fc4-de1c-764e-8434-e02224db4355",
  type: "page-type/temper-quality",
  slug: "legendary",
  title: "Legendary",
  key: "legendary",
  displayOrder: 5,
  available: true,
  hashPlace: 5,
  esoDisplayQuality: 5,
  gameName: "Legendary",
  weaponLevelScale: 1,
  armorLevelScale: 1,
  setBonusScale: 1,
  defaultQuality: true,
} as const satisfies TemperQuality
