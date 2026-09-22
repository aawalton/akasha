import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const amplitude31422 = {
  id: "019e6f53-9eac-7296-a17a-9f2489019f3d",
  type: "page-type/temper-skill",
  slug: "amplitude-31422",
  title: "Amplitude",
  key: "amplitude-31422",
  baseName: "Amplitude",
  description:
    '"Increases your damage done against enemies by |cffffff1|r% for every |cffffff20|r% current Health they have."',
  icon: "/esoui/art/icons/ability_sorcerer_049.dds",
  esoSkillId: 31422,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
