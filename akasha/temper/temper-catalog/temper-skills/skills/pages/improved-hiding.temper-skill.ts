import type { TemperSkill } from "../temper-skill.page-type.ts"

export const improvedHiding = {
  id: "01a05fd0-dcc2-7653-8820-73b293c4d637",
  pageTypeSlug: "temper-skill",
  slug: "improved-hiding",
  title: "Improved Hiding",
  key: "improved-hiding",
  baseName: "Improved Hiding",
  description: '"Reduces the cost of Sneak by 40%."',
  icon: "/esoui/art/icons/ability_legerdemain_improvedsneak.dds",
  esoSkillId: 63802,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-legerdemain",
  skillType: "passive",
  subcategoryId: "world-legerdemain",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
