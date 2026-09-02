import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runestoneExtraction = {
  id: "01a05fd1-7ca8-7e6d-8666-58614505d905",
  pageTypeSlug: "temper-skill",
  slug: "runestone-extraction",
  title: "Runestone Extraction",
  key: "runestone-extraction",
  baseName: "Runestone Extraction",
  description: '"Increases the chance of extracting each type of Runestone by 10%."',
  icon: "/esoui/art/icons/ability_enchanter_004.dds",
  esoSkillId: 46769,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-enchanting",
  skillType: "passive",
  subcategoryId: "craft-enchanting",
} as const satisfies TemperSkill
