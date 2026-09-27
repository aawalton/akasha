import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"

export const fine = {
  id: "019e2fc4-de14-71ef-b544-07071b91af02",
  type: "page-type/temper-quality",
  slug: "fine",
  title: "Fine",
  key: "fine",
  displayOrder: 2,
  available: true,
  hashPlace: 2,
  esoDisplayQuality: 2,
  gameName: "Fine",
  weaponLevelScale: 0.8299625468164794,
  armorLevelScale: 0.9427,
  setBonusScale: 0.941,
} as const satisfies TemperQuality
