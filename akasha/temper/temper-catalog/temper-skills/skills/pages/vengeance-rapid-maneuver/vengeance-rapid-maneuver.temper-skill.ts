import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRapidManeuver = {
  id: "01a05fd2-1e7f-773f-8a47-cb38a8705e39",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-rapid-maneuver",
  title: "Vengeance Rapid Maneuver",
  key: "vengeance-rapid-maneuver",
  baseName: "Vengeance Rapid Maneuver",
  description:
    '"Mobilize your forces, granting Major Expedition to up to 3 of you and your group, increasing your Movement Speed by |cffffff30|r% for |cffffff8|r seconds."',
  icon: "/esoui/art/icons/ability_ava_002.dds",
  esoSkillId: 244498,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-assault",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-assault",
} as const satisfies TemperSkill
