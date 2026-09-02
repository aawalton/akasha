import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rapidRot = {
  id: "01a05fd1-2e2b-7011-bb7a-c2e4d00a115c",
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
