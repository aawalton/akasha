import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const accuracy = {
  id: "019e6226-00cd-7371-9e5d-f4f306c4a22e",
  pageTypeSlug: "temper-skill",
  slug: "accuracy",
  title: "Accuracy",
  key: "accuracy",
  baseName: "Accuracy",
  description: '"Increases your Critical Chance rating by 1314."',
  icon: "/esoui/art/icons/ability_weapon_024.dds",
  esoSkillId: 45492,
  isMorph: false,
  learnedLevel: 25,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "passive",
  subcategoryId: "weapon-bow",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
