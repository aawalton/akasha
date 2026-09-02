import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aspectImprovement = {
  id: "01a05fd0-4352-7a13-9c81-8dcda3b2bea5",
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
