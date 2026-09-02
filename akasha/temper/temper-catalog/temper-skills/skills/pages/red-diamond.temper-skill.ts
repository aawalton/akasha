import type { TemperSkill } from "../temper-skill.page-type.ts"

export const redDiamond = {
  id: "01a05fd1-7c7e-7ed5-a9ff-639381e0e051",
  pageTypeSlug: "temper-skill",
  slug: "red-diamond",
  title: "Red Diamond",
  key: "red-diamond",
  baseName: "Red Diamond",
  description: '"Reduces the cost of all your abilities by 6%."',
  icon: "/esoui/art/icons/ability_dragonknight_028.dds",
  esoSkillId: 45293,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-imperial-skills",
  skillType: "passive",
  subcategoryId: "racial-imperial-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
