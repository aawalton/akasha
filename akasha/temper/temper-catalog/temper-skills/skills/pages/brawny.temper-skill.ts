import type { TemperSkill } from "../temper-skill.page-type.ts"

export const brawny = {
  id: "01a05fd0-437f-7799-b5b7-4f3b4531167e",
  pageTypeSlug: "temper-skill",
  slug: "brawny",
  title: "Brawny",
  key: "brawny",
  baseName: "Brawny",
  description: '"Increases your Max Stamina by 1000."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 45309,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-orc-skills",
  skillType: "passive",
  subcategoryId: "racial-orc-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
