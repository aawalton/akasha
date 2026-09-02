import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const energized = {
  id: "01a05fd0-8e20-7bb7-8c3f-a69521793fcc",
  pageTypeSlug: "temper-skill",
  slug: "energized",
  title: "Energized",
  key: "energized",
  baseName: "Energized",
  description: '"Increases your Physical and Shock Damage by 5%."',
  icon: "/esoui/art/icons/ability_sorcerer_015.dds",
  esoSkillId: 45190,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-storm-calling",
  skillType: "passive",
  subcategoryId: "sorcerer-storm-calling",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
