import type { TemperSkill } from "../temper-skill.page-type.ts"

export const resistFlame = {
  id: "01a05fd1-7c8d-7d36-b970-cebedc933803",
  pageTypeSlug: "temper-skill",
  slug: "resist-flame",
  title: "Resist Flame",
  key: "resist-flame",
  baseName: "Resist Flame",
  description: '"Increases your Flame Resistance by 4620."',
  icon: "/esoui/art/icons/ability_sorcerer_010.dds",
  esoSkillId: 45270,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-dark-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-dark-elf-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
