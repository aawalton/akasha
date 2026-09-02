import type { TemperSkill } from "../temper-skill.page-type.ts"

export const banishTheWicked35800 = {
  id: "01a05fd0-435b-7bb7-a258-a1e06e010fd0",
  pageTypeSlug: "temper-skill",
  slug: "banish-the-wicked-35800",
  title: "Banish the Wicked",
  key: "banish-the-wicked-35800",
  baseName: "Banish the Wicked",
  description: '"You generate |cffffff1|r Ultimate whenever you kill an enemy."',
  icon: "/esoui/art/icons/ability_dragonknight_034.dds",
  esoSkillId: 35800,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
