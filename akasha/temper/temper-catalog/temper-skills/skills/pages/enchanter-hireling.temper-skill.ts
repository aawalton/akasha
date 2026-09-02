import type { TemperSkill } from "../temper-skill.page-type.ts"

export const enchanterHireling = {
  id: "01a05fd0-8e1e-7931-971f-2d8cf8556921",
  pageTypeSlug: "temper-skill",
  slug: "enchanter-hireling",
  title: "Enchanter Hireling",
  key: "enchanter-hireling",
  baseName: "Enchanter Hireling",
  description:
    '"A hireling will send you runestones every day. You have a greater chance at Essence and better Aspect runestones."',
  icon: "/esoui/art/icons/ability_enchanter_008.dds",
  esoSkillId: 46772,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-enchanting",
  skillType: "passive",
  subcategoryId: "craft-enchanting",
} as const satisfies TemperSkill
