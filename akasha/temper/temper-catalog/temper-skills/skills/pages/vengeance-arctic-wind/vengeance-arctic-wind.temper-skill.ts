import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceArcticWind = {
  id: "019e6f53-a8b2-7a9f-8fed-d46da8b99a77",
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
