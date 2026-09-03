import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const syrabaneSBoon = {
  id: "019e6f53-a813-7434-820d-560f9ca1a83a",
  pageTypeSlug: "temper-skill",
  slug: "syrabane-s-boon",
  title: "Syrabane's Boon",
  key: "syrabane-s-boon",
  baseName: "Syrabane's Boon",
  description: '"Increases your Max Magicka by |cffffff600|r."',
  icon: "/esoui/art/icons/ability_armor_004.dds",
  esoSkillId: 117968,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "racial-high-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-high-elf-skills",
} as const satisfies TemperSkill
