import type { TemperSkill } from "../temper-skill.page-type.ts"

export const resistAffliction36011 = {
  id: "01a05fd1-7c8c-756c-8d32-97fd3f67e486",
  pageTypeSlug: "temper-skill",
  slug: "resist-affliction-36011",
  title: "Resist Affliction",
  key: "resist-affliction-36011",
  baseName: "Resist Affliction",
  description:
    '"Increases your Max Stamina by |cffffff600|r and your Disease and Poison Resistance by |cffffff660|r."',
  icon: "/esoui/art/icons/passive_templar_021.dds",
  esoSkillId: 36011,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
} as const satisfies TemperSkill
