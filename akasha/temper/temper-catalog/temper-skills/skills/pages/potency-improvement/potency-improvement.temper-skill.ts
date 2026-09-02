import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const potencyImprovement = {
  id: "01a05fd1-2e15-7c06-9f06-f5e451f819d4",
  pageTypeSlug: "temper-skill",
  slug: "potency-improvement",
  title: "Potency Improvement",
  key: "potency-improvement",
  baseName: "Potency Improvement",
  description:
    '"Allows the use of Rejera, Repora, Jehade, and Itade Potency Runestones to make Glyphs of Champion 150 and 160."',
  icon: "/esoui/art/icons/ability_enchanter_001b.dds",
  esoSkillId: 70045,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 10,
  skillLineId: "craft-enchanting",
  skillType: "passive",
  subcategoryId: "craft-enchanting",
} as const satisfies TemperSkill
