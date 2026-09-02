import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const banishTheWicked = {
  id: "01a05fd0-435a-785d-a58b-5572cdcdea42",
  pageTypeSlug: "temper-skill",
  slug: "banish-the-wicked",
  title: "Banish the Wicked",
  key: "banish-the-wicked",
  baseName: "Banish the Wicked",
  description: '"You generate 3 Ultimate whenever you kill an enemy."',
  icon: "/esoui/art/icons/ability_dragonknight_034.dds",
  esoSkillId: 45599,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
  status: "unsupported",
} as const satisfies TemperSkill
