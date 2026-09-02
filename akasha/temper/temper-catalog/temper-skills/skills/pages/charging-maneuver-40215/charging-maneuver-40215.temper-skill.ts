import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chargingManeuver40215 = {
  id: "01a05fd0-4390-70f8-8471-d4c158202783",
  pageTypeSlug: "temper-skill",
  slug: "charging-maneuver-40215",
  title: "Charging Maneuver",
  key: "charging-maneuver-40215",
  baseName: "Rapid Maneuver",
  description:
    '"Mobilize your forces, granting Major and Minor Expedition to you and your group, increasing your Movement Speed by |cffffff30|r% and |cffffff15|r% respectively, for |cffffff8|r seconds."',
  icon: "/esoui/art/icons/ability_ava_002_b.dds",
  esoSkillId: 40215,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
