import type { TemperSkill } from "../temper-skill.page-type.ts"

export const chargingManeuver = {
  id: "01a05fd0-4390-79f3-b68f-3e346847ba85",
  pageTypeSlug: "temper-skill",
  slug: "charging-maneuver",
  title: "Charging Maneuver",
  key: "charging-maneuver",
  baseName: "Rapid Maneuver",
  description:
    '"Mobilize your forces, granting Major and Minor Expedition to you and your group, increasing your Movement Speed by 30% and 15% respectively, for 8 seconds."',
  icon: "/esoui/art/icons/ability_ava_002_b.dds",
  esoSkillId: 46519,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
