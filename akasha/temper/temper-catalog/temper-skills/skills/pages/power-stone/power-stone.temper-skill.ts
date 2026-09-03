import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerStone = {
  id: "019e6245-a6eb-78a8-9776-1f46b6b4d301",
  pageTypeSlug: "temper-skill",
  slug: "power-stone",
  title: "Power Stone",
  key: "power-stone",
  baseName: "Power Stone",
  description: '"Reduces the cost of your Ultimate abilities by 15%."',
  icon: "/esoui/art/icons/ability_sorcerer_057.dds",
  esoSkillId: 45196,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "passive",
  subcategoryId: "sorcerer-daedric-summoning",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
