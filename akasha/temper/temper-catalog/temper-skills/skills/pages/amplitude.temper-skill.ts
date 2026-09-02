import type { TemperSkill } from "../temper-skill.page-type.ts"

export const amplitude = {
  id: "01a05fd0-4348-7865-b51d-109f8729f824",
  pageTypeSlug: "temper-skill",
  slug: "amplitude",
  title: "Amplitude",
  key: "amplitude",
  baseName: "Amplitude",
  description:
    '"Increases your damage done against enemies by 1% for every 10% current Health they have."',
  icon: "/esoui/art/icons/ability_sorcerer_049.dds",
  esoSkillId: 45192,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-storm-calling",
  skillType: "passive",
  subcategoryId: "sorcerer-storm-calling",
  status: "unsupported",
} as const satisfies TemperSkill
