import type { TemperSkill } from "../temper-skill.page-type.ts"

export const resistAffliction = {
  id: "01a05fd1-7c8c-7c0c-a2ec-c272f2d7f2af",
  pageTypeSlug: "temper-skill",
  slug: "resist-affliction",
  title: "Resist Affliction",
  key: "resist-affliction",
  baseName: "Resist Affliction",
  description:
    '"Increases your Max Stamina by 2000 and your Disease and Poison Resistance by 2310."',
  icon: "/esoui/art/icons/passive_templar_021.dds",
  esoSkillId: 45319,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
