import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceOffering = {
  id: "01a05fd2-1e7a-70f7-829d-00843936b643",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-offering",
  title: "Vengeance Offering",
  key: "vengeance-offering",
  baseName: "Vengeance Offering",
  description:
    '"Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_nightblade_011.dds",
  esoSkillId: 237711,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-siphoning",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-siphoning",
} as const satisfies TemperSkill
