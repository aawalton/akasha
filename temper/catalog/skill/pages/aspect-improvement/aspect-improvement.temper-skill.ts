import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const aspectImprovement = {
  id: "019e6224-cc85-7923-b588-97452f5b4634",
  type: "page-type/temper-skill",
  slug: "aspect-improvement",
  title: "Aspect Improvement",
  key: "aspect-improvement",
  baseName: "Aspect Improvement",
  description: "Allows the use of Legendary (gold) Aspect Runestones.",
  icon: "/esoui/art/icons/ability_enchanter_002b.dds",
  esoAbilityId: 46763,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/craft-enchanting",
  skillType: "temper-skill-type/passive",
  hashPlace: 54,
  createdAt: "2026-05-26T02:37:19.365Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
