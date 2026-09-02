import type { TemperSkill } from "../temper-skill.page-type.ts"

export const curativeCurse = {
  id: "01a05fd0-8df2-79ae-90a7-591d26e893d4",
  pageTypeSlug: "temper-skill",
  slug: "curative-curse",
  title: "Curative Curse",
  key: "curative-curse",
  baseName: "Curative Curse",
  description: '"While you have a negative effect on you, your healing done is increased by 12%."',
  icon: "/esoui/art/icons/passive_necromancer_009.dds",
  esoSkillId: 116287,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
  status: "unsupported",
} as const satisfies TemperSkill
