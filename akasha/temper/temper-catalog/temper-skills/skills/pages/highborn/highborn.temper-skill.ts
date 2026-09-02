import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const highborn = {
  id: "01a05fd0-dcb5-7a01-a6c5-b49f908e4062",
  pageTypeSlug: "temper-skill",
  slug: "highborn",
  title: "Highborn",
  key: "highborn",
  baseName: "Highborn",
  description:
    '"Increases your experience gain with the Destruction Staff skill line by 15%.\\n\\nIncreases your experience gained by 1%."',
  icon: "/esoui/art/icons/ability_templar_032.dds",
  esoSkillId: 35965,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-high-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-high-elf-skills",
  status: "unsupported",
} as const satisfies TemperSkill
