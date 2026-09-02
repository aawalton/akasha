import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dynamic = {
  id: "01a05fd0-8e12-7166-93cb-1c1b89042b80",
  pageTypeSlug: "temper-skill",
  slug: "dynamic",
  title: "Dynamic",
  key: "dynamic",
  baseName: "Dynamic",
  description: '"Increases your Max Magicka and Max Stamina by 1910."',
  icon: "/esoui/art/icons/ability_weapon_023.dds",
  esoSkillId: 45267,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-dark-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-dark-elf-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
