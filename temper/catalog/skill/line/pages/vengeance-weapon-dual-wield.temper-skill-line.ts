import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const vengeanceWeaponDualWield = {
  id: "019e6f53-86c3-7118-8b64-07820fe3f223",
  type: "page-type/temper-skill-line",
  slug: "vengeance-weapon-dual-wield",
  title: "Vengeance Dual Wield",
  key: "vengeance-weapon-dual-wield",
  displayOrder: 130,
  esoSkillLineId: 321,
  maxRank: 0,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
