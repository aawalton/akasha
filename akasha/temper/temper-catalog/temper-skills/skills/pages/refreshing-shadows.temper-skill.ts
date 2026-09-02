import type { TemperSkill } from "../temper-skill.page-type.ts"

export const refreshingShadows = {
  id: "01a05fd1-7c81-7cdc-a321-431e6c9369b5",
  pageTypeSlug: "temper-skill",
  slug: "refreshing-shadows",
  title: "Refreshing Shadows",
  key: "refreshing-shadows",
  baseName: "Refreshing Shadows",
  description: '"Increases your Health, Stamina, and Magicka Recovery by 15%."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45103,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-shadow",
  skillType: "passive",
  subcategoryId: "nightblade-shadow",
  status: "unsupported",
} as const satisfies TemperSkill
