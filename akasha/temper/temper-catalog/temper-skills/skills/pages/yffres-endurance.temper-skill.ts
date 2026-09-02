import type { TemperSkill } from "../temper-skill.page-type.ts"

export const yffresEndurance = {
  id: "01a05fd2-1e9b-7265-b98b-bb646dba5891",
  pageTypeSlug: "temper-skill",
  slug: "yffres-endurance",
  title: "Y'ffre's Endurance",
  key: "yffres-endurance",
  baseName: "Y'ffre's Endurance",
  description: '"Increases your Stamina Recovery by 258."',
  icon: "/esoui/art/icons/ability_templar_002.dds",
  esoSkillId: 64281,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
