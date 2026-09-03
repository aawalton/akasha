import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const syrabanesBoon = {
  id: "019e624a-12e3-78b0-9135-0d98f7a6a4b4",
  pageTypeSlug: "temper-skill",
  slug: "syrabanes-boon",
  title: "Syrabane's Boon",
  key: "syrabanes-boon",
  baseName: "Syrabane's Boon",
  description: '"Increases your Max Magicka by 2000."',
  icon: "/esoui/art/icons/ability_armor_004.dds",
  esoSkillId: 117970,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-high-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-high-elf-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
