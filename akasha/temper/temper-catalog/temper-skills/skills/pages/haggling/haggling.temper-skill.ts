import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const haggling = {
  id: "019e6238-c2c3-7f38-b608-8815d2949de0",
  pageTypeSlug: "temper-skill",
  slug: "haggling",
  title: "Haggling",
  key: "haggling",
  baseName: "Haggling",
  description: '"Stolen items sold at a fence are worth 10% more. Does not apply to Laundering."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_006.dds",
  esoSkillId: 76461,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
