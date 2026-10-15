import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const accuracy30930 = {
  id: "019e6f53-9e8f-706e-a40d-926c34b9a997",
  type: "page-type/temper-skill",
  slug: "accuracy-30930",
  title: "Accuracy",
  key: "accuracy-30930",
  baseName: "Accuracy",
  description: "Increases your Critical Chance rating by |cffffff657|r.",
  icon: "/esoui/art/icons/ability_weapon_024.dds",
  esoSkillId: 30930,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/passive",
  hashPlace: 13,
  createdAt: "2026-05-28T16:03:31.599Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 657 (Constant)"],
} as const satisfies TemperSkill
