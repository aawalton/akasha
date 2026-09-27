import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"

export const normal = {
  id: "019e2fc4-de11-7612-823a-5adf6684ab21",
  type: "page-type/temper-quality",
  slug: "normal",
  title: "Normal",
  key: "normal",
  displayOrder: 1,
  available: true,
  hashPlace: 1,
  esoDisplayQuality: 1,
  gameName: "Normal",
  weaponLevelScale: 0.8029962546816479,
  armorLevelScale: 0.9083,
  setBonusScale: 0.9067,
} as const satisfies TemperQuality
