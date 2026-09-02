import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hawkEye = {
  id: "01a05fd0-dca9-7de9-9094-2842601a4f34",
  pageTypeSlug: "temper-skill",
  slug: "hawk-eye",
  title: "Hawk Eye",
  key: "hawk-eye",
  baseName: "Hawk Eye",
  description:
    '"Dealing damage with a Light or Heavy Attack increases the damage of your Bow abilities by 5% for 5 seconds, stacking up to 5 times."',
  icon: "/esoui/art/icons/passive_armor_002.dds",
  esoSkillId: 45497,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "passive",
  subcategoryId: "weapon-bow",
  status: "unsupported",
} as const satisfies TemperSkill
