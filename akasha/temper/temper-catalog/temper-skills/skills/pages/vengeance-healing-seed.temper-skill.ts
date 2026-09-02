import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceHealingSeed = {
  id: "01a05fd1-d2aa-7f3a-bb4b-ec03bfce3a4d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-healing-seed",
  title: "Vengeance Healing Seed",
  key: "vengeance-healing-seed",
  baseName: "Vengeance Healing Seed",
  description:
    '"Summon a field of flowers which blooms after |cffffff6|r seconds, healing up to 3 of you and your allies in the area for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_warden_007.dds",
  esoSkillId: 238055,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "active",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
