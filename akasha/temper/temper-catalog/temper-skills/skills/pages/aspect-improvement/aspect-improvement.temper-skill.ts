import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aspectImprovement = {
  id: "019e6224-cc85-7923-b588-97452f5b4634",
  pageTypeSlug: "temper-skill",
  slug: "aspect-improvement",
  title: "Aspect Improvement",
  key: "aspect-improvement",
  baseName: "Aspect Improvement",
  description: '"Allows the use of Legendary (gold) Aspect Runestones."',
  icon: "/esoui/art/icons/ability_enchanter_002b.dds",
  esoSkillId: 46763,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 4,
  skillLineId: "craft-enchanting",
  skillType: "passive",
  subcategoryId: "craft-enchanting",
} as const satisfies TemperSkill
