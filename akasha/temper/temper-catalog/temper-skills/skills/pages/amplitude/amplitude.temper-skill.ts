import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const amplitude = {
  id: "019e6245-a5eb-7037-a041-86394803725d",
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
