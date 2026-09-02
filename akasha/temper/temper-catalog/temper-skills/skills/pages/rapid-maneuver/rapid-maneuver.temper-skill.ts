import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rapidManeuver = {
  id: "01a05fd1-2e2a-7e3b-8e43-d67ee36dda93",
  pageTypeSlug: "temper-skill",
  slug: "rapid-maneuver",
  title: "Rapid Maneuver",
  key: "rapid-maneuver",
  baseName: "Rapid Maneuver",
  description:
    '"Mobilize your forces, granting Major Expedition to you and your group, increasing your Movement Speed by |cffffff30|r% for |cffffff8|r seconds."',
  icon: "/esoui/art/icons/ability_ava_002.dds",
  esoSkillId: 38566,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
