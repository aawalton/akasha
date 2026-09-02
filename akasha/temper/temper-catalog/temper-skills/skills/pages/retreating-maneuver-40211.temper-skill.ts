import type { TemperSkill } from "../temper-skill.page-type.ts"

export const retreatingManeuver40211 = {
  id: "01a05fd1-7c95-71a0-a342-e09f8c128231",
  pageTypeSlug: "temper-skill",
  slug: "retreating-maneuver-40211",
  title: "Retreating Maneuver",
  key: "retreating-maneuver-40211",
  baseName: "Rapid Maneuver",
  description:
    '"Mobilize your forces, granting Major Expedition to you and your group, increasing your Movement Speed by |cffffff30|r% for |cffffff8|r seconds.  Attacks from behind deal |cffffff15|r% less damage while this effect persists."',
  icon: "/esoui/art/icons/ability_ava_002_a.dds",
  esoSkillId: 40211,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
