import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFlameSkull = {
  id: "019e6f53-a90d-7fec-8d9a-5ae055086264",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-flame-skull",
  title: "Vengeance Flame Skull",
  key: "vengeance-flame-skull",
  baseName: "Vengeance Flame Skull",
  description: '"Lob an explosive skull at an enemy, dealing |cffffff11686|r Flame Damage."',
  icon: "/esoui/art/icons/ability_necromancer_001.dds",
  esoSkillId: 238081,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-grave-lord",
} as const satisfies TemperSkill
