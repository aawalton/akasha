import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const vengeanceWeaponTwoHanded = {
  id: "019e6f53-86c1-7109-9bd8-913f07a20ed3",
  type: "page-type/temper-skill-line",
  slug: "vengeance-weapon-two-handed",
  title: "Vengeance Two Handed",
  key: "vengeance-weapon-two-handed",
  displayOrder: 128,
  esoSkillLineId: 319,
  maxRank: 0,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
