import type { TemperSkill } from "../temper-skill.page-type.ts"

export const resistFrost36627 = {
  id: "01a05fd1-7c8e-72b1-b391-395ceb3dbea7",
  pageTypeSlug: "temper-skill",
  slug: "resist-frost-36627",
  title: "Resist Frost",
  key: "resist-frost-36627",
  baseName: "Resist Frost",
  description:
    '"Increases your Max Health by |cffffff333|r and Frost Resistance by |cffffff1540|r."',
  icon: "/esoui/art/icons/ability_sorcerer_012.dds",
  esoSkillId: 36627,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
} as const satisfies TemperSkill
