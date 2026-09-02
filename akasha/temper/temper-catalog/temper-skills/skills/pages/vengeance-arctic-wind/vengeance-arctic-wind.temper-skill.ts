import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceArcticWind = {
  id: "01a05fd1-d286-7baa-b0a2-7ef46c7d2c4d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-arctic-wind",
  title: "Vengeance Arctic Wind",
  key: "vengeance-arctic-wind",
  baseName: "Vengeance Arctic Wind",
  description: '"Envelop yourself in winter winds, instantly healing for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_warden_003.dds",
  esoSkillId: 238088,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-winters-embrace",
  skillType: "active",
  subcategoryId: "vengeance-warden-winters-embrace",
} as const satisfies TemperSkill
