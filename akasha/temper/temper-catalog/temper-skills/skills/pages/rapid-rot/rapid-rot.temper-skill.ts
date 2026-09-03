import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rapidRot = {
  id: "019e6245-a6fc-7cf8-b258-19abb44a3a67",
  pageTypeSlug: "temper-skill",
  slug: "rapid-rot",
  title: "Rapid Rot",
  key: "rapid-rot",
  baseName: "Rapid Rot",
  description: '"Increases your damage done with damage over time effects by 10%."',
  icon: "/esoui/art/icons/passive_necromancer_004.dds",
  esoSkillId: 116201,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-grave-lord",
  skillType: "passive",
  subcategoryId: "necromancer-grave-lord",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
